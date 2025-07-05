import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Configure axios
axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Posts API
export const postsAPI = {
  getAllPosts: async (page = 1, limit = 10) => {
    const response = await axios.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await axios.post('/posts', postData);
    return response.data;
  },

  likePost: async (postId) => {
    const response = await axios.post(`/posts/${postId}/like`);
    return response.data;
  },

  getLikeStatus: async (postId) => {
    const response = await axios.get(`/posts/${postId}/like-status`);
    return response.data;
  }
};

// Comments API
export const commentsAPI = {
  getComments: async (postId) => {
    const response = await axios.get(`/comments/post/${postId}`);
    return response.data;
  },

  createComment: async (commentData) => {
    const response = await axios.post('/comments', commentData);
    return response.data;
  },

  likeComment: async (commentId) => {
    const response = await axios.post(`/comments/${commentId}/like`);
    return response.data;
  }
};

// Users API
export const usersAPI = {
  getProfile: async (userId) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  },

  getUserPosts: async (userId, page = 1, limit = 10) => {
    const response = await axios.get(`/users/${userId}/posts?page=${page}&limit=${limit}`);
    return response.data;
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  }
};
