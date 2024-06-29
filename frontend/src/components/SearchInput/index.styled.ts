import styled from 'styled-components'

export const SearchContainer = styled.div`
  position: relative;
  overflow: hidden;
  input {
    border: 1px solid #b5b5b5;
    border-radius: 12px;
    padding: 18px 16px 12px;
    min-width: 250px;
    font-size: 16px;
    background: transparent;
    color: #606060;
  }
  i {
    transition: 400ms ease-in-out;
    position: absolute;
    z-index: -1;
    top: 18px;
    right: 14px;
  }
  .placeholder {
    transition: 400ms ease-in-out;
    border-radius: 40px;
    user-select: none;
    position: absolute;
    top: -3px;
    left: 12px;
    background: #fff;
    font-size: 12px;
    color: #b5b5b5;
  }
`
