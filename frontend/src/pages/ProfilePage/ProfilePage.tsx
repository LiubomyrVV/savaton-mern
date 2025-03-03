import { Helmet } from 'react-helmet-async';
import { Aside, Button, Container, FavoriteItem, FavoritesList, ImageContainer, Info, MainContent, Title, NoFavoritesMessage, RemoveButton, TooltipContainer, Tooltip } from './index.styled';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../../types/Cart';
import apiClient from '../../apiClient';
import { CustomNotify } from '../../components/common/CustomNotify';

const ProfilePage = () => {
  const { state, dispatch } = useContext(Store);
  const [products, setProducts] = useState<CartItem[]>([]);
  const { userInfo, cart: { favoritesItems } } = state;
  const [isVerified, setIsVerified] = useState(userInfo?.isVerified)
  const nav = useNavigate();

  useEffect(() => {
    setProducts(favoritesItems);
  }, [favoritesItems]);
    
  return (
    <>
      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <Container>
        <Aside style={isVerified ? {display: 'flex', flexDirection: 'column'} : null}>
          <Title>Особистий Кабінет</Title>
          <ImageContainer style={{ width: '40%', marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto'}}>
            <img src={userInfo?.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtYlBdDn2iouTCJ-DS20jUy8uGX0qYmad7Q&s'}/>
          </ImageContainer>
          <Info>Ім'я: {userInfo?.name}</Info>
          <Info style={{display: 'flex', gap: '4px'}}>{isVerified ? <i className="bi bi-patch-check"></i>: <i className="bi bi-ban"></i>}
            <div>
              Email: {userInfo?.email} 
            </div>
              </Info>
           
         {isVerified ? 
         null : 
         <TooltipContainer onClick={
          async () => {
            if (userInfo) {
              try {
                const response = await apiClient.get("api/users/verified", {
                  params: { email: userInfo.email }
                });
                if (response.status === 200) {
                  setIsVerified(true)
                  const newUserInfo = {...userInfo, isVerified: true}
                  localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
                  CustomNotify("Email is already verified", "success")
                } else {
                  CustomNotify("Email is not verified, check your mailbox", "error")
                }
              } catch (error) {
                CustomNotify("Error", "error")
              }
            } else {
              CustomNotify("User information is not available.", "error")
            }
        }}>
        <Info style={{color:"red", cursor: 'pointer'}}>Почта не підтвердженна!</Info>
        <Tooltip>Натисніть щоб перевірити почту</Tooltip>
      </TooltipContainer>
        } 
          <Button onClick={() => {
            dispatch({type: 'USER_SIGNOUT'})
            CustomNotify('User is signed out successfully', 'success')
            nav('/')
            }} style={{marginTop: '6px'}}>Вийти</Button>
        </Aside>

        <MainContent>
          <h2>Улюблені товари</h2>
          <FavoritesList isProducts={products.length ? true : false}>
            {products.length ? products.map((product, idx) => (
              <FavoriteItem key={idx}>
                <Link style={{ display: 'flex' }} to={`/products/${product.slug}`}>
                  <ImageContainer>
                    <img src={product.images[0].main_image} alt={product.name} />
                  </ImageContainer>
                  <p>{product.name}</p>
                </Link>
                <RemoveButton onClick={() => dispatch({ type: 'FAVORITES_REMOVE_ITEM', payload: product })}>
                  <i className="bi bi-trash" style={{ fontSize: '24px' }}></i>
                </RemoveButton>
              </FavoriteItem>
            )) : (
              <NoFavoritesMessage>
                <p>В вас немає улюблених товарів</p>
                <Link to='/products'>Перейти на сторінку товарів</Link>
              </NoFavoritesMessage>
            )}
          </FavoritesList>
        </MainContent>
      </Container>
    </>
  );
};

export default ProfilePage;