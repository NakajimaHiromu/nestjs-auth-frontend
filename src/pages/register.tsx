import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
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
        <title>Register | NestJS Auth Demo</title>
      </Head>
      
      <div className="container mx-auto px-4 py-12">
        <RegisterForm />
      </div>
    </div>
  );
}