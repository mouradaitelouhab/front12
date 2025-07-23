// Service de gestion des produits pour ALMAS & MIDAS
// Gère les opérations CRUD pour les vendeurs et administrateurs

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  "http://localhost:5000/api";

// Fonction utilitaire pour les appels API avec authentification
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Créer un nouveau produit
const createProduct = async (productData) => {
  try {
    const response = await apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
    
    return {
      success: true,
      product: response.data,
      message: response.message || 'Produit créé avec succès'
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Mettre à jour un produit
const updateProduct = async (productId, productData) => {
  try {
    const response = await apiCall(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
    
    return {
      success: true,
      product: response.data,
      message: response.message || 'Produit mis à jour avec succès'
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Supprimer un produit
const deleteProduct = async (productId) => {
  try {
    const response = await apiCall(`/products/${productId}`, {
      method: 'DELETE'
    });
    
    return {
      success: true,
      message: response.message || 'Produit supprimé avec succès'
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Uploader une image de produit
const uploadProductImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/products/upload-image`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      imageUrl: data.imageUrl
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Export du service
export const productManagementService = {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
};

