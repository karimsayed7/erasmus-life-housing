"use client"; 
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Dashboard', href: '/dashboard', isLink: true }, 
    { name: 'About', href: '#about' },
    { name: 'Finest Rooms', href: '#rooms' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Process', href: '#proccess' }, 
  ];

  return (
    <header className='z-80 relative w-full bg-white border-b border-gray-100 '>
      <div className='flex justify-between px-6 md:px-10 items-center py-4 text-[#A7A7A7] max-w-7xl mx-auto'>
        
        {/* Logo */}
        <Link href="/" aria-label="Go to Home Page" className="shrink-0">
          <Image src="/icons/logo.svg" alt='Brand Logo' width={140} height={45} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden xl:block">
          <ul className="flex gap-8 text-[15px] font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.isLink ? (
                  <Link 
                    href={link.href} 
                    className={`transition-colors ${link.name === 'Home' ? 'text-black' : 'hover:text-black'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    href={link.href} 
                    className={`transition-colors ${link.name === 'Home' ? 'text-black' : 'hover:text-black'}`}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions - Desktop */}
        <div className='hidden xl:flex gap-6 items-center'>
          <button className='hover:text-black transition-colors cursor-pointer font-semibold text-[15px]'>
            Log In
          </button>
          
          <button aria-label="Search" className="p-1 hover:opacity-70">
            <Image src="/icons/herosearch.svg" alt='search' width={20} height={20} className='cursor-pointer'/>
          </button>

          <button className='text-gray-800 border-2 border-gray-200 hover:bg-gray-100 hover:border-black transition-all px-6 py-2 rounded-xl font-bold cursor-pointer text-sm'>
            Rent a Room
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className='xl:hidden p-2 text-gray-600'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <nav className='xl:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-5 shadow-2xl absolute w-full animate-in slide-in-from-top duration-300'>
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-50 pb-2">
               {link.isLink ? (
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium ${link.name === 'Home' ? 'text-black' : 'text-[#797979] hover:text-black'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium ${link.name === 'Home' ? 'text-black' : 'text-[#797979] hover:text-black'}`}
                  >
                    {link.name}
                  </a>
                )}
            </div>
          ))}
          
          <div className='flex flex-col gap-4 pt-4'>
            <button className='text-center text-gray-500 hover:text-black transition-colors font-bold text-lg cursor-pointer'>Log In</button>
            <button className=' text-black py-4 rounded-xl font-bold border-2 border-gray-400 hover:bg-gray-100 hover:border-black transition-colors cursor-pointer'>
              Rent a Room
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;