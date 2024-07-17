import styled from 'styled-components'

export const StarRatingContainer = styled.div`
  display: flex;
  gap: 4px;
  .item {
    font-size: 14.8px;
    background: linear-gradient(
      45deg,
      rgba(255, 249, 196, 1) 0%,
      rgba(255, 202, 40, 1) 100%
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  item-empty {
    color: rgba(0, 0, 0, 0.1);
  }
`
