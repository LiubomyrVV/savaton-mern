import { Image } from './Image'

export interface Product {
  _id: string
  name: string
  slug: string
  images: Image[]
  brand: string
  category: string
  type: string
  description: string
  price: number
  discount: number
  quantity: number
  cartQuantity: number
  rating: number
  numReviews: number
}
