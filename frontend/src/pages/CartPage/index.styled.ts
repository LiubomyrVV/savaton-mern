import styled from 'styled-components'

export const Container = styled.div`

  max-width: 800px;

  margin: 0 auto;

  padding: 20px;

`;


export const Title = styled.h1`
  font-size: 22px;
  text-align: center;

  margin-bottom: 20px;

`;


export const ProductList = styled.ul`
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style-type: none;

  padding: 0;

`;


export const ProductItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const ProductImage = styled.img`

  width: 100px;

  height: 100px;

  object-fit: cover;

  margin-right: 15px;

`;


export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex-grow: 1;

`;


export const ProductName = styled.span`
display: block;
  font-size: 18px;
`;


export const ProductPrice = styled.span`
  font-size: 16px;
  color: #28a745;
`;


export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;


export const QuantityButton = styled.button`

  margin: 0 5px;
  padding: 1px 14px 5px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #0056b3;
  }

`;


export const DeleteButton = styled.button`

  margin-left: 10px;
  font-size: 14px;
  padding: 4px 14px 5px;

  border: none;

  background-color: #dc3545;

  color: white;

  border-radius: 5px;

  cursor: pointer;


  &:hover {

    background-color: #c82333;

  }

`;

export const NoProductsMessage = styled.div`
  text-align: center;
  p {
    margin: 10px 0;
  }
  a {
    color: #ff6b6b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;