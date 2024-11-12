import React from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, DollarSign } from 'lucide-react'

interface BalanceInfo {
  availableBalance: string;
  transferableBalance: string;
}

interface Balances {
  btc: BalanceInfo;
  fusd: BalanceInfo;
}

interface BalancesCardProps {
  balances: Balances;
}

const BalancesCard: React.FC<BalancesCardProps> = ({ balances }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold text-white mb-6">Your Balances</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Bitcoin className="text-[#f39800] h-6 w-6" />
            <span className="text-sm text-gray-300">Total BTC</span>
          </div>
          <span className="text-lg font-bold text-white block">{parseFloat(balances.btc.availableBalance).toFixed(8)} BTC</span>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Bitcoin className="text-[#f39800] h-6 w-6" />
            <span className="text-sm text-gray-300">Transferrable BTC</span>
          </div>
          <span className="text-lg font-bold text-white block">{parseFloat(balances.btc.transferableBalance).toFixed(8)} BTC</span>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="text-[#f39800] h-6 w-6" />
            <span className="text-sm text-gray-300">Total fUSD</span>
          </div>
          <span className="text-lg font-bold text-white block">{parseFloat(balances.fusd.availableBalance).toFixed(2)} fUSD</span>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="text-[#f39800] h-6 w-6" />
            <span className="text-sm text-gray-300">Transferrable fUSD</span>
          </div>
          <span className="text-lg font-bold text-white block">{parseFloat(balances.fusd.transferableBalance).toFixed(2)} fUSD</span>
        </div>
      </div>
    </motion.div>
  )
}

export default BalancesCard