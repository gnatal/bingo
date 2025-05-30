// app/page.js
'use client';

import Link from 'next/link';

export default function InitialScreen() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white w-screen">
      <h1 className="text-4xl font-bold mb-12">Bingo Game</h1>
      
      <div className="flex flex-col sm:flex-row gap-8">
        <Link 
          href={'/play'}
          className="px-12 py-8 bg-blue-500 text-white text-xl font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          Play Online
        </Link>

        <Link 
          href={'/print'}
          className="px-12 py-8 bg-blue-500 text-white text-xl font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          Get Cards to Print
        </Link>
        
      </div>
    </div>
  );
}