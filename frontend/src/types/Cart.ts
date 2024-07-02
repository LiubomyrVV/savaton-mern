import { Image } from './Image'

export type CartItem = {
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
  rating: number
  numReviews: number
}

export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  country: string
  postalCode: string
}

export type Cart = {
  cartItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}
