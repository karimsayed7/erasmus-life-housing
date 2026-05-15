import React from 'react'
import Header from './Header'
import Hero from './hero/Hero'
import About from './about/About'
import Rooms from './rooms/Rooms'
import Testimonias from './testimonials/Testimonias'
import Process from './reservationProccess/Process'
import Footer from '../Landing/footer/Footer'

function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <About/>
      <Rooms/>
      <Testimonias/>
      <Process/>
      <Footer/>
    </div>
  )
}

export default LandingPage
