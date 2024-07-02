import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../../hooks/productHooks'
import { HomePageSection } from './index.styled'

import 'react-toastify/dist/ReactToastify.css'
import useNotification from '../../hooks/useNotification'
import ProductItem from '../../components/ProductItem/ProductItem'
const HomePage = () => {
  // data: products
  const { data, isPending, isError } = useGetProductsQuery()
  const { notify } = useNotification()

  if (isPending) return <div>Loading..</div>
  if (isError) return <div>Error..</div>
  console.log(data[0])
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <HomePageSection>
        <button onClick={() => notify('hey', 'info')}>Notify !</button>
        <ProductItem product={data[0]} />
        {/* {products!.map((el) => {
        return <li>{el.price}</li>
      })} */}
      </HomePageSection>
    </>
  )
}

export default HomePage
