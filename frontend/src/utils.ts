import { useContext, useEffect, useState } from 'react'
import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'
import { Store } from './store'
export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    images: product.images,
    brand: product.brand,
    category: product.category,
    type: product.type,
    description: product.description,
    price: product.price,
    discount: product.discount,
    quantity: product.quantity,
    rating: product.rating,
    numReviews: product.numReviews,
  }

  return cartItem
}





interface CurrencyConverterProps {
  amount: number
  from: string
  to: string
}

export const convertCurrency = async ({ amount, from, to }: CurrencyConverterProps): Promise<number | null> => {
  if (from === to) return amount

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
    const data = await response.json()
    return amount * data.rates[to]
  } catch (error) {
    console.error('Error fetching exchange rate:', error)
    return null
  }
}
