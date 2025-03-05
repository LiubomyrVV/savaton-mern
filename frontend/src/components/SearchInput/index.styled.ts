import styled from 'styled-components';

interface Props {
  visible: boolean;
}

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
    transition: border-color 0.3s;

    &:focus {
      border-color: #b03232; /* Красный цвет при фокусе */
      outline: none; /* Убираем стандартный outline */
    }
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
`;


export const Dropdown = styled.ul<Props>`
  position: absolute;
  top: 100%; /* Позиционируем под инпутом */
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px; /* Более мягкие углы */
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => (props.visible ? 'block' : 'none')}; /* Условное отображение */
  
  scrollbar-width: thin; /* Уменьшаем ширину ползунка для Firefox */
  scrollbar-color: #b03232 #f0f0f0; /* Цвет ползунка и фона для Firefox */

  &::-webkit-scrollbar {
    width: 8px; /* Ширина ползунка для Chrome */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b03232; /* Цвет ползунка для Chrome */
    border-radius: 10px; /* Скругление углов ползунка */
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* Цвет фона ползунка для Chrome */
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* Увеличиваем отступы для более мягкого ощущения */
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0; /* Легкая разделительная линия между элементами */
  width: 100%; /* Увеличиваем ширину элемента списка */

  img {
    width: 40px; /* Ширина изображения */
    height: 40px; /* Высота изображения */
    border-radius: 4px; /* Скругление углов изображения */
    margin-right: 12px; /* Отступ между изображением и текстом */
  }

  &:hover {
    background-color: #f0f0f0; /* Цвет фона при наведении */
  }

  a {
    color: #b03232; /* Красный цвет для ссылок */
    text-decoration: none; /* Убираем подчеркивание */
    font-weight: bold; /* Жирный шрифт для названия продукта */
    flex-grow: 1; /* Заставляем ссылку занимать оставшееся пространство */
  }
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  color: #606060;
  font-size: 14px;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  color: red;
  font-size: 14px;
`;