import { Link } from 'react-router-dom'
import { ProductContainerWrapper } from './index.styled'
import { ROUTES } from '../../router'
import { CustomSwiper as Swiper } from '../ui/CustomSwiper'
import { Product } from '../../types/Product'

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
      <Swiper>
        {products.map(({ _id, name, images }) => {
          const { main_image, color_slug } = images[0]
          return (
            <div key={_id}>
              <figure>
                <img src={main_image} alt={color_slug} />
              </figure>
              {name}
            </div>
          )
        })}
      </Swiper>
    </ProductContainerWrapper>
  )
}

export default ProductContainer
