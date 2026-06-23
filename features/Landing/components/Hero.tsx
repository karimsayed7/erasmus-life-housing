"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { SearchBar } from "./SearchBar";
import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section className="relative pb-0 md:pb-20 py-20 overflow-hidden" id="hero" aria-labelledby="hero-heading">
      {/* Background image | right side */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full hidden min-[996px]:block rounded-l-lg overflow-hidden z-0"
        aria-hidden="true" 
      >
        <Image
          src="/assets/hero.png"
          alt="Modern building facade with blue sky" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* left side */}
      <div className="px-10 sm:px-20 text-center min-[996px]:text-start flex min-[996px]:justify-end justify-center w-full min-[996px]:w-1/2 ">
        <div>
          <header>
            <h1 id="hero-heading" className="text-blue-800 text-4xl mb-3 font-bold">
              {t('titlePrimary')}
            </h1>
            <h2 className="text-slate-800 text-4xl ">{t('titleSecondary')}</h2>

            <p className="text-gray-500 mt-8 text-lg max-w-2xl leading-relaxed ">
              {t('description')}
            </p>
          </header>

          <div 
            className="flex gap-7 md:gap-12 mt-12 justify-center min-[996px]:justify-start"
            role="group" 
            aria-label="Statistics"
          >
            <div className="flex flex-col items-center">
              <span className="text-slate-800 text-3xl font-semibold mb-1">
                <CountUp end={4235} duration={1} aria-hidden="true" />
                <span className="sr-only">4235</span> 
                <span className="ml-1 text-blue-700" aria-hidden="true">+</span>
              </span>
              <span className="text-gray-400 text-sm">{t('rooms')}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-800 text-3xl font-semibold mb-1">
                <CountUp end={535} duration={1} aria-hidden="true" />
                <span className="sr-only">535</span>
                <span className="ml-1 text-blue-700" aria-hidden="true">+</span>
              </span>
              <span className="text-gray-400 text-sm text-center">
                {t('reservationsLine1')}
                <br />
                {t('reservationsLine2')}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-800 text-3xl font-semibold mb-1">
                <CountUp end={19905} duration={2} aria-hidden="true" />
                <span className="sr-only">19905</span>
                <span className="ml-1 text-blue-700" aria-hidden="true">+</span>
              </span>
              <span className="text-gray-400 text-sm">{t('students')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* search bar */}
      <SearchBar />
    </section>
  );
}
