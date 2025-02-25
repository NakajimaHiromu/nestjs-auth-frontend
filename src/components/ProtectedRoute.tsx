// src/components/ProtectedRoute.tsx の修正
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // トークンがあれば認証済みとみなす簡易チェック
    const token = localStorage.getItem('token');
    if (!loading && !user && !token) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // ローディング表示を短くする
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // ユーザー情報がなくてもトークンがあれば表示
  const token = localStorage.getItem('token');
  if (!user && !token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;