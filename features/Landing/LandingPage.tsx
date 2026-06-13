import React from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Testimonias from './components/Testimonias'
import Process from './components/Process'
import Footer from './components/Footer'

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
