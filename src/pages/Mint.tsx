import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Bitcoin, DollarSign, Info, Plus } from 'lucide-react'
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

interface TransferBlock {
  inscriptionId: string;
  amt: string;
}

const Mint: React.FC = () => {
  const client = useAPIClient()
  const { wallet } = useWallet();
  const [fUsdAmount, setFUsdAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(0) 
  const [balances, setBalances] = useState<Balances>({
    btc: { availableBalance: "0", transferableBalance: "0" },
    fusd: { availableBalance: "0", transferableBalance: "0" }
  })
  const [btcTransferBlocks, setBTCTransferBlocks] = useState<TransferBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isCreateBlockModalOpen, setIsCreateBlockModalOpen] = useState(false);
  const [newBlockAmount, setNewBlockAmount] = useState(0.0001);

  const collateralizationRatio = 0.8

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
      const exchangeRate = await client.getBitcoinPrice();
      setExchangeRate(exchangeRate.price)
    }
    fetchExchangeRate()
  }, []);

  const fetchBlocks = async() => {
    const accs = await wallet.getAccounts();
    client.getTransferBlocksByTicker(accs[0], 'test_BTC4').then(data => {
      setBTCTransferBlocks(data.map(block => ({
        inscriptionId: block.inscriptionId,
        amt: block.data.amt
      })));
    });
  }

  useEffect(() => {
    if (!wallet) return;
    fetchBlocks();
  }, [wallet]);

  useEffect(() => {
    const selectedBlockData = btcTransferBlocks.find(block => block.inscriptionId === selectedBlock);
    if (selectedBlockData) {
      const btcAmount = parseFloat(selectedBlockData.amt);
      setFUsdAmount(btcAmount * collateralizationRatio * exchangeRate);
    } else {
      setFUsdAmount(0);
    }
  }, [selectedBlock, btcTransferBlocks, collateralizationRatio, exchangeRate]);

  const handleMint = async () => {
    if (!selectedBlock) return;
    setIsLoading(true);
    try {
      const message = `Locking inscription in the vault. Inscription ID: ${selectedBlock}`;
      const signature = await wallet.signMessage(message);
      console.log(signature);
      await wallet.sendInscription('bc1qvrlhhvs6xvw68lc9r8sagn9l2pgr0fsffpf5vv', selectedBlock, {
        feeRate: 1,
      });
    } catch (error) {
      console.error('Failed to mint:', error);
      alert('Failed to mint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBlock = async () => {
    await wallet.inscribeTransfer('test_BTC4', newBlockAmount.toFixed(8));
    setIsCreateBlockModalOpen(false);
  }

  const isValidAmount = selectedBlock !== null;

  const maxMintableBtc = parseFloat(balances.btc.availableBalance) - parseFloat(balances.btc.transferableBalance)

  if (!wallet) {
    return <>Please Connect Wallet</>
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
                  <h3 className="text-xl font-semibold mb-4 text-white">Select Transfer Block (BTC)</h3>
                  <div className="flex space-x-4">
                    <Select onValueChange={setSelectedBlock}>
                      <SelectTrigger className="w-full bg-gray-800 text-white border-gray-600">
                        <SelectValue placeholder="Select a transfer block" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-600">
                        {btcTransferBlocks.map((block) => (
                          <SelectItem key={block.inscriptionId} value={block.inscriptionId} className="hover:bg-gray-700">
                            {block.amt} BTC
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog open={isCreateBlockModalOpen} onOpenChange={setIsCreateBlockModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-shrink-0 bg-gray-800 text-white border-gray-600 hover:bg-gray-700">
                          <Plus className="mr-2 h-4 w-4" /> Create New Block
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 text-white border border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">Create New Transfer Block</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">BTC Amount</h3>
                            <input
                              type="range"
                              min={0.0001}
                              max={maxMintableBtc}
                              step={0.0001}
                              value={newBlockAmount}
                              onChange={(e) => setNewBlockAmount(parseFloat(e.target.value))}
                              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4 custom-slider"
                              style={{
                                background: `linear-gradient(to right, #f39800 0%, #f39800 ${(newBlockAmount / maxMintableBtc) * 100}%, #4B5563 ${(newBlockAmount / maxMintableBtc) * 100}%, #4B5563 100%)`
                              }}
                            />
                            <Input
                              type="number"
                              value={newBlockAmount}
                              onChange={(e) => setNewBlockAmount(parseFloat(e.target.value))}
                              min={0.0001}
                              max={maxMintableBtc}
                              step={0.0001}
                              className="bg-gray-800 text-white border-gray-600 text-lg"
                            />
                          </div>
                          <Button onClick={handleCreateBlock} className="bg-[#f39800] text-black hover:bg-[#f39800]/90">Create Transfer Block</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
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
                  disabled={!selectedBlock || isLoading}
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