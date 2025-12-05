'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthStatus: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(typeof window !== 'undefined' && !!localStorage.getItem('auth_token'));
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    setIsLoggedIn(false);
    alert('Você foi desconectado.');
    router.push('/login');
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push('/login')}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300"
    >
      Login
    </button>
  );
};

export default AuthStatus;
