import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bitcoin, DollarSign, TrendingUp, ArrowUpDown } from 'lucide-react'
import { BackgroundPattern } from '@/components'

interface AuctionItem {
  id: string;
  btcAmount: number;
  fUsdPrice: number;
  currentUsdValue: number;
}

type SortOption = 'usdAsc' | 'usdDesc' | 'btcAsc' | 'btcDesc' | 'profitAsc' | 'profitDesc';

const Auctions: React.FC = () => {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('usdDesc')

  useEffect(() => {
    // Mock data fetching
    const fetchAuctionItems = async () => {
      // In a real application, this would be an API call
      const mockItems: AuctionItem[] = [
        { id: 'BTC001', btcAmount: 0.5, fUsdPrice: 40000, currentUsdValue: 42500 },
        { id: 'BTC002', btcAmount: 0.75, fUsdPrice: 62000, currentUsdValue: 63750 },
        { id: 'BTC003', btcAmount: 1.0, fUsdPrice: 84000, currentUsdValue: 85000 },
        { id: 'BTC004', btcAmount: 0.25, fUsdPrice: 20000, currentUsdValue: 21250 },
        { id: 'BTC005', btcAmount: 0.6, fUsdPrice: 50000, currentUsdValue: 51000 },
        { id: 'BTC006', btcAmount: 0.8, fUsdPrice: 67000, currentUsdValue: 68000 },
      ]
      setAuctionItems(mockItems)
    }

    fetchAuctionItems()
  }, [])

  const sortedItems = [...auctionItems].sort((a, b) => {
    switch (sortOption) {
      case 'usdAsc':
        return a.currentUsdValue - b.currentUsdValue
      case 'usdDesc':
        return b.currentUsdValue - a.currentUsdValue
      case 'btcAsc':
        return a.btcAmount - b.btcAmount
      case 'btcDesc':
        return b.btcAmount - a.btcAmount
      case 'profitAsc':
        return (a.currentUsdValue - a.fUsdPrice) - (b.currentUsdValue - b.fUsdPrice)
      case 'profitDesc':
        return (b.currentUsdValue - b.fUsdPrice) - (a.currentUsdValue - a.fUsdPrice)
      default:
        return 0
    }
  })

  const handleBuy = (id: string) => {
    alert(`Buying auction item ${id}`)
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
          BTC Auctions
        </motion.h1>
        <motion.div 
          className="h-1 w-32 bg-gradient-to-r from-[#f39800] to-[#f39800]/70 mb-12 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="mb-6">
            <Select onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[200px] bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="usdDesc">USD Value (High to Low)</SelectItem>
                <SelectItem value="usdAsc">USD Value (Low to High)</SelectItem>
                <SelectItem value="btcDesc">BTC Amount (High to Low)</SelectItem>
                <SelectItem value="btcAsc">BTC Amount (Low to High)</SelectItem>
                <SelectItem value="profitDesc">Profit (High to Low)</SelectItem>
                <SelectItem value="profitAsc">Profit (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <Card key={item.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{item.id}</span>
                    <Bitcoin className="text-[#f39800] h-6 w-6" />
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Liquidated loan auction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">BTC Amount:</span>
                      <span className="text-white font-semibold">{item.btcAmount} BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">fUSD Price:</span>
                      <span className="text-white font-semibold">{item.fUsdPrice.toLocaleString()} fUSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current USD Value:</span>
                      <span className="text-white font-semibold">${item.currentUsdValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Potential Profit:</span>
                      <span className="text-green-400 font-semibold">
                        ${(item.currentUsdValue - item.fUsdPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black font-semibold py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => handleBuy(item.id)}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Auctions