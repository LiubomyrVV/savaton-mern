import { Link } from 'react-router-dom'
import { ProductContainerWrapper } from './index.styled'
import { ROUTES } from '../../router'
import { CustomSwiper as Swiper } from '../UI/CustomSwiper/CustomSwiper'
import { Product } from '../../types/Product'
import ProductItem from '../ProductItem/ProductItem'

interface ProductContainerProp {
  products: Product[]
  isPending: boolean
}

const ProductContainer: React.FC<ProductContainerProp> = ({
  products,
  isPending,
}) => {
  if (isPending) return <div>idinahi</div>
  return (
    <ProductContainerWrapper>
      <div className="head">
        <h3>Featured Products</h3>
        <Link to={ROUTES.CART}>View All {`==>`}</Link>
      </div>
      <Swiper className="product-container">
        {products.map((product) => {
          return <ProductItem product={product} />
        })}
      </Swiper>
    </ProductContainerWrapper>
  )
}

export default ProductContainer
