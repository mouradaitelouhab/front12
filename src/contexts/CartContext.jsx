// Contexte du panier d'achat pour Gems Revived
// Gère l'état global du panier et des articles

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { productService } from '../services/productService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Charger le panier depuis localStorage pour les invités ou depuis l'API pour les utilisateurs connectés
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      loadGuestCart();
    }
  }, [isAuthenticated]);

  // Charger le panier invité depuis localStorage
  const loadGuestCart = () => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        setCart(JSON.parse(guestCart));
      } else {
        setCart({ items: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier invité:', error);
      setCart({ items: [], totalPrice: 0 });
    }
  };

  // Sauvegarder le panier invité dans localStorage
  const saveGuestCart = (cartData) => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier invité:', error);
    }
  };

  // Charger le panier depuis l'API
  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un article au panier
  const addToCart = async (productId, quantity = 1, options = {}) => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        // Utilisateur connecté - utiliser l'API
        const updatedCart = await cartService.addItem(productId, quantity, options);
        setCart(updatedCart);
      } else {
        // Invité - gérer localement
        const currentCart = { ...cart };
        const existingItemIndex = currentCart.items.findIndex(item => item.productID === productId);
        
        if (existingItemIndex >= 0) {
          // Article déjà dans le panier - augmenter la quantité
          currentCart.items[existingItemIndex].quantity += quantity;
        } else {
          // Nouvel article - récupérer les détails du produit
          const productResponse = await productService.getProductById(productId);
          if (!productResponse.success || !productResponse.product) {
            throw new Error('Produit non trouvé');
          }
          const product = productResponse.product;

          const newItem = {
            productID: productId,
            quantity: quantity,
            price: product.price,
            name: product.name,
            image: product.imageURLs?.[0] || '',
            ...options
          };
          currentCart.items.push(newItem);
        }
        
        // Recalculer le prix total
        currentCart.totalPrice = currentCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        setCart(currentCart);
        saveGuestCart(currentCart);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erreur lors de l\'ajout au panier' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour la quantité d'un article
  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        const updatedCart = await cartService.updateQuantity(itemId, quantity);
        setCart(updatedCart);
      } else {
        const currentCart = { ...cart };
        const itemIndex = currentCart.items.findIndex(item => item.productID === itemId);
        
        if (itemIndex >= 0) {
          if (quantity <= 0) {
            currentCart.items.splice(itemIndex, 1);
          } else {
            currentCart.items[itemIndex].quantity = quantity;
          }
          
          currentCart.totalPrice = currentCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
          setCart(currentCart);
          saveGuestCart(currentCart);
        }
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de la mise à jour' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un article du panier
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        const updatedCart = await cartService.removeItem(itemId);
        setCart(updatedCart);
      } else {
        const currentCart = { ...cart };
        currentCart.items = currentCart.items.filter(item => item.productID !== itemId);
        currentCart.totalPrice = currentCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        setCart(currentCart);
        saveGuestCart(currentCart);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors de la suppression' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Vider le panier
  const clearCart = async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        await cartService.clearCart();
      } else {
        localStorage.removeItem('guestCart');
      }
      
      setCart({ items: [], totalPrice: 0 });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors du vidage du panier' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Calculer le nombre total d'articles
  const getTotalItems = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculer le prix total
  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.totalPrice || 0;
  };

  // Vérifier si un produit est dans le panier
  const isInCart = (productId) => {
    if (!cart || !cart.items) return false;
    return cart.items.some(item => item.productID === productId);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    itemCount: getTotalItems(),
    totalPrice: getTotalPrice()
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

