// Utilitários para gerenciar localStorage

const STORAGE_KEYS = {
  SUPPLIERS: 'suppliers',
  CATEGORIES: 'categories',
  USERS: 'users',
}

// Dados iniciais
const initialCategories = [
  { id: '1', name: 'Brinquedos', icon: 'Gamepad2', color: '#ff6b9d' },
  { id: '2', name: 'Eletrônicos', icon: 'Smartphone', color: '#3483fa' },
  { id: '3', name: 'Moda e Vestuário', icon: 'Shirt', color: '#ff6b9d' },
  { id: '4', name: 'Cosméticos', icon: 'Sparkles', color: '#ff6b9d' },
  { id: '5', name: 'Alimentos e Bebidas', icon: 'Utensils', color: '#00a650' },
  { id: '6', name: 'Casa e Decoração', icon: 'Home', color: '#764ba2' },
  { id: '7', name: 'Esportes e Lazer', icon: 'Dumbbell', color: '#3483fa' },
  { id: '8', name: 'Pet Shop', icon: 'Heart', color: '#ff9800' },
  { id: '9', name: 'Papelaria', icon: 'BookOpen', color: '#667eea' },
  { id: '10', name: 'Ferramentas', icon: 'Wrench', color: '#ff6b35' },
]

const initialSuppliers = [
  {
    id: '1',
    name: 'Estrela Brinquedos',
    categoryId: '1',
    description: 'Fabricante líder de brinquedos educativos e tradicionais no Brasil há mais de 80 anos. Especializada em jogos, bonecas e brinquedos de montar.',
    website: 'https://www.estrela.com.br',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['2', '3'],
    contact: 'contato@estrela.com.br',
    phone: '(11) 3456-7890',
    address: 'São Paulo, SP',
  },
  {
    id: '2',
    name: 'Mattel Brasil',
    categoryId: '1',
    description: 'Marca mundialmente reconhecida de brinquedos, incluindo Barbie, Hot Wheels e Fisher-Price. Produtos de alta qualidade para todas as idades.',
    website: 'https://www.mattel.com/pt-br',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['1', '3'],
    contact: 'contato@mattel.com.br',
    phone: '(11) 2345-6789',
    address: 'São Paulo, SP',
  },
  {
    id: '3',
    name: 'Hasbro Brasil',
    categoryId: '1',
    description: 'Criadora de marcas icônicas como Monopoly, Play-Doh, Nerf e Transformers. Brinquedos inovadores que inspiram diversão e criatividade.',
    website: 'https://www.hasbro.com/pt-br',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['1', '2'],
    contact: 'contato@hasbro.com.br',
    phone: '(11) 3456-7891',
    address: 'Rio de Janeiro, RJ',
  },
  {
    id: '4',
    name: 'Apple Brasil',
    categoryId: '2',
    description: 'Tecnologia de ponta com iPhone, iPad, Mac e Apple Watch. Inovação e design premium para transformar sua experiência digital.',
    website: 'https://www.apple.com/br',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['5', '6'],
    contact: 'contato@apple.com.br',
    phone: '0800-761-0867',
    address: 'São Paulo, SP',
  },
  {
    id: '5',
    name: 'Samsung Brasil',
    categoryId: '2',
    description: 'Líder em tecnologia móvel, eletrodomésticos e displays. Smartphones Galaxy, TVs QLED e soluções inteligentes para casa.',
    website: 'https://www.samsung.com/br',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['4', '6'],
    contact: 'contato@samsung.com.br',
    phone: '0800-124-421',
    address: 'Campinas, SP',
  },
  {
    id: '6',
    name: 'Xiaomi Brasil',
    categoryId: '2',
    description: 'Tecnologia acessível com smartphones, smart TVs e dispositivos inteligentes. Qualidade premium a preços justos.',
    website: 'https://www.mi.com/br',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['4', '5'],
    contact: 'contato@xiaomi.com.br',
    phone: '0800-941-0008',
    address: 'São Paulo, SP',
  },
  {
    id: '7',
    name: 'Natura',
    categoryId: '4',
    description: 'Cosméticos naturais e sustentáveis. Beleza autêntica com produtos veganos e cruelty-free para cuidados com pele e cabelo.',
    website: 'https://www.natura.com.br',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['8', '9'],
    contact: 'contato@natura.com.br',
    phone: '0800-115-566',
    address: 'Cajamar, SP',
  },
  {
    id: '8',
    name: 'Avon Brasil',
    categoryId: '4',
    description: 'Beleza e bem-estar com produtos de qualidade. Maquiagem, perfumes e cuidados pessoais para toda a família.',
    website: 'https://www.avon.com.br',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['7', '9'],
    contact: 'contato@avon.com.br',
    phone: '0800-708-2222',
    address: 'São Paulo, SP',
  },
  {
    id: '9',
    name: 'O Boticário',
    categoryId: '4',
    description: 'Perfumaria e cosméticos brasileiros. Fragrâncias exclusivas e produtos de beleza com inovação e qualidade.',
    website: 'https://www.boticario.com.br',
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['7', '8'],
    contact: 'contato@boticario.com.br',
    phone: '0800-727-0000',
    address: 'São José dos Pinhais, PR',
  },
  {
    id: '10',
    name: 'Renner',
    categoryId: '3',
    description: 'Moda para toda a família com tendências atuais. Roupas, calçados e acessórios com estilo e qualidade.',
    website: 'https://www.lojasrenner.com.br',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['11', '12'],
    contact: 'contato@renner.com.br',
    phone: '0800-606-6060',
    address: 'Porto Alegre, RS',
  },
  {
    id: '11',
    name: 'C&A Brasil',
    categoryId: '3',
    description: 'Moda acessível e sustentável. Roupas, calçados e acessórios para toda a família com preços justos.',
    website: 'https://www.cea.com.br',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['10', '12'],
    contact: 'contato@cea.com.br',
    phone: '0800-701-5500',
    address: 'São Paulo, SP',
  },
  {
    id: '12',
    name: 'Zara Brasil',
    categoryId: '3',
    description: 'Moda rápida com tendências internacionais. Coleções atualizadas semanalmente com design contemporâneo.',
    website: 'https://www.zara.com/br',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    relatedSuppliers: ['10', '11'],
    contact: 'contato@zara.com.br',
    phone: '0800-727-2727',
    address: 'São Paulo, SP',
  },
]

