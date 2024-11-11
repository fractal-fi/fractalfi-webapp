import React from 'react'
import { motion } from 'framer-motion'

export interface MiniHeroProps {
  title: string;
}

const MiniHero: React.FC<MiniHeroProps> = ({ title }) => {
  return (
    <div className="text-center mb-12">
      <motion.h1 
        className="text-5xl md:text-6xl font-bold tracking-tighter font-['Montserrat',sans-serif] mb-4 text-white bg-gradient-to-r from-[#f39800] to-[#f39800]/70 bg-clip-text text-transparent" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.div 
        className="h-1 w-32 bg-gradient-to-r from-[#f39800] to-[#f39800]/70 mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </div>
  )
}

export default MiniHero