import { AsideWrapper } from './index.styled'

import { useGetCategoriesQuery } from '../../../../hooks/productHooks'
import List from '../List/List'


const Aside = () => { 
  const { data, isPending, isError } = useGetCategoriesQuery
  return (
    <AsideWrapper>
        <List title={'Categories'} /> 
        <List title={'Brands'} />
    </AsideWrapper>
  )
}

export default Aside