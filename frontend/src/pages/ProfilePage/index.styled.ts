import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 80vh;
  padding: 20px;
`;

export const Aside = styled.aside`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  margin-right: 20px;
`;

export const MainContent = styled.main`
  flex: 1;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Title = styled.h1`
  color: #ff0000;
  font-size: 24px;
  margin-bottom: 20px;
`;


export const Button = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;
interface FavoritesListProps {

  isProducts: boolean;

}
export const FavoritesList = styled.ul<FavoritesListProps>`
 display: flex;
  justify-content: center;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  
  height: ${props => props.isProducts ? 'auto' : '100%'};
`;

export const FavoriteItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;

  p {
    display: grid;
    place-items: center;
    padding: 0 0 0 41px;
  }
`;

export const ImageContainer = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const RemoveButton = styled.button`
  padding: 4px 8px;
  height: fit-content;
  cursor: pointer;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4d4d;
  }

  &:focus {
    outline: none;
  }
`;

export const NoFavoritesMessage = styled.div`
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

export const Info = styled.span`
  color: #000;
  position: relative;
  font-size: 16px;
  margin: 10px 0;
  &:hover + div {
    opacity: 1;
    visibility: visible;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  left: 50%;
  transform: translate(-127px, 11px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  white-space: nowrap;
  z-index: 10;
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;