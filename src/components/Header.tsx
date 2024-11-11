import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from 'lucide-react'
import { RoutesEnum } from '@/shared/enums/routes.enum'

const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [bitcoinAddress, setBitcoinAddress] = useState('')

  const handleConnect = () => {
    // Simulating wallet connection
    setIsConnected(true)
    setBitcoinAddress('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setBitcoinAddress('')
  }

  const menuItems = [
    { name: 'Mint', path: RoutesEnum.Mint },
    { name: 'Redeem', path: RoutesEnum.Redeem },
    { name: 'Auctions', path: RoutesEnum.Auction }
  ]

  return (
    <header className="container mx-auto px-4 py-6 flex items-center z-10">
      <Link to={RoutesEnum.Landing} className="text-2xl font-bold text-[#f39800] mr-8">
        FractalFi
      </Link>
      <nav className="flex-1 flex justify-center space-x-6">
        {menuItems.map((item) => (
          <motion.div key={item.name} className="relative group">
            <Link
              to={item.path}
              className="text-white hover:text-[#f39800] transition-colors"
            >
              {item.name}
            </Link>
            <motion.span
              className="absolute left-0 bottom-0 w-full h-0.5 bg-[#f39800] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </nav>
      <div className="ml-8 w-48 flex justify-end">
        {isConnected ? (
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm truncate max-w-[100px]">
              {bitcoinAddress.slice(0, 6)}...{bitcoinAddress.slice(-4)}
            </span>
            <Button
              onClick={handleDisconnect}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleConnect}
            className="bg-gradient-to-r from-[#f39800] to-[#f39800]/80 hover:from-[#f39800]/90 hover:to-[#f39800]/70 text-black"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header