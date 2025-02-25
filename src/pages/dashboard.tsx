import React from 'react';
import Head from 'next/head';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {

  // useAuth provides the current authenticated user and a logout function
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <Head>
          <title>Dashboard | NestJS Auth Demo</title>
        </Head>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">ユーザー情報</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Display Name:</strong> {user?.displayName || 'Not set'}</p>
                <p><strong>UID:</strong> {user?.uid}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">認証テスト成功</h2>
              <p className="mb-4">
                認証APIを介して正常にログインできました。このページは認証済みユーザーのみアクセスできます。
              </p>
              <button
                onClick={logout}
                className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}