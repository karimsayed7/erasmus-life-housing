import React from 'react'
import Header from '../../components/shared/Header/Header'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Testimonias from './components/Testimonias'
import Process from './components/Process'
import Footer from '../../components/shared/Footer'
import { FavoritesProvider } from "@/providers/FavoritesProvider";

function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <About/>
       <FavoritesProvider>
        <Rooms/>
       </FavoritesProvider>
      <Testimonias/>
      <Process/>
      <Footer/>
    </div>
  )
}

export default LandingPage
