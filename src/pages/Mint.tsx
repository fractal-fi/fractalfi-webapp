import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Bitcoin, DollarSign, Info } from 'lucide-react'
import { BackgroundPattern } from '@/components'
import { useAPIClient } from '@/providers/APIClientProvider'
import BalancesCard from '@/components/BalancesCard'
import ExchangeRateCard from '@/components/ExchangeRatesCard'
import { useWallet } from '@/providers/WalletProvider'

interface BalanceInfo {
  availableBalance: string;
  transferableBalance: string;
}

interface Balances {
  btc: BalanceInfo;
  fusd: BalanceInfo;
}

const Mint: React.FC = () => {
  const client = useAPIClient()
  const { wallet } = useWallet();
  const [btcAmount, setBtcAmount] = useState(0.0001)
  const [fUsdAmount, setFUsdAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(85000) // mock
  const [balances, setBalances] = useState<Balances>({
    btc: { availableBalance: "0", transferableBalance: "0" },
    fusd: { availableBalance: "0", transferableBalance: "0" }
  })
  const collateralizationRatio = 0.9 

  useEffect(() => {
    
    const fetchBalances = async () => {
      try {
        if (!wallet) return;
        const addresses = await wallet.getAccounts();
        const address = addresses[0];
        const addressSummary = await client.getAddressSummary(address)
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

  useEffect(() => {
    setFUsdAmount(btcAmount * collateralizationRatio * exchangeRate)
  }, [btcAmount, exchangeRate])

  const handleBtcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value)
    setBtcAmount(amount)
  }

  const handleMint = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert(`Minted ${fUsdAmount.toFixed(2)} fUSD`)
  }

  const maxMintableBtc = parseFloat(balances.btc.availableBalance) - parseFloat(balances.btc.transferableBalance)
  const isValidAmount = btcAmount >= 0.0001 && btcAmount <= maxMintableBtc

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
          Mint fUSD
        </motion.h1>
        <motion.div 
          className="h-1 w-32 bg-gradient-to-r from-[#f39800] to-[#f39800]/70 mb-12 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        <div className="flex flex-col md:flex-row gap-8 bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="md:w-1/3 space-y-6">
            <BalancesCard balances={balances} />
            <ExchangeRateCard exchangeRate={exchangeRate} />
          </div>

          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
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
                    max={maxMintableBtc}
                    step={0.0001}
                    value={btcAmount}
                    onChange={handleBtcChange}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4 custom-slider"
                    style={{
                      background: `linear-gradient(to right, #f39800 0%, #f39800 ${(btcAmount / maxMintableBtc) * 100}%, #4B5563 ${(btcAmount / maxMintableBtc) * 100}%, #4B5563 100%)`
                    }}
                  />
                  <Input
                    type="number"
                    value={btcAmount}
                    onChange={handleBtcChange}
                    min={0.0001}
                    max={maxMintableBtc}
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
                        Please enter an amount between 0.0001 and {maxMintableBtc.toFixed(8)} BTC
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mint