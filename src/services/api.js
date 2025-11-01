const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Products API
export const productsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.featured) queryParams.append('featured', filters.featured);
    if (filters.trending) queryParams.append('trending', filters.trending);
    if (filters.new) queryParams.append('new', filters.new);
    
    const query = queryParams.toString();
    return apiCall(`/products${query ? `?${query}` : ''}`);
  },

  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  create: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiCall('/orders');
  },

  getById: async (id) => {
    return apiCall(`/orders/${id}`);
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    return apiCall('/users/profile');
  },

  updateProfile: async (userData) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

