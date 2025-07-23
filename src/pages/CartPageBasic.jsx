import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setUpdating(true);
      console.log('Updating quantity for item:', itemId, 'to:', newQuantity);
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      console.log('Removing item:', itemId);
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cart.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  console.log('Cart state:', cart);
  console.log('Cart items:', cart.items);

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
              <p className="text-gray-600 mb-8">Découvrez notre collection exceptionnelle de bijoux et diamants</p>
              <Link to="/products">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
            <Link to="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continuer mes achats
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Articles ({cart.items.length})</h2>
                
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.productID || item._id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-purple-600 font-medium">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.productID || item._id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(item.productID || item._id, item.quantity + 1)}
                          disabled={updating}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.productID || item._id)}
                        disabled={updating}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium text-green-600">
                      {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Procéder au paiement
                    </Button>
                  </Link>
                  
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Livraison gratuite dès 100€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Retours gratuits sous 30 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Garantie à vie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

