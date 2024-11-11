import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Bitcoin, DollarSign, Info, TrendingUp } from 'lucide-react'
import { BackgroundPattern, MiniHero } from '@/components'

const MintRedeem: React.FC = () => {
  const redeemData = [
    { ticket: "a1b2c3d4e5", redeemableBtc: 0.5, requiredFUsd: 15000 },
    { ticket: "f6g7h8i9j0", redeemableBtc: 0.75, requiredFUsd: 22500 },
    { ticket: "k1l2m3n4o5", redeemableBtc: 1.0, requiredFUsd: 30000 },
    { ticket: "p6q7r8s9t0", redeemableBtc: 0.25, requiredFUsd: 7500 },
  ]
      
  const [btcAmount, setBtcAmount] = useState(0.0001)
  const [fUsdAmount, setFUsdAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(85000) // mock
  const maxBtcBalance = 1 // mock
  const collateralizationRatio = 0.9 
  const userFUsdBalance = 50000 // mock

  useEffect(() => {
    const fetchExchangeRate = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setExchangeRate(85000)
    }
    fetchExchangeRate()
  }, [])

  const handleBtcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value)
    setBtcAmount(amount)
    setFUsdAmount(amount * collateralizationRatio * exchangeRate)
  }

  const handleRedeem = (ticket: string) => {
    alert(`Redeeming BTC for ticket ${ticket}`)
  }

  const handleMint = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert(`Minted ${fUsdAmount.toFixed(2)} fUSD`)
  }

  const isValidAmount = btcAmount >= 0.0001 && btcAmount <= maxBtcBalance

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <BackgroundPattern />
      <MiniHero title='Mint & Redeem'/>
      <div className="flex flex-col md:flex-row gap-8">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bitcoin className="text-[#f39800] h-8 w-8" />
                  <span className="text-lg text-gray-300">Bitcoin</span>
                </div>
                <span className="text-2xl font-bold text-white">{maxBtcBalance} BTC</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-[#f39800] h-8 w-8" />
                  <span className="text-lg text-gray-300">fUSD</span>
                </div>
                <span className="text-2xl font-bold text-white">{userFUsdBalance.toLocaleString()} fUSD</span>
              </div>
              
            </div>
            
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 overflow-hidden relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Exchange Rate</h3>
            <div className="flex items-center space-x-4">
              <div className="bg-[#f39800]/20 p-3 rounded-full">
                <TrendingUp className="text-[#f39800] h-8 w-8" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Rate</p>
                <p className="text-3xl font-bold text-white">1 BTC = ${exchangeRate.toLocaleString()} USD</p>
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

        {/* Right column: Tabs and slider */}
        <div className="md:w-2/3">
          <Tabs defaultValue="mint" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 rounded-t-xl overflow-hidden">
              <TabsTrigger value="mint" className="data-[state=active]:bg-[#f39800] data-[state=active]:text-black">Mint fUSD</TabsTrigger>
              <TabsTrigger value="redeem" className="data-[state=active]:bg-[#f39800] data-[state=active]:text-black">Redeem BTC</TabsTrigger>
            </TabsList>
            <TabsContent value="mint" className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-b-xl shadow-lg border border-gray-700">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">You Spend (BTC)</h3>
                  <input
                    type="range"
                    min={0.0001}
                    max={maxBtcBalance}
                    step={0.0001}
                    value={btcAmount}
                    onChange={handleBtcChange}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4 custom-slider"
                    style={{
                      background: `linear-gradient(to right, #f39800 0%, #f39800 ${(btcAmount / maxBtcBalance) * 100}%, #4B5563 ${(btcAmount / maxBtcBalance) * 100}%, #4B5563 100%)`
                    }}
                  />
                  <Input
                    type="number"
                    value={btcAmount}
                    onChange={handleBtcChange}
                    min={0.0001}
                    max={maxBtcBalance}
                    step={0.0001}
                    className={cn(
                      "bg-gray-800/50 text-white border-gray-600 text-lg",
                      !isValidAmount && "border-red-500"
                    )}
                  />
                  <AnimatePresence>
                    {!isValidAmount && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        Please enter an amount between 0.0001 and {maxBtcBalance} BTC
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">You'll Receive (fUSD)</h3>
                  <Input
                    type="number"
                    value={fUsdAmount.toFixed(2)}
                    readOnly
                    className="bg-gray-800/50 text-white border-gray-600 text-lg"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black text-lg font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={handleMint}
                  disabled={!isValidAmount || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Minting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <DollarSign className="mr-2" />
                      Mint fUSD
                    </span>
                  )}
                </Button>
                <Alert variant="default" className="bg-gray-800/50 border-[#f39800]/50">
                  <Info className="h-4 w-4 text-[#f39800]" />
                  <AlertDescription className="text-gray-300">
                    {collateralizationRatio * 100}% of locked assets will be minted as fUSD. This ensures the stability and security of the FractalFi ecosystem.
                  </AlertDescription>
                </Alert>
              </motion.div>
            </TabsContent>
            <TabsContent value="redeem" className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-b-xl shadow-lg border border-gray-700">
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
                          <td className="px-6 py-4">{item.redeemableBtc} BTC</td>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MintRedeem