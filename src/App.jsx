import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeData } from './utils/storage'
import Home from './pages/Home'
import Admin from './pages/Admin'
import SupplierDetail from './pages/SupplierDetail'
import './App.css'

function App() {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/fornecedor/:id" element={<SupplierDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

