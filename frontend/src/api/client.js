import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => apiClient.get('/products'),
  getBySlug: (slug) => apiClient.get(`/products/${slug}`),
  create: (productData) => apiClient.post('/products', productData),
};

// Cart API
export const cartAPI = {
  getCart: (sessionId) => apiClient.get(`/cart/${sessionId}`),
  addItem: (sessionId, item) => apiClient.post(`/cart/${sessionId}/items`, item),
  updateItem: (sessionId, productId, quantity) => 
    apiClient.put(`/cart/${sessionId}/items/${productId}`, { quantity }),
  removeItem: (sessionId, productId) => 
    apiClient.delete(`/cart/${sessionId}/items/${productId}`),
  clearCart: (sessionId) => apiClient.delete(`/cart/${sessionId}`),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => apiClient.post('/orders', orderData),
  getByOrderNumber: (orderNumber) => apiClient.get(`/orders/${orderNumber}`),
  getByEmail: (email) => apiClient.get(`/orders/email/${email}`),
};

// Contact API
export const contactAPI = {
  submit: (messageData) => apiClient.post('/contact', messageData),
  getMessages: () => apiClient.get('/contact/messages'),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
};

// Helper to get or create session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export default apiClient;
