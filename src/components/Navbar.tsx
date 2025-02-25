import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          NestJS Auth Demo
        </Link>
        
        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="px-3 py-2">
                Welcome, {user.displayName || user.email}
              </span>
              <Link href="/dashboard" className="px-3 py-2 hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-2 hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="px-3 py-2 hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;