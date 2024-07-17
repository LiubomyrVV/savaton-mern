import { useContext } from 'react'
import { ProductItemContainer } from './index.styled'
import { Store } from '../../store'
import { CartItem } from '../../types/Cart'
import { Product } from '../../types/Product'
import { Link } from 'react-router-dom'
import { StarRating } from '../UI'

// import { convertProductToCartItem } from '../../utils'

interface ProductProps {
  product: Product
}
const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { _id, name, type, rating, price, images, numReviews } = product
  const { main_image, color_slug } = images[0]
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
  {
    /* <button
    onClick={() => addToCartHandler(convertProductToCartItem(product))}
  ></button> */
  }
  return (
    <ProductItemContainer>
      <div key={_id}>
        <figure>
          <img src={main_image} alt={color_slug} />
        </figure>
        <div className="content">
          <div className="type">{type}</div>
          <div className="name">
            <Link to="/">{name}</Link>
          </div>
          <div className="rating">
            <div className="stars">
              <StarRating rating={rating} />
            </div>
            <span className="count">({numReviews})</span>
          </div>
          <div className="price">
            {price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>
    </ProductItemContainer>
  )
}

export default ProductItem
