import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Bitcoin, DollarSign, Info, TrendingUp } from 'lucide-react'
import { BackgroundPattern, MiniHero } from '@/components'

const Lend: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <BackgroundPattern />
      <MiniHero title='Lend'/>
    </div>
  )
}

export default Lend