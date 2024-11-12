import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Bitcoin, DollarSign, TrendingUp } from 'lucide-react'
import { BackgroundPattern } from '@/components'
import { useAPIClient } from '@/providers/APIClientProvider'
import { useWallet } from '@/providers/WalletProvider'

interface BalanceInfo {
  availableBalance: string;
  transferableBalance: string;
}

interface Balances {
  btc: BalanceInfo;
  fusd: BalanceInfo;
}

const Redeem: React.FC = () => {
  const { wallet } = useWallet()
  const client = useAPIClient()
  const [exchangeRate, setExchangeRate] = useState(85000) // mock
  const [balances, setBalances] = useState<Balances>({
    btc: { availableBalance: "0", transferableBalance: "0" },
    fusd: { availableBalance: "0", transferableBalance: "0" }
  })

  const redeemData = [
    { ticket: "a1b2c3d4e5", redeemableBtc: 0.5, requiredFUsd: 15000 },
    { ticket: "f6g7h8i9j0", redeemableBtc: 0.75, requiredFUsd: 22500 },
    { ticket: "k1l2m3n4o5", redeemableBtc: 1.0, requiredFUsd: 30000 },
    { ticket: "p6q7r8s9t0", redeemableBtc: 0.25, requiredFUsd: 7500 },
  ]

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!wallet) return 0;
        const address = await wallet.getAccounts();
        const addressSummary = await client.getAddressSummary(address[0])
        setBalances({
          btc: addressSummary['test_BTC4'],
          fusd: addressSummary['test_FUSD']
        })
      } catch (error) {
        console.error('Failed to fetch balances:', error)
      }
    }

    fetchBalances()
  }, [client, wallet])

  useEffect(() => {
    const fetchExchangeRate = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setExchangeRate(85000)
    }
    fetchExchangeRate()
  }, [])

  const handleRedeem = (ticket: string) => {
    alert(`Redeeming BTC for ticket ${ticket}`)
  }

  return (
    <>
      <BackgroundPattern />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold tracking-tighter font-['Montserrat',sans-serif] mb-4 text-center text-white bg-gradient-to-r from-[#f39800] to-[#f39800]/70 bg-clip-text text-transparent" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Redeem BTC
        </motion.h1>
        <motion.div 
          className="h-1 w-32 bg-gradient-to-r from-[#f39800] to-[#f39800]/70 mb-12 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        <div className="flex flex-col md:flex-row gap-8 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl relative z-10">
          {/* Left column: General information */}
          <div className="md:w-1/3 space-y-6">
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
          </div>

          {/* Right column: Redeem table */}
          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-800/50 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 rounded-tl-lg">Ticket #</th>
                        <th scope="col" className="px-6 py-3">Redeemable BTC</th>
                        <th scope="col" className="px-6 py-3">Required fUSD</th>
                        <th scope="col" className="px-6 py-3 rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {redeemData.map((item, index) => (
                        <tr key={item.ticket} className="bg-gray-800/30 border-b border-gray-700">
                          <td className="px-6 py-4 font-medium text-[#f39800] whitespace-nowrap">
                            <a href={`https://ordinals.com/${item.ticket}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {item.ticket}
                            </a>
                          </td>
                          <td className="px-6 py-4">{item.redeemableBtc.toFixed(8)} BTC</td>
                          <td className="px-6 py-4">{item.requiredFUsd.toLocaleString()} fUSD</td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => handleRedeem(item.ticket)}
                              className="w-full bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black font-semibold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                              Redeem BTC
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Redeem