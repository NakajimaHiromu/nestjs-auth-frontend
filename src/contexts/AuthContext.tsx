import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../utils/api';
import { firebaseClient } from '../utils/firebase';
import { User as FirebaseUser } from 'firebase/auth'; // FirebaseUserを明示的にインポート

interface User {
  email: string | null;
  displayName?: string | null;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isProcessing: boolean; // 新しい状態変数を追加
  error: string | null;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true); // アプリ初期化時のローディング
  const [isProcessing, setIsProcessing] = useState(false); // ボタン処理中のローディング
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Firebaseの認証状態を監視（型を指定）
    const unsubscribe = firebaseClient.onAuthStateChanged((fbUser: FirebaseUser | null) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      setIsProcessing(true); // 処理開始
      setError(null);

      const response = await authAPI.register(email, password, displayName);

      // ユーザー作成後に自動的にログイン
      await login(email, password);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true); // 処理開始
      setError(null);

      const data = await authAPI.login(email, password);

      // Firebase認証でサインイン
      await firebaseClient.signInWithToken(data.data.token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setIsProcessing(false); // エラー時は処理完了
    }
  };

  const logout = async () => {
    try {
      setIsProcessing(true); // 処理開始

      try {
        // NestJSバックエンド側でのログアウト
        await authAPI.logout();
      } catch (err) {
        console.error('Logout API error:', err);
      }

      // Firebase側でのログアウト
      await firebaseClient.signOut();

      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isProcessing, // 新しい状態を提供
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};