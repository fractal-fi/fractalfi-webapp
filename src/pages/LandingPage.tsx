import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { BackgroundPattern } from '@/components'
import Typewriter from 'typewriter-effect'

const LandingPage: React.FC = () => {
    const controls = useAnimation()

    useEffect(() => {
        controls.start(i => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.01 }
        }))
      }, [controls])

  return (
    <div className="relative">
      <BackgroundPattern />
      <div className="relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
        <motion.h1 
            className="text-6xl md:text-8xl font-bold tracking-tighter font-['Montserrat',sans-serif] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            custom={0}
        >
            FractalFi
        </motion.h1>
        <motion.div 
            className="h-1 w-24 bg-[#f39800] mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div
            className="text-xl md:text-2xl text-center text-[#f39800]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <Typewriter
                options={{
                    strings: [
                    'Decentralized Finance on Bitcoin',
                    'Mint stablecoins with ease',
                    'Powered by Fractal Bitcoin',
                    'Lend or Borrow value on-chain'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    deleteSpeed: 10
            }}
            />
        </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage