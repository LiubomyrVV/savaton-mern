import { CartItem, ShippingAddress } from './Cart'
import { User } from './User'

export type Order = {
  user: User
  orderItems: CartItem[]
  shippingAddress: ShippingAddress
  isPaid: boolean
  isDelivered: boolean
  _id: string
  paymentMethod: string
  createdAt: string
  paidAt: string
  deliveredAt: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}
