import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

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
