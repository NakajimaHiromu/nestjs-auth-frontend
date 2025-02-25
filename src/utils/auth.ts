// src/utils/auth.ts（firebase.tsの代わり）
export const authUtils = {
    // トークンをローカルストレージに保存
    setToken: (token: string) => {
      localStorage.setItem('token', token);
    },
    
    // トークンを取得
    getToken: () => {
      return localStorage.getItem('token');
    },
    
    // トークンを削除（ログアウト時）
    removeToken: () => {
      localStorage.removeItem('token');
    },
    
    // 認証済みかチェック
    isAuthenticated: () => {
      return !!localStorage.getItem('token');
    }
  };