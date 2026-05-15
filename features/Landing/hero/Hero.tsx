"use client";
import Image from "next/image";
import { SlidersHorizontal, Euro, ChevronDown } from "lucide-react";
import CountUp from "react-countup";

export default function Hero() {
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
              Find Your Future
            </h1>
            <h2 className="text-slate-800 text-4xl ">Dream Accommodation</h2>

            <p className="text-gray-500 mt-8 text-lg max-w-2xl leading-relaxed ">
              Want to find an accommodation? We are ready to help you
              find one that suits your lifestyle and needs.
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
              <span className="text-gray-400 text-sm">Rooms</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-800 text-3xl font-semibold mb-1">
                <CountUp end={535} duration={1} aria-hidden="true" />
                <span className="sr-only">535</span>
                <span className="ml-1 text-blue-700" aria-hidden="true">+</span>
              </span>
              <span className="text-gray-400 text-sm text-center">
                Reservation/
                <br />
                Semester
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-800 text-3xl font-semibold mb-1">
                <CountUp end={19905} duration={2} aria-hidden="true" />
                <span className="sr-only">19905</span>
                <span className="ml-1 text-blue-700" aria-hidden="true">+</span>
              </span>
              <span className="text-gray-400 text-sm">Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="flex justify-center mt-10 z-10 relative">
        <div className="bg-white border border-gray-400 rounded-md px-6 py-3 max-w-2xl shadow-sm" role="search">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-normal text-slate-800">
              Search for available rooms
            </h3>
            <SlidersHorizontal size={18} className="text-gray-400" aria-hidden="true" />
          </div>

          {/* Inputs Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Location Select */}
            <div className="relative flex-1 min-w-[130px]">
              <label htmlFor="location-select" className="sr-only">Select Location</label>
              <select
                id="location-select"
                defaultValue={"location"}
                className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="location" disabled>
                  Location
                </option>
                <option value="lisbon">Lisbon</option>
                <option value="porto">Porto</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Budget */}
            <div className="flex items-center gap-2 flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <label htmlFor="budget-input" className="sr-only">Budget</label>
              <Euro size={15} className="text-gray-400" aria-hidden="true" />
              <input
                id="budget-input"
                type="number"
                placeholder="Budget"
                className="border-none outline-none text-sm text-slate-700 bg-transparent w-full"
              />
            </div>

            {/* Date */}
            <div
              className="flex items-center gap-2 flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500"
              dir="rtl"
            >
              <label htmlFor="check-in-date" className="sr-only">Check-in Date</label>
              <input
                id="check-in-date"
                type="date"
                className="border-none outline-none text-sm text-gray-400 bg-transparent w-full cursor-pointer"
              />
            </div>

            {/* Search Button */}
            <button 
              type="submit" 
              className="bg-indigo-500 cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors whitespace-nowrap outline-none"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}