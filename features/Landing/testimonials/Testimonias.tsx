import React from 'react'
import Image from "next/image";
import {cards} from "../testimonials/cards";

function Testimonias() {
  return (
    <section id='testimonials' className='text-center'>
        <p className='text-xl text-blue-800'>Testimonials</p>
        <h1 className='text-2xl font-semibold pb-8 pt-3'>That’s what our clients say</h1>
        <div className="overflow-hidden w-full">
          <div className="flex w-max animate-scroll gap-10">
            {[...cards, ...cards].map((card, index) => (
              <div
                key={index}
                className="flex h-50 max-w-100 gap-4 p-5 pb-15 rounded-lg bg-blue-900 text-white text-md "
              >
                <div className='overflow-hidden w-40'>
                    <Image
                        src={card.image}
                        alt={card.name}
                        width={100}
                        height={50}
                        className="rounded-full object-cover"
                    />
                </div>
                <div>
                    <p className='font-semibold text-left mb-3'>{card.name}</p>
                    <p className='text-left text-sm'>{card.opinion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default Testimonias
