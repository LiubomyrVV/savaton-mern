// import { useContext } from 'react'
// import { ProductItemContainer } from './index.styled'
// import { Store } from '../../store'

// const ProductItem = () => {
//     const { state, dispatch } = useContext(Store)
//     const {
//       cart: { cartItems },
//     } = state

//     const addToCartHandler = (item: CartItem) => {
//       const existItem = cartItems.find((x) => x._id === product._id)
//       const quantity = existItem ? existItem.quantity + 1 : 1
//       if (product.countInStock < quantity) {
//         alert('Sorry. Product is out of stock')
//         return
//       }
//       dispatch({
//         type: 'CART_ADD_ITEM',
//         payload: { ...item, quantity },
//       })

//     }
//   return <ProductItemContainer>ProductItem</ProductItemContainer>
// }

// export default ProductItem
