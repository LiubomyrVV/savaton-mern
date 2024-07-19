import styled from 'styled-components'

export const ProductItemContainer = styled.div`
  figure {
    img {
      width: 60%;
      height: 60%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0 20px;
    .type {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.13rem;
      margin: 14px 0;
    }
    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-align: start;

      color: var(--black);
      line-height: 1.5;
      height: 3em;
      font-weight: 600;
      cursor: pointer;
      transition: 200ms ease;
      a {
        text-decoration: none;
        color: var(--black);
        transition: color 200ms ease, text-decoration 200ms ease; /* Transition for color and text-decoration */

        /* Hover effect for link */
      }
      &:hover a {
        text-decoration: underline;
        color: var(--main-color);

        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-decoration-color: var(--main-color);
        transition: 200ms ease;
      }
      &:hover ~ .price {
        color: var(--main-color);
        transition: 200ms ease;
      }
    }
    .rating {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 6px 0 12px;
      .count {
        display: inline-block;
        margin-left: 12px;
        font-size: 12.5px;
      }
    }
    .price {
      display: inline-block;
      font-weight: 600;
      transition: 200ms ease;
    }
  }
`
