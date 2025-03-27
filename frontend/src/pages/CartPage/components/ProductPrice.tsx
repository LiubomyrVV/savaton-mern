import React, { useContext } from 'react'

import { useCurrencyConverter } from '../../../hooks/currencyConverter'
import { Store } from '../../../store'
import styled from 'styled-components';


export const ProductPriceContainer = styled.span<{ isDiscounted: boolean }>`

  font-size: ${({ isDiscounted }) => (isDiscounted ? '12px' : '18px')};

  color: ${({ isDiscounted }) => (isDiscounted ? 'red' : '#28a745')};

  text-decoration: ${({ isDiscounted }) => (isDiscounted ? 'line-through' : 'none')}; /* Перекрещенный текст для скидки */

`;


const ProductPrice = ({ price, discount = false }: { price: number, discount?: boolean }) => {

  const { state } = useContext(Store);

  const {

    preferences: {

      valute

    }

  } = state;


  return (

    <ProductPriceContainer isDiscounted={discount}>

      {useCurrencyConverter(price).toLocaleString('en-US', {

        style: 'currency',

        currency: valute,

        minimumFractionDigits: 2,

        maximumFractionDigits: 2,

      })}

    </ProductPriceContainer>

  );

}


export default ProductPrice;