import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface ExchangeRateCardProps {
  exchangeRate: number;
}

const ExchangeRateCard: React.FC<ExchangeRateCardProps> = ({ exchangeRate }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 overflow-hidden relative group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
        <div className="flex items-center space-x-4">
            <div className="bg-[#f39800]/20 p-3 rounded-full">
                <TrendingUp className="text-[#f39800] h-8 w-8" />
            </div>
            <div>
                <p className="text-sm text-gray-400">Market Rate</p>
                <p className="text-xl font-bold text-white">1 BTC = ${exchangeRate.toLocaleString()} USD</p>
            </div>
        </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#f39800]/0 via-[#f39800]/30 to-[#f39800]/0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      />
    </motion.div>
  )
}

export default ExchangeRateCard