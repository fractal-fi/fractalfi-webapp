import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auction, LandingPage, Mint, Redeem, } from './pages'
import { Header } from './components'
import { RoutesEnum } from './shared/enums/routes.enum'
import { WalletProvider } from './providers/WalletProvider'
import { APIClientProvider } from './providers/APIClientProvider'

function App() {
  return (
    <APIClientProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-black text-white overflow-hidden font-['Montserrat',sans-serif]">
            <Header />
            <Routes>
              <Route path={RoutesEnum.Landing} element={<LandingPage />} />
              <Route path={RoutesEnum.Mint} element={<Mint />} />
              <Route path={RoutesEnum.Redeem} element={<Redeem />} />
              <Route path={RoutesEnum.Auction} element={<Auction />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </APIClientProvider>
  )
}

export default App