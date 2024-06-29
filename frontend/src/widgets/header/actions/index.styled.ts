import styled from 'styled-components'

export const HeaderActionsContainer = styled.div`
  display: flex;
  .icon {
    position: relative;
    z-index: -1;
    transition: 200ms ease-in-out;
  }
  .valutes {
    position: relative;
    display: flex;
    gap: 12px;
    padding: 8px 20px;
    border-right: 2px solid var(--main-border);
    cursor: pointer;
  }
  .languages {
    min-width: 104px;
    position: relative;
    display: flex;
    justify-content: center;
    gap: 14px;
    padding: 8px 20px;
    border-right: 1px solid var(--main-border);
    cursor: pointer;
  }
  .overlay {
    color: black;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dropdown {
    padding: 4px;
    background-color: #f2f2f2;
    border-radius: 10px;

    position: absolute;
    z-index: 1;
    top: 54px;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 6px;
    li {
      padding: 10px 20px;
      cursor: pointer;
    }
  }
`
