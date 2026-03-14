export interface CustomerStateProps {
  customers: Customer[]
  orders: Order[]
  products: Product[]
  productreviews: ProductReview[]
  error?: object | string | null
}

export interface Customer {
  name: string
  email: string
  location: string
  orders: number
  date: string
  status: number
}

export interface Order {
  id: string
  name: string
  company: string
  type: string
  qty: number
  date: string
  status: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  date: string
  qty: number
}

export interface ProductReview {
  name: string
  author: string
  review: string
  rating: number
  date: string
  status: number
}
