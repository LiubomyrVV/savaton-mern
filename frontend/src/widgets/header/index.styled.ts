import styled from 'styled-components'

export const HeaderContainer = styled.header`
  .upper-part {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;

    &__underline {
      border: 1px solid var(--main-border);
      position: absolute;
      width: 100%;
      top: 72px;
      left: 0;
    }

    .info {
      display: flex;
      align-items: center;

      a {
        display: flex;
        gap: 12px;
        padding: 8px 20px 8px 0;

        &:nth-child(2) {
          padding: 8px 20px;
        }

        i {
          align-self: center;
        }

        &:nth-child(1) {
          border-right: 2px solid var(--main-border);
        }
      }
    }
    .functional {
      display: flex;

      .socials {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-left: 20px;
        i {
          cursor: pointer;
          padding: 6px;
          &:hover {
            color: var(--main-color);
          }
        }
      }
    }
  }
  .middle-part {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 110px;

    .logo {
      text-decoration: none;
      color: #000;
      padding: 8px 20px 8px 0;
      font-weight: 600;
      font-size: 26px;
      span {
        font-weight: 500;
        font-size: 40px;
        color: var(--main-color);
      }
    }
    .actions {
      display: flex;
      gap: 40px;
      .cart,
      .user {
        display: flex;
        gap: 20px;
        figure {
          align-self: center;
          i {
            font-size: 26px;
          }
        }
        div {
          display: flex;
          gap: 6px;
          flex-direction: column;
          span {
            display: inline-block;
            &:nth-child(2) {
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .lower-part {
    position: absolute;
    bottom: 0;
    left: 0;

    display: flex;

    height: 80px;
    background-color: var(--main-color);
  }
`
