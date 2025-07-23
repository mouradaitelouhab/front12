// Service des produits pour ALMAS & MIDAS
// Gère les appels API vers le backend pour les produits

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  "http://localhost:5000/api";

// Fonction utilitaire pour les appels API
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
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

// Récupérer tous les produits
const getAllProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

    const endpoint = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await apiCall(endpoint);
    
    return {
      success: true,
      products: response.data || [],  // Map backend 'data' field to 'products'
      pagination: response.pagination || {}
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      products: [],
      error: error.message
    };
  }
};

// Récupérer un produit par ID
const getProductById = async (productId) => {
  try {
    const response = await apiCall(`/products/${productId}`);
    return {
      success: true,
      product: response.data  // Backend returns single product in 'data' field
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Export du service
export const productService = {
  getAllProducts,
  getProductById
};

