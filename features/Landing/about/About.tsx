import React from 'react'
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

function About() {

const features = [
    "Professional Team",
    "Always in touch",
    "Verified Rooms",
    "Fast and Secure Booking"
];

  return (
    <section id='about' className='w-full' role="region" aria-labelledby="about-heading">
      <div className='max-w-[1580px] flex flex-col gap-20 lg:gap-0 lg:flex-row px-6 xl:px-20 py-20 mx-auto'>
        {/* image */}
        <div className='md:w-[45%] lg:mx-0 mx-auto'>
            <div className='relative'>
                <Image 
                    src={"/assets/about1.png"} 
                    alt='Exterior view of student accommodation building' 
                    width={330} 
                    height={120} 
                    className='rounded-lg shadow-xl'
                />
                <Image 
                    src={"/assets/about2.png"} 
                    alt='Building architectural detail' 
                    width={265} 
                    height={120} 
                    className='absolute top-40 right-35 hidden xl:block rounded-lg hover:border-3 hover: border-black'
                />
            </div>
        </div>
        {/* content */}
        <div className='w-full md:w-[55%] mx-auto lg:mx-0 text-center md:text-start'>
            <div className="mb-8">
                <h2 id="about-heading" className="text-2xl md:text-3xl font-semibold text-[#1e293b] mb-2">We Help Students Find Their Perfect Home</h2>
                <p className="text-xl font-semibold text-blue-800">About Us</p>
            </div>

            <div className="space-y-6 text-gray-600 text-lg ">
                <p>
                Erasmus Life Housing is your go-to hub for finding the perfect home for 
                students, by students. Since 2013, our team has helped tons of 
                students discover their ideal place. We have got a wide selection of 
                student-friendly rooms, all built and managed just for you.
                </p>
                <p>
                Our ultimate goal is to make Lisbon the number one destination for 
                <span className="font-semibold text-gray-800"> International Students and Young Workers</span>
                , and we most surely dont want that your experience finding accommodation to be a negative 
                point of that experience!
                </p>
            </div>

            {/* features */}
            <div 
                className="flex flex-wrap gap-4 mt-10" 
                role="list" 
                aria-label="Service features"
            >
                {features.map((feature, index) => (
                <div 
                    key={index}
                    role="listitem"
                    className="flex items-center bg-blue-100 gap-2 bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-100 shadow-sm transition-transform hover:scale-105"
                >
                    <CheckCircle2 size={18} fill='blue' className="text-white" aria-hidden="true" />
                    <span className="text-sm md:text-base ">{feature}</span>
                </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}

export default About