import styled from 'styled-components'

export const ProductPageSection = styled.section`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  padding: 20px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 70%;
`;

export const FilterAside = styled.aside`
  width: 250px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

export const FilterHeader = styled.h3`
  margin-bottom: 20px;
`;

export const FilterOption = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const RangeInput = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
