import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Mail, Phone, MapPin } from 'lucide-react'
import { getSuppliers, getCategories } from '../utils/storage'
import { getIcon } from '../utils/icons'
import SupplierCard from '../components/SupplierCard'
import './SupplierDetail.css'

const SupplierDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const suppliers = getSuppliers()
  const categories = getCategories()
  const supplier = suppliers.find((s) => s.id === id)

  if (!supplier) {
    return (
      <div className="supplier-detail">
        <div className="container">
          <div className="not-found">
            <h2>Fornecedor não encontrado</h2>
            <Link to="/" className="back-btn">
              <ArrowLeft size={20} />
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === supplier.categoryId)
  const relatedSuppliers = suppliers.filter(
    (s) => supplier.relatedSuppliers?.includes(s.id) && s.id !== supplier.id
  )

  const handleGoToWebsite = () => {
    window.open(supplier.website, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="supplier-detail">
      <div className="detail-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </div>

      <div className="container">
        <div className="detail-content">
          <div className="detail-main">
            <div className="detail-image-section">
              <img
                src={supplier.image}
                alt={supplier.name}
                className="detail-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/f5f5f5/666666?text=' + encodeURIComponent(supplier.name)
                }}
              />
              {category && (
                <div className="detail-badge" style={{ backgroundColor: category.color }}>
                  {(() => {
                    const CategoryIcon = getIcon(category.icon)
                    return (
                      <>
                        <CategoryIcon size={16} />
                        <span>{category.name}</span>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>

            <div className="detail-info">
              <h1 className="detail-title">{supplier.name}</h1>
              <p className="detail-description">{supplier.description}</p>

              <div className="detail-contact">
                {supplier.website && (
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <ExternalLink size={20} />
                    <span>Website</span>
                  </a>
                )}
                {supplier.email && (
                  <a href={`mailto:${supplier.email}`} className="contact-item">
                    <Mail size={20} />
                    <span>{supplier.email}</span>
                  </a>
                )}
                {supplier.phone && (
                  <a href={`tel:${supplier.phone}`} className="contact-item">
                    <Phone size={20} />
                    <span>{supplier.phone}</span>
                  </a>
                )}
                {supplier.address && (
                  <div className="contact-item">
                    <MapPin size={20} />
                    <span>{supplier.address}</span>
                  </div>
                )}
              </div>

              <div className="detail-actions">
                <button onClick={handleGoToWebsite} className="action-btn primary">
                  <ExternalLink size={20} />
                  Visitar Site
                </button>
                <Link to="/" className="action-btn secondary">
                  Ver Catálogo Completo
                </Link>
              </div>
            </div>
          </div>

          {relatedSuppliers.length > 0 && (
            <div className="related-suppliers">
              <h2 className="related-title">Fornecedores Relacionados</h2>
              <div className="related-grid">
                {relatedSuppliers.map((related) => (
                  <SupplierCard
                    key={related.id}
                    supplier={related}
                    category={categories.find((c) => c.id === related.categoryId)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SupplierDetail

