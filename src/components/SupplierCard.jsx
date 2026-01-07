import { Link } from 'react-router-dom'
import { ExternalLink, Eye, MapPin } from 'lucide-react'
import { getIcon } from '../utils/icons'
import './SupplierCard.css'

const SupplierCard = ({ supplier, category }) => {
  const handleGoToWebsite = (e) => {
    e.preventDefault()
    window.open(supplier.website, '_blank', 'noopener,noreferrer')
  }

  const CategoryIcon = category?.icon ? getIcon(category.icon) : null

  return (
    <div className="supplier-card">
      <div className="card-image-container">
        <img 
          src={supplier.image} 
          alt={supplier.name}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/f5f5f5/666666?text=' + encodeURIComponent(supplier.name)
          }}
        />
        {category && (
          <div className="card-overlay">
            <div className="card-category-badge" style={{ backgroundColor: category.color }}>
              {CategoryIcon && <CategoryIcon size={14} />}
              <span>{category.name}</span>
            </div>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{supplier.name}</h3>
        <p className="card-description">
          {supplier.description?.substring(0, 120)}
          {supplier.description?.length > 120 ? '...' : ''}
        </p>

        <div className="card-info">
          {supplier.address && (
            <span className="card-location">
              <MapPin size={12} />
              {supplier.address}
            </span>
          )}
        </div>

        <div className="card-actions">
          <Link 
            to={`/fornecedor/${supplier.id}`}
            className="card-btn card-btn-primary"
          >
            <Eye size={18} />
            Ver mais
          </Link>
          <button 
            onClick={handleGoToWebsite}
            className="card-btn card-btn-secondary"
          >
            <ExternalLink size={18} />
            Ir
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupplierCard

