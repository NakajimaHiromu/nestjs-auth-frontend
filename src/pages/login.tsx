import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // すでにログインしている場合はダッシュボードにリダイレクト
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>Login | NestJS Auth Demo</title>
      </Head>
      
      <div className="container mx-auto px-4 py-12">
        <LoginForm />
      </div>
    </div>
  );
}