import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen }) {
  const [dropdownsOpen, setDropdownsOpen] = useState({});

  const toggleDropdown = (index) => {
    setDropdownsOpen(prev => {
      const updated = { ...prev, [index]: !prev[index] };
      localStorage.setItem('dropdownsOpen', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const savedDropdowns = JSON.parse(localStorage.getItem('dropdownsOpen'));
    if (savedDropdowns) setDropdownsOpen(savedDropdowns);
  }, []);

  return (
    <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-[#1e4f5b] w-64 text-white p-5 h-full`}>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul className="space-y-2">
        <li><a href="#" className="block p-2 hover:bg-blue-700 rounded font-bold">Home</a></li>

        <li>
          <button onClick={() => toggleDropdown(1)} className="w-full flex justify-between items-center p-2 font-bold hover:bg-blue-700 rounded">
            <span>Audios</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ul className={`${dropdownsOpen[1] ? 'block' : 'hidden'} ml-4 space-y-1`}>
            <li>
              <Link to="/audio-upload" className="block p-2 hover:bg-blue-700 rounded font-bold">Create Audio</Link>
            </li>

            <li>
              <Link to="/" className="block p-2 hover:bg-blue-700 rounded font-bold">Display Audio</Link>
            </li>
          </ul>
        </li>

        <li>
          <button onClick={() => toggleDropdown(2)} className="w-full flex justify-between items-center p-2 font-bold hover:bg-blue-700 rounded">
            <span>Contact</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ul className={`${dropdownsOpen[2] ? 'block' : 'hidden'} ml-4 space-y-1`}>
            <li><a href="#" className="block p-2 hover:bg-blue-700 rounded font-bold">Support</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
