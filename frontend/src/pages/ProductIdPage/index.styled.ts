import styled from 'styled-components';

export const ProductIdPageSection = styled.section`\
  position: relative;
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;


  /* Left section: Image gallery */
  .gallery {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;

    /* Main product image */
    figure {
      width: 100%;
      height: 400px;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      cursor: pointer;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    /* Thumbnail list */
    .thumbnail-list {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      overflow-x: auto;
      padding-bottom: 5px;

      li {
        list-style: none;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s ease-in-out;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f5f5f5;
        border-radius: 5px;

        &:hover {
          border-color: #000;
        }

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  /* Right section: Product details */
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .line {
      height: 2px;
      background: #ddd;
      margin: 10px 0;
    }

    .price {
      font-size: 22px;
      font-weight: bold;
      color: #ff4500;
      margin-bottom: 15px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 8px;
        font-size: 16px;
      }

      .brand {
        font-weight: bold;
      }

      .description {
        color: #666;
        font-size: 14px;
      }

      /* Button container */
      .variant {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }
    }
  }

  /* Mobile version */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    padding: 20px;

    .gallery {
      max-width: 100%;
    }

    figure {
      height: 300px;
    }

    .thumbnail-list {
      justify-content: center;
      overflow-x: auto;
    }

    .info {
      max-width: 100%;
    }
  }
`;
