import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-[#f39800]">
        FractalFi
      </Link>
      <nav className="flex space-x-6">
        {[
          { name: 'Mint', path: '/mint' },
          { name: 'Borrow', path: '/borrow' },
          { name: 'Lending', path: '/lend' }
        ].map((item) => (
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
    </header>
  )
}

export default Header