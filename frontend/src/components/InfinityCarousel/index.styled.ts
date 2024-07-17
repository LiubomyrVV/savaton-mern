import styled, { keyframes } from 'styled-components'
const slide = keyframes`
    from {
        transform: translateX(0)
    }
    to {
        transform: translateX(-50.4%)
    }
`
// animation: 5s ${slide} linear;
export const InfinityCarouselContainer = styled.section`
  display: flex;
  margin: 0 5%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  
  .blur {
  
    position: absolute;
    background-color: #fff;
    width: 14px;
    height: 38px;
    top: 0;
    z-index: 1;
    filter: blur(4px);
    }
  }
  ul {
    display: flex;
    gap: 40px;

    animation: 45s ${slide} infinite linear;
    li {
      display: flex;
      justify-content: center;

      h5 {
        font-weight: 600;
      }
      p {
        margin-top: 4px;
        min-height: 18px;
      }
      figure {
        display: grid;
        place-items: center;
        margin-right: 20px;
        i {
          font-size: 24px;
        }
      }
    }
  }
`
