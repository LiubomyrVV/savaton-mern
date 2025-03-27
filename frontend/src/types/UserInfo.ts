import { CartItem } from "./Cart"

interface Preferences {
  valute: string,
  valuteList: string[],
  language: string,
  languageList: string[]
}

export type UserInfo = {
  name: string
  email: string
  token: string
  isAdmin: boolean
  isVerified: boolean
  image: string
  cartItems: CartItem[]
  favoritesItems: CartItem[]
  preferences: Preferences
}
