import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Home, Settings, Package, X } from 'lucide-react'
import './Header.css'

const Header = ({ onSearchChange, searchValue }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Package size={28} />
          </div>
          <div className="logo-text">
            <h1>Catálogo Fornecedores</h1>
            <p>Encontre os melhores parceiros</p>
          </div>
        </Link>

        <div className="header-actions">
          <div className="search-box desktop-search">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar fornecedores..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          <button
            className="header-btn search-toggle"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>

          <Link to="/" className="header-btn">
            <Home size={20} />
            <span>Início</span>
          </Link>

          <Link to="/admin" className="header-btn admin-btn">
            <Settings size={20} />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      {showMobileSearch && (
        <div className="mobile-search-container">
          <div className="mobile-search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar fornecedores..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
              autoFocus
            />
            <button
              className="close-search-btn"
              onClick={() => setShowMobileSearch(false)}
              aria-label="Fechar busca"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

