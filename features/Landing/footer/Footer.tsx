import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { Music2 } from 'lucide-react'; 

function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-around items-start gap-12">
        {/* Branding Section */}
        <div className="flex flex-col gap-5 max-w-xs w-full md:w-auto">
          <div className="brightness-0 invert"> 
            <Image 
              src="/icons/logo.svg" 
              alt="Erasmus Life Housing Logo" 
              width={180} 
              height={60} 
              priority 
            />
          </div>
          <p className="text-[15px] text-blue-100 font-medium">
            Find Your Dream Accommodation
          </p>
          
          <div className="flex gap-5 text-white mt-2">
            <a href="#" className="hover:text-blue-300 transition-colors"><Music2 size={22} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Music2 size={22} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Music2 size={22} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Music2 size={22} /></a>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm opacity-90">
            Navigation
          </h3>
          <ul className="space-y-3 text-[16px]">
            <li><a href="#hero" className="hover:underline hover:text-blue-200 block">Home</a></li>
            <li><Link href="/dashboard" className="hover:underline hover:text-blue-200 block">Dashboard</Link></li>
            <li><a href="#about" className="hover:underline hover:text-blue-200 block">About</a></li>
            <li><a href="#rooms" className="hover:underline hover:text-blue-200 block">Finest Rooms</a></li>
            <li><a href="#testimonials" className="hover:underline hover:text-blue-200 block">Testimonials</a></li>
            <li><a href="#proccess" className="hover:underline hover:text-blue-200 block">Reservation Proccess</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col gap-4 max-w-xs w-full md:w-auto">
          <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm opacity-90">
            Resources
          </h3>
          <div className="text-[14px] space-y-4 leading-relaxed">
            <p className="text-blue-50">
              Travessa da Cara, 14,<br />
              1200-089 Lisbon - Portugal
            </p>
            <p className="font-bold text-white">
              <a href="tel:+351932483834" className="hover:text-blue-200">+351 932 483 834</a>
            </p>
            <p className="text-blue-100 break-all underline decoration-blue-400">
              <a href="mailto:hello@erasmuslifehousing.com" className="hover:text-white">
                hello@erasmuslifehousing.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-blue-700 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Erasmus Life Housing. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
