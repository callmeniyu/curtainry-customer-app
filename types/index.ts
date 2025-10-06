// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: 'readymade' | 'custom'
  rating?: number
  reviewCount?: number
  inStock: boolean
  tags?: string[]
  retailerName?: string
  city?: string
}

export interface ProductDetails extends Product {
  images: string[]
  colors: {
    name: string
    hex: string
    image?: string
  }[]
  sizes: {
    label: string
    value: string
    price: number
  }[]
  lining: {
    name: string
    description: string
    price: number
  }[]
  header: {
    name: string
    description: string
    price: number
  }[]
  stockCount: number
  reviews: {
    id: string
    userName: string
    userAvatar?: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
  specifications: {
    label: string
    value: string
  }[]
  policies: {
    title: string
    content: string
  }[]
}

export interface CustomCurtain {
  id: string
  name: string
  description: string
  fabricType: string
  image: string
  pricePerSqFt: number
  colors: string[]
  patterns: string[]
  rating?: number
  reviewCount?: number
}

// Service Types
export interface Service {
  id: string
  name: string
  description: string
  icon: string
  price: number
  duration: string
  availability: boolean
}

// Company/Retailer Types
export interface Company {
  id: string
  name: string
  description: string
  logo: string
  rating: number
  reviewCount: number
  location: string
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: Address
  profileImage?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Order Types
export interface CartItem {
  productId: string
  quantity: number
  customizations?: Record<string, any>
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: Date
  estimatedDelivery?: Date
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: number
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}