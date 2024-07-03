import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../../hooks/productHooks'
import { HomePageSection } from './index.styled'

import 'react-toastify/dist/ReactToastify.css'
import { InfinityCarousel } from '../../components/InfinityCarousel/InfinityCarousel'
// import useNotification from '../../hooks/useNotification'
// import ProductItem from '../../components/ProductItem/ProductItem'

const CAROUSEL_DATA = [
  {
    getIcon: () => <i className="bi bi-headset"></i>,
    title: 'Responsive',
    subtitle: 'Customer service available 24/7',
  },
  {
    getIcon: () => <i className="bi bi-shield-check"></i>,
    title: 'Secure',
    subtitle: 'Certified marketplace since 2017',
  },
  {
    getIcon: () => <i className="bi bi-truck"></i>,
    title: 'Shipping',
    subtitle: 'Free, fast, and reliable worldwide',
  },
  {
    getIcon: () => <i className="bi bi-box-seam"></i>,
    title: 'Transparent',
    subtitle: 'Hassle-free return police',
  },
  {
    getIcon: () => <i className="bi bi-gift"></i>,
    title: 'Special Offers',
    subtitle: 'Exclusive deals and special offers.',
  },
  {
    getIcon: () => <i className="bi bi-star"></i>,
    title: 'Customer Satisfaction',
    subtitle: 'Ensuring high customer satisfaction.',
  },
]

const HomePage = () => {
  // data: products
  const { data, isPending, isError } = useGetProductsQuery()
  // const { notify } = useNotification()

  if (isPending) return <div>Loading..</div>
  if (isError) return <div>Error..</div>
  console.log(data[0])
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <HomePageSection>
        {/* <button onClick={() => notify('hey', 'info')}>Notify !</button>
        <ProductItem product={data[0]} /> */}
        {/* {products!.map((el) => {
        return <li>{el.price}</li>
      })} */}
        <InfinityCarousel items={CAROUSEL_DATA} />
      </HomePageSection>
    </>
  )
}

export default HomePage
