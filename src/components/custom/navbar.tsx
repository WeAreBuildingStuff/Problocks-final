'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const firstPathSegment = pathname.split('/')[1] || '';

  if (firstPathSegment === 'login' || firstPathSegment === 'register') {
    return null;
  }

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-10 py-6 flex items-center justify-between">
        <h1 className="text-xl text-black font-bold">Problocks</h1>
        <nav className='mx-auto'>
          <a href="/" className="mr-4 text-black font-medium">Home</a>
          <a href="/courses" className="text-gray-500">Courses</a>
        </nav>
      </div>
    </header>
  );
}
