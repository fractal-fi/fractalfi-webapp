import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage, MintRedeem } from './pages'
import { Header } from './components'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-hidden font-['Montserrat',sans-serif]">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mint" element={<MintRedeem />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App