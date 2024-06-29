import { useGetProductsQuery } from '../../hooks/productHooks'
import { HomePageSection } from './index.styled'

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  console.log(products)
  return isLoading ? (
    'loading'
  ) : error ? (
    'error'
  ) : (
    <HomePageSection>
      {/* {products!.map((el) => {
        return <li>{el.price}</li>
      })} */}
    </HomePageSection>
  )
}

export default HomePage
