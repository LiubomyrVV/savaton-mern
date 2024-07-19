import { useParams } from 'react-router-dom'
import { ProductIdPageSection } from './index.styled'

const ProductIdPage = () => {
  const params = useParams()
  console.log(params)
  return <ProductIdPageSection>ProductId</ProductIdPageSection>
}

export default ProductIdPage
