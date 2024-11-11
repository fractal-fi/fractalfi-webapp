import React, { useEffect, useRef } from 'react'
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion'

export const BackgroundPattern: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const xOffset = useTransform(mouseX, [0, 1], [-20, 20])
  const yOffset = useTransform(mouseY, [0, 1], [-20, 20])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
      mouseX.set((clientX - left) / width)
      mouseY.set((clientY - top) / height)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f39800" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f39800" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#f39800" fillOpacity="0.5" />
          </pattern>
        </defs>
        <motion.rect width="100%" height="100%" fill="url(#grid)" 
          style={{ x: xOffset, y: yOffset }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="40%"
          fill="url(#glow)"
          style={{ x: xOffset, y: yOffset }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="-100%"
            y1={`${20 * (i + 1)}%`}
            x2="200%"
            y2={`${20 * (i + 1)}%`}
            stroke="#f39800"
            strokeOpacity="0.1"
            strokeWidth="1"
            style={{ y: yOffset }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 * (i + 1)}%`}
            y1="-100%"
            x2={`${20 * (i + 1)}%`}
            y2="200%"
            stroke="#f39800"
            strokeOpacity="0.1"
            strokeWidth="1"
            style={{ x: xOffset }}
          />
        ))}
      </svg>
    </div>
  )
}

export default BackgroundPattern