import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, Plus, Edit, Trash2, Users, Package, Tag, 
  Save, X, Mail, Calendar 
} from 'lucide-react'
import { 
  getSuppliers, getCategories, getUsers,
  saveSupplier, deleteSupplier, saveCategory, deleteCategory 
} from '../utils/storage'
import { getIcon } from '../utils/icons'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('suppliers')
  const [suppliers, setSuppliers] = useState([])
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setSuppliers(getSuppliers())
    setCategories(getCategories())
    setUsers(getUsers())
  }

  const handleSaveSupplier = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const supplier = {
      id: editingSupplier?.id || Date.now().toString(),
      name: formData.get('name'),
      categoryId: formData.get('categoryId'),
      description: formData.get('description'),
      website: formData.get('website'),
      image: formData.get('image'),
      contact: formData.get('contact'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      relatedSuppliers: editingSupplier?.relatedSuppliers || [],
    }

    saveSupplier(supplier)
    loadData()
    setEditingSupplier(null)
    setShowSupplierForm(false)
    e.target.reset()
  }

  const handleSaveCategory = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const category = {
      id: editingCategory?.id || Date.now().toString(),
      name: formData.get('name'),
      icon: formData.get('icon'),
      color: formData.get('color'),
    }

    saveCategory(category)
    loadData()
    setEditingCategory(null)
    setShowCategoryForm(false)
    e.target.reset()
  }

  const handleDeleteSupplier = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      deleteSupplier(id)
      loadData()
    }
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      deleteCategory(id)
      loadData()
    }
  }

  const startEditSupplier = (supplier) => {
    setEditingSupplier(supplier)
    setShowSupplierForm(true)
  }

  const startEditCategory = (category) => {
    setEditingCategory(category)
    setShowCategoryForm(true)
  }

  const cancelEdit = () => {
    setEditingSupplier(null)
    setEditingCategory(null)
    setShowSupplierForm(false)
    setShowCategoryForm(false)
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Voltar
            </Link>
            <h1 className="admin-title">Painel Administrativo</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'suppliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('suppliers')}
          >
            <Package size={20} />
            Fornecedores ({suppliers.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tag size={20} />
            Categorias ({categories.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            Usuários ({users.length})
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'suppliers' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Gerenciar Fornecedores</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditingSupplier(null)
                    setShowSupplierForm(true)
                  }}
                >
                  <Plus size={20} />
                  Adicionar Fornecedor
                </button>
              </div>

              {showSupplierForm && (
                <div className="form-modal">
                  <form onSubmit={handleSaveSupplier} className="admin-form">
                    <div className="form-header">
                      <h3>{editingSupplier ? 'Editar' : 'Novo'} Fornecedor</h3>
                      <button type="button" onClick={cancelEdit} className="close-btn">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nome *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          defaultValue={editingSupplier?.name || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Categoria *</label>
                        <select
                          name="categoryId"
                          required
                          defaultValue={editingSupplier?.categoryId || ''}
                        >
                          <option value="">Selecione...</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label>Descrição *</label>
                        <textarea
                          name="description"
                          required
                          rows="4"
                          defaultValue={editingSupplier?.description || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Website *</label>
                        <input
                          type="url"
                          name="website"
                          required
                          defaultValue={editingSupplier?.website || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Imagem (URL) *</label>
                        <input
                          type="url"
                          name="image"
                          required
                          defaultValue={editingSupplier?.image || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="contact"
                          defaultValue={editingSupplier?.contact || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Telefone</label>
                        <input
                          type="tel"
                          name="phone"
                          defaultValue={editingSupplier?.phone || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Endereço</label>
                        <input
                          type="text"
                          name="address"
                          defaultValue={editingSupplier?.address || ''}
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={cancelEdit} className="cancel-btn">
                        Cancelar
                      </button>
                      <button type="submit" className="save-btn">
                        <Save size={18} />
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Website</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => {
                      const category = categories.find((c) => c.id === supplier.categoryId)
                      return (
                        <tr key={supplier.id}>
                          <td>
                            <div className="table-cell-content">
                              <img
                                src={supplier.image}
                                alt={supplier.name}
                                className="table-image"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                }}
                              />
                              <span>{supplier.name}</span>
                            </div>
                          </td>
                          <td>
                            {category && (
                              <span className="category-badge" style={{ backgroundColor: category.color }}>
                                {(() => {
                                  const CategoryIcon = getIcon(category.icon)
                                  return (
                                    <>
                                      <CategoryIcon size={14} />
                                      <span>{category.name}</span>
                                    </>
                                  )
                                })()}
                              </span>
                            )}
                            {!category && <span className="category-badge" style={{ backgroundColor: '#999' }}>Sem categoria</span>}
                          </td>
                          <td>
                            <a
                              href={supplier.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="table-link"
                            >
                              {supplier.website}
                            </a>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => startEditSupplier(supplier)}
                                className="action-btn edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteSupplier(supplier.id)}
                                className="action-btn delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Gerenciar Categorias</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditingCategory(null)
                    setShowCategoryForm(true)
                  }}
                >
                  <Plus size={20} />
                  Adicionar Categoria
                </button>
              </div>

              {showCategoryForm && (
                <div className="form-modal">
                  <form onSubmit={handleSaveCategory} className="admin-form">
                    <div className="form-header">
                      <h3>{editingCategory ? 'Editar' : 'Nova'} Categoria</h3>
                      <button type="button" onClick={cancelEdit} className="close-btn">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nome *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          defaultValue={editingCategory?.name || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Ícone (nome do ícone Lucide) *</label>
                        <input
                          type="text"
                          name="icon"
                          required
                          defaultValue={editingCategory?.icon || ''}
                          placeholder="Gamepad2"
                        />
                        <small style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                          Ex: Gamepad2, Smartphone, Shirt, etc.
                        </small>
                      </div>
                      <div className="form-group">
                        <label>Cor (hex) *</label>
                        <input
                          type="color"
                          name="color"
                          required
                          defaultValue={editingCategory?.color || '#ff6b35'}
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={cancelEdit} className="cancel-btn">
                        Cancelar
                      </button>
                      <button type="submit" className="save-btn">
                        <Save size={18} />
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="categories-grid">
                {categories.map((category) => (
                  <div key={category.id} className="category-card">
                    <div
                      className="category-color"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="category-content">
                      <div className="category-icon">
                        {(() => {
                          const CategoryIcon = getIcon(category.icon)
                          return <CategoryIcon size={32} />
                        })()}
                      </div>
                      <h3>{category.name}</h3>
                      <div className="category-actions">
                        <button
                          onClick={() => startEditCategory(category)}
                          className="action-btn edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="action-btn delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Usuários Cadastrados</h2>
              </div>
              <div className="users-grid">
                {users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <div className="user-details">
                        <div className="user-detail-item">
                          <Mail size={16} />
                          <span>{user.email}</span>
                        </div>
                        <div className="user-detail-item">
                          <Calendar size={16} />
                          <span>
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin

