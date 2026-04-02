import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import {
  About, Contact, Education, Experience,
  Hero, Navbar, Tech, Works, StarsCanvas,
} from './components'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackgroundOrbs from './components/BackgroundOrbs'
import IntroLoader from './components/Loader/IntroLoader'

function App() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <>
      {/*
        AnimatePresence lets IntroLoader play its exit animation (slide-up)
        BEFORE it's removed from the DOM.
        onComplete fires → setLoaderDone(true) → loader unmounts with animation
      */}
      <AnimatePresence>
        {!loaderDone && (
          <IntroLoader
            key="intro-loader"
            onComplete={() => setLoaderDone(true)}
          />
        )}
      </AnimatePresence>

      {/* Portfolio mounts after loader exits, fades in */}
      {loaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <BrowserRouter>
            <CustomCursor />
            <ScrollProgress />
            <BackgroundOrbs />

            <div className='relative z-0 bg-primary' style={{ cursor: 'none', overflowX: 'hidden' }}>
              <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <Hero />
              </div>
              <About />
              <Education />
              <Experience />
              <Tech />
              <Works />
              <div className='relative z-0'>
                <Contact />
                <StarsCanvas />
              </div>
            </div>
          </BrowserRouter>
        </motion.div>
      )}
    </>
  )
}

export default App
