import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>NestJS Auth Demo</title>
        <meta name="description" content="Next.js frontend for NestJS authentication API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          NestJS認証API テストアプリケーション
        </h1>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl mb-8">
            このアプリケーションはNestJSバックエンドの認証APIをテストするためのフロントエンドです。
          </p>
          
          {user ? (
            <div className="p-6 bg-green-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">ログイン済み</h2>
              <p className="mb-4">
                ユーザー: {user.displayName || user.email}
              </p>
              <Link href="/dashboard">
                <span className="inline-block py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md">
                  ダッシュボードへ移動
                </span>
              </Link>
            </div>
          ) : (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">認証機能のテスト</h2>
              <div className="flex justify-center space-x-4">
                <Link href="/login">
                  <span className="inline-block py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md">
                    ログイン
                  </span>
                </Link>
                <Link href="/register">
                  <span className="inline-block py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md">
                    登録
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}