import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Bitcoin, DollarSign } from 'lucide-react'

const MintRedeem: React.FC = () => {
  /*
    mock data
  */
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
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl md:text-4xl font-bold tracking-tighter font-['Montserrat',sans-serif] mb-4 text-center text-white bg-gradient-to-r from-[#f39800] to-[#f39800]/70 bg-clip-text text-transparent" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mint & Redeem
      </motion.h1>
      <motion.div 
        className="h-1 w-32 bg-gradient-to-r from-[#f39800] to-[#f39800]/70 mb-12 mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      <Tabs defaultValue="mint" className="w-full max-w-2xl mx-auto mt-12">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 rounded-t-xl overflow-hidden">
            <TabsTrigger value="mint" className="data-[state=active]:bg-[#f39800] data-[state=active]:text-black">Mint fUSD</TabsTrigger>
          <TabsTrigger value="redeem" className="data-[state=active]:bg-[#f39800] data-[state=active]:text-black">Redeem BTC</TabsTrigger>
        </TabsList>
        <TabsContent value="mint" className="bg-gray-900/70 backdrop-blur-md p-6 rounded-b-xl shadow-2xl">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Current BTC Balance</h3>
              <p className="text-3xl font-bold text-[#f39800] flex items-center">
                <Bitcoin className="mr-2" />
                {maxBtcBalance} BTC
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Overcollateralization</h3>
              <p className="text-gray-300">{collateralizationRatio * 100}% of locked assets will be minted as fUSD</p>
              <h3 className="text-lg font-semibold mt-5 mb-2 text-white">Current Exchange Rate</h3>
              <p className="text-2xl font-bold text-[#f39800]">1 BTC = ${exchangeRate.toLocaleString()} USD</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">You Spend (BTC)</h3>
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
                  "bg-gray-800/50 text-white border-gray-700 text-lg",
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
              <h3 className="text-lg font-semibold mb-2 text-white">You'll Receive (fUSD)</h3>
              <Input
                type="number"
                value={fUsdAmount.toFixed(2)}
                readOnly
                className="bg-gray-800/50 text-white border-gray-700 text-lg"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black text-lg font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
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
          </motion.div>
        </TabsContent>
        <TabsContent value="redeem" className="bg-gray-900/70 backdrop-blur-md p-6 rounded-b-xl shadow-2xl">
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Your fUSD Balance</h3>
              <p className="text-3xl font-bold text-[#f39800] flex items-center">
                <DollarSign className="mr-2" />
                {userFUsdBalance.toLocaleString()} fUSD
              </p>
            </div>
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
                    <tr key={item.ticket} className="bg-gray-800/50 border-b border-gray-700">
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
                          className="w-full bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black font-semibold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
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
  )
}

export default MintRedeem