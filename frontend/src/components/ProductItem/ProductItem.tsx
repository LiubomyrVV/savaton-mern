import { useContext } from 'react'
import { ProductItemContainer } from './index.styled'
import { Store } from '../../store'
import { CartItem } from '../../types/Cart'
import { Product } from '../../types/Product'
import { convertProductToCartItem } from '../../utils'

interface ProductProps {
  product: Product
}
const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.quantity < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    console.log(state, product)
  }
  return (
    <ProductItemContainer>
      <button
        onClick={() => addToCartHandler(convertProductToCartItem(product))}
      ></button>
    </ProductItemContainer>
  )
}

export default ProductItem
