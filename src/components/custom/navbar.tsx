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
        <nav className='flex ml-auto mr-8 gap-4'>
          <a href="/" className="text-gray-500 font-medium hover:underline">Home</a>
          <a href="/courses" className="text-gray-500 font-medium hover:underline">Courses</a>
          <a href="/challenge" className="text-gray-500 font-medium hover:underline">Challenges</a>
        </nav>
      </div>
    </header>
  );
}
