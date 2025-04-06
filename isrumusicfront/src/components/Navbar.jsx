import React from 'react';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-[#1e4f5b] p-4 flex items-center justify-between">
      <div className="text-white text-xl font-bold">MyApp</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-4">
        <a href="#" className="text-white font-bold px-3 py-2 hover:bg-blue-700 rounded">Home</a>
        <a href="#" className="text-white font-bold px-3 py-2 hover:bg-blue-700 rounded">About</a>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
