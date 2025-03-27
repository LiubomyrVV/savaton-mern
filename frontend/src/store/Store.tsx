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
    favoritesItems: localStorage.getItem('favoritesItems')
      ? JSON.parse(localStorage.getItem('favoritesItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')!
      : 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: localStorage.getItem('taxPrice')
    ? Number(localStorage.getItem('taxPrice'))!
    : 0,
    totalPrice: localStorage.getItem('totalPrice')
    ? Number(localStorage.getItem('totalPrice'))!
    : 0,
  },
}

export type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'FAVORITES_ADD_ITEM'; payload: CartItem}
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_TOTAL_ITEM'; payload: CartItem}
  | { type: 'FAVORITES_REMOVE_ITEM'; payload: CartItem}
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
        if (!state.userInfo) {
          console.warn('User  must be logged in to add items to the cart.');
          return state; 
        }
        const newItem = action.payload;
        
        newItem.cartQuantity = newItem.cartQuantity ? newItem.cartQuantity : 1; 
      
        const existItem = state.cart.cartItems.find(
          (item: CartItem) => item._id === newItem._id
        );
      
        const cartItems = existItem
          ? state.cart.cartItems.map((item: CartItem) =>
              item._id === existItem._id
                ? { ...item, cartQuantity: (item.cartQuantity || 0) + 1 } 
                : item
            )
          : [...state.cart.cartItems, { ...newItem, cartQuantity: 1 }];
      
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
        const newTotalPrice = cartItems.reduce((acc: number, curr: CartItem) => {
          const discountedPrice = curr.price - curr.discount;
          return acc + discountedPrice * (curr.cartQuantity || 1);
        }, 0); 
      

        const totalDiscount = cartItems.reduce((acc: number, curr: CartItem) => {
          const itemDiscount = curr.discount * (curr.cartQuantity || 1);
          return acc + itemDiscount;
        }, 0); 

        localStorage.setItem('taxPrice', JSON.stringify(totalDiscount));
        localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));

        return { ...state, cart: { ...state.cart, cartItems, totalPrice: newTotalPrice, taxPrice: totalDiscount } };
      }
      
      case 'FAVORITES_ADD_ITEM': {
        if (!state.userInfo) {
          console.warn('User  must be logged in to add items to favorites.');
          return state; 
        }
        const newItem = action.payload;
      
        const existItem = state.cart.favoritesItems.find(
          (item: CartItem) => item._id === newItem._id
        );
      
        const favoritesItems = existItem
          ? state.cart.favoritesItems.map((item: CartItem) =>
              item._id === existItem._id ? newItem : item
            )
          : [...state.cart.favoritesItems, newItem];
      
        localStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
        return { ...state, cart: { ...state.cart, favoritesItems } };
      }
      
      case 'CART_REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.map((item: CartItem) => {
          if (item._id === action.payload._id) {
            if (item.cartQuantity && item.cartQuantity > 1) {
              return { ...item, cartQuantity: item.cartQuantity - 1 };
            }
            return null;
          }
          return item; 
        }).filter((item: CartItem | null) => item !== null); 
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        const newTotalPrice = cartItems.reduce((acc: number, curr: CartItem) => {
          const discountedPrice = curr.price - curr.discount;
          return acc + discountedPrice * (curr.cartQuantity || 1);
        }, 0);
      
        const totalDiscount = cartItems.reduce((acc: number, curr: CartItem) => {
          const itemDiscount = curr.discount * (curr.cartQuantity || 1);
          return acc + itemDiscount;
        }, 0);
      
        localStorage.setItem('taxPrice', JSON.stringify(totalDiscount));     
        localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
        return { ...state, cart: { ...state.cart, cartItems, totalPrice: newTotalPrice, taxPrice: totalDiscount } };  
      }
      case 'CART_REMOVE_TOTAL_ITEM': {
          const cartItems = state.cart.cartItems.filter((item: CartItem) => item._id !== action.payload._id);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          const newTotalPrice = cartItems.reduce((acc: number, curr: CartItem) => {
            const discountedPrice = curr.price - curr.discount;
            return acc + discountedPrice * (curr.cartQuantity || 1);
          }, 0);
          const totalDiscount = cartItems.reduce((acc: number, curr: CartItem) => {
            const itemDiscount = curr.discount * (curr.cartQuantity || 1);
            return acc + itemDiscount;
          }, 0);
          localStorage.setItem('taxPrice', JSON.stringify(totalDiscount));
          localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
          return { ...state, cart: { ...state.cart, cartItems, totalPrice: newTotalPrice, taxPrice: totalDiscount } };
      }
      case 'FAVORITES_REMOVE_ITEM': {
        const favoritesItems = state.cart.favoritesItems.filter(
          (item: CartItem) => item._id !== action.payload._id
        );
      
        localStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
      
        return { ...state, cart: { ...state.cart, favoritesItems } };
      }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }

    case 'USER_SIGNOUT':
      localStorage.clear()
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
          favoritesItems: [],
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
      };
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
