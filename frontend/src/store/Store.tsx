import React from 'react'
import { Cart, CartItem, ShippingAddress } from '../types/Cart'
import { UserInfo } from '../types/UserInfo'
import i18n from '../i18next';
import { languages } from './lib/constants';

interface Preferences {
  valute: string; 
  valuteList: string[];
  language: string;
  languageList: string[];
}

type AppState = {
  mode: string
  preferences: Preferences
  cart: Cart
  userInfo?: UserInfo
} 


const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
  preferences: {
    valute: localStorage.getItem('currentValute')
    ? JSON.parse(localStorage.getItem('currentValute')!)
    : 'USD',
    valuteList: localStorage.getItem('currentValuteList')
    ? JSON.parse(localStorage.getItem('currentValuteList')!)
    : ['EUR', 'GBP'],
    language: localStorage.getItem('currentLanguage')
    ? JSON.parse(localStorage.getItem('currentLanguage')!)
    : 'English',
    languageList: localStorage.getItem('currentLanguageList')
    ? JSON.parse(localStorage.getItem('currentLanguageList')!)
    : ['Polish', 'Ukrainian'],
  },
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')!
      : 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
}

export type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }
  | { type: 'SET_CURRENT_LANGUAGE'; payload: string }
  | { type: 'SET_CURRENT_VALUTE'; payload: string }
  | { type: 'SET_CURRENT_LANGUAGE_LIST'; payload: string[] }
  | { type: 'SET_CURRENT_VALUTE_LIST'; payload: string[] }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark')
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      )
      console.log('Checkckckckc2')
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return {
        mode:
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        preferences: {
          valute: 'USD',
          valuteList: ['EUR', 'GBP'],
          language: 'English',
          languageList: ['Polish', 'Ukrainian']
        },
        cart: {
          cartItems: [],
          paymentMethod: 'PayPal',
          shippingAddress: {
            fullName: '',
            address: '',
            postalCode: '',
            city: '',
            country: '',
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
    case 'SET_CURRENT_LANGUAGE':
      localStorage.setItem('currentLanguage', JSON.stringify(action.payload))
      i18n.changeLanguage(languages[action.payload as keyof typeof languages])
      return {
        ...state, 
        preferences: { ...state.preferences, language: action.payload }
      }
    case 'SET_CURRENT_LANGUAGE_LIST':
      localStorage.setItem('currentLanguageList', JSON.stringify(action.payload))
      return {
        ...state, 
        preferences: { ...state.preferences, languageList: action.payload }
      }
    case 'SET_CURRENT_VALUTE':
      localStorage.setItem('currentValute', JSON.stringify(action.payload))
      return {
        ...state, 
        preferences: { ...state.preferences, valute: action.payload }
      }
    case 'SET_CURRENT_VALUTE_LIST':
      localStorage.setItem('currentValuteList', JSON.stringify(action.payload))
      return {
        ...state, 
        preferences: { ...state.preferences, valuteList: action.payload }
      }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
