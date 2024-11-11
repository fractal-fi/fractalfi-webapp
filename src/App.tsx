import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auction, Borrow, LandingPage, Lend, MintRedeem } from './pages'
import { Header } from './components'
import { RoutesEnum } from './shared/enums/routes.enum'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-hidden font-['Montserrat',sans-serif]">
        <Header />
        <Routes>
          <Route path={RoutesEnum.Landing} element={<LandingPage />} />
          <Route path={RoutesEnum.MintRedeem} element={<MintRedeem />} />
          <Route path={RoutesEnum.Auction} element={<Auction />} />
          <Route path={RoutesEnum.Lend} element={<Lend />} />
          <Route path={RoutesEnum.Borrow} element={<Borrow />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App