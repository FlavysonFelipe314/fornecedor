import { useState, useMemo } from 'react'
import Header from '../components/Header'
import SupplierCard from '../components/SupplierCard'
import CategoryFilter from '../components/CategoryFilter'
import { getSuppliers, getCategories } from '../utils/storage'
import './Home.css'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const suppliers = getSuppliers()
  const categories = getCategories()

  const filteredSuppliers = useMemo(() => {
    let filtered = suppliers

    // Filtrar por categoria
    if (selectedCategory) {
      filtered = filtered.filter((s) => s.categoryId === selectedCategory)
    }

    // Filtrar por busca
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.description?.toLowerCase().includes(searchLower) ||
          s.address?.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [suppliers, selectedCategory, searchValue])

  const getCategoryById = (id) => {
    return categories.find((c) => c.id === id)
  }

  return (
    <div className="home">
      <Header onSearchChange={setSearchValue} searchValue={searchValue} />

      <main className="home-main">
        <div className="container">
          <div className="home-header">
            <h2 className="page-title">Catálogo de Fornecedores</h2>
            <p className="page-subtitle">
              Encontre os melhores parceiros para o seu negócio
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">{suppliers.length}</span>
                <span className="stat-label">Fornecedores</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categorias</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{filteredSuppliers.length}</span>
                <span className="stat-label">Resultados</span>
              </div>
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {filteredSuppliers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>Nenhum fornecedor encontrado</h3>
              <p>Tente ajustar seus filtros ou busca</p>
            </div>
          ) : (
            <div className="suppliers-grid">
              {filteredSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  category={getCategoryById(supplier.categoryId)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home

