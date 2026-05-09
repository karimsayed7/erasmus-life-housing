"use client"; 
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='w-full bg-white border-b border-gray-100'>
      <div className='flex justify-between px-10 items-center py-4 text-[#A7A7A7] mx-auto'>
        
        {/* Logo */}
        <Link href="/" aria-label="Go to Home Page" >
          <Image src="/icons/logo.svg" alt='Brand Logo' width={120} height={40} priority />
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className='hidden lg:flex items-center gap-8' aria-label="Main Navigation">
          <Link href="/" className='hover:text-black transition-colors'>Home</Link>
          <Link href="/landlords" className='hover:text-black transition-colors'>Landlords</Link>
          <Link href="/erasmus-life" className='hover:text-black transition-colors'>Erasmus Life</Link>
          <Link href="/about" className='hover:text-black transition-colors'>About Us</Link>
        </nav>

        {/* Actions - Desktop */}
        <div className='hidden lg:flex gap-6 lg:gap-8 items-center'>
          <button className='hover:text-black transition-colors cursor-pointer font-medium'>
            Log In
          </button>
          
          <button aria-label="change theme" className="p-1">
            <Image src="/icons/herosearch.svg" alt='change theme' width={20} height={20} className='cursor-pointer'/>
          </button>

          <button className='text-gray-700 border hover:bg-gray-50 transition-all px-5 py-2.5 rounded-xl border-gray-300 font-medium cursor-pointer'>
            Rent a Room
          </button>
        </div>

        {/* Mobile Menu Button - Visible on Mobile only */}
        <button 
          className='lg:hidden p-2 text-gray-600 focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <nav className='lg:hidden bg-white border-t text-gray-500 border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full z-50'>
          <Link href="/" className='py-2 border-b border-gray-100 hover:text-black'>Home</Link>
          <Link href="/landlords" className='py-2 border-b border-gray-100 hover:text-black'>Landlords</Link>
          <Link href="/erasmus-life" className='py-2 border-b border-gray-100 hover:text-black'>Erasmus Life</Link>
          <Link href="/about" className='py-2 border-b border-gray-100 hover:text-black'>About Us</Link>
          <div className='flex flex-col gap-4 mt-2'>
            <button className='cursor-pointer text-center py-2  hover:text-black'>Log In</button>
            <button className='cursor-pointer bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl transition-colors'>Rent a Room</button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;