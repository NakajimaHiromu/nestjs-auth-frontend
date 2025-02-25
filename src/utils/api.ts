import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// デバッグ用レスポンスインターセプター
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('API Error:', error.config?.url, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// 認証関連のAPI関数
export const authAPI = {
  register: async (email: string, password: string, displayName?: string) => {
    return api.post('/auth/register', { email, password, displayName });
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },
  
  logout: async () => {
    // トークンはインターセプターで自動設定されるので、ここでは何も追加しない
    return api.post('/auth/logout');
  },
  
  getUser: async () => {
    return api.get('/auth/user');
  }
};

export default api;