const initialUsers = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
]

export const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Erro ao ler ${key} do localStorage:`, error)
    return null
  }
}

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error)
    return false
  }
}

export const getSuppliers = () => {
  return getStorageData(STORAGE_KEYS.SUPPLIERS) || []
}

export const getCategories = () => {
  return getStorageData(STORAGE_KEYS.CATEGORIES) || []
}

export const getUsers = () => {
  return getStorageData(STORAGE_KEYS.USERS) || []
}

export const saveSupplier = (supplier) => {
  const suppliers = getSuppliers()
  const existingIndex = suppliers.findIndex((s) => s.id === supplier.id)
  
  if (existingIndex >= 0) {
    suppliers[existingIndex] = supplier
  } else {
    suppliers.push(supplier)
  }
  
  return setStorageData(STORAGE_KEYS.SUPPLIERS, suppliers)
}

export const deleteSupplier = (id) => {
  const suppliers = getSuppliers().filter((s) => s.id !== id)
  return setStorageData(STORAGE_KEYS.SUPPLIERS, suppliers)
}

export const saveCategory = (category) => {
  const categories = getCategories()
  const existingIndex = categories.findIndex((c) => c.id === category.id)
  
  if (existingIndex >= 0) {
    categories[existingIndex] = category
  } else {
    categories.push(category)
  }
  
  return setStorageData(STORAGE_KEYS.CATEGORIES, categories)
}

export const deleteCategory = (id) => {
  const categories = getCategories().filter((c) => c.id !== id)
  return setStorageData(STORAGE_KEYS.CATEGORIES, categories)
}

export const saveUser = (user) => {
  const users = getUsers()
  const existingIndex = users.findIndex((u) => u.id === user.id)
  
  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }
  
  return setStorageData(STORAGE_KEYS.USERS, users)
}

export const initializeData = () => {
  // Inicializar categorias se não existirem
  if (!getStorageData(STORAGE_KEYS.CATEGORIES)) {
    setStorageData(STORAGE_KEYS.CATEGORIES, initialCategories)
  }

  // Inicializar fornecedores se não existirem
  if (!getStorageData(STORAGE_KEYS.SUPPLIERS)) {
    setStorageData(STORAGE_KEYS.SUPPLIERS, initialSuppliers)
  }

  // Inicializar usuários se não existirem
  if (!getStorageData(STORAGE_KEYS.USERS)) {
    setStorageData(STORAGE_KEYS.USERS, initialUsers)
  }
}

