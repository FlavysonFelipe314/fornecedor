import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getIcon } from '../utils/icons'
import './CategoryFilter.css'

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="category-filter">
      <div className="filter-header">
        <h3>Categorias</h3>
        <button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Recolher' : 'Expandir'}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      <div className={`filter-buttons ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button
          className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          Todas
        </button>
        {categories.map((category) => {
          const IconComponent = getIcon(category.icon)
          return (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(category.id)}
            >
              <IconComponent className="filter-icon" size={18} />
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter

