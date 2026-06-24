import React from 'react'
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/features/Landing/animations/ScrollReveal';
import { StaggerReveal } from '@/features/Landing/animations/StaggerReveal';

async function About() {
  const t = await getTranslations('About');
  const features = [
    t('featureProfessionalTeam'),
    t('featureAlwaysInTouch'),
    t('featureVerifiedRooms'),
    t('featureFastBooking'),
  ];

  return (
    <section id='about' className='w-full' role="region" aria-labelledby="about-heading">
      <div className='max-w-[1580px] flex flex-col gap-20 lg:gap-0 lg:flex-row px-6 xl:px-20 py-20 mx-auto'>
        {/* image */}
        <div className='md:w-[45%] lg:mx-0 mx-auto'>
          <ScrollReveal direction="right" delay={0.2}>
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
          </ScrollReveal>
        </div>

        {/* content */}
        <div className='w-full md:w-[55%] mx-auto lg:mx-0 text-center md:text-start'>
          <ScrollReveal direction="left" delay={0.3}>
            <div className="mb-8">
              <h2 id="about-heading" className="text-2xl md:text-3xl font-semibold text-[#1e293b] mb-2">{t('heading')}</h2>
              <p className="text-xl font-semibold text-blue-800">{t('eyebrow')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4}>
            <div className="space-y-6 text-gray-600 text-lg ">
              <p>
                {t('paragraph1')}
              </p>
              <p>
                {t('paragraph2Prefix')}
                <span className="font-semibold text-gray-800">{t('paragraph2Strong')}</span>
                {t('paragraph2Suffix')}
              </p>
            </div>
          </ScrollReveal>

          {/* features */}
          <StaggerReveal
            className="flex flex-wrap gap-4 mt-10"
            staggerDelay={0.1}
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
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}

export default About