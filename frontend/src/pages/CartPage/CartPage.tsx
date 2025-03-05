import { useContext, useEffect, useState } from "react";
import { 
  Container, 
  DeleteButton, 
  NoProductsMessage, 
  ProductDetails, 
  ProductImage, 
  ProductItem, 
  ProductList, 
  ProductName, 
  QuantityButton, 
  QuantityControls, 
  Title 
} from "./index.styled";
import { Store } from "../../store";
import { CartItem } from "../../types/Cart";
import { useTranslation } from 'react-i18next'; // Импорт useTranslation
import { Link } from "react-router-dom";
import ProductPrice from "./components/ProductPrice";
import { TransparentButton } from "../../components/UI/TransparentButton/TransparentButton";

const CartPage = () => {
  const { t } = useTranslation('cart');
  const { state, dispatch } = useContext(Store);
  const [products, setProducts] = useState<CartItem[]>([]);
  const { cart: { cartItems } } = state;

  useEffect(() => {
    setProducts(cartItems);
  }, [cartItems]);

  return (
    <Container>
      <Title>{t('Product List')}</Title>

      <ProductList style={products.length ? { boxShadow: '0 4px 8px rgba(0, 0, 0, 0)' } : { height: '80vh', display: 'grid', placeItems: 'center' }}>
        {products.length ? products.map((product, idx) => {
          const rawPrice = product.price * product.cartQuantity;
          const price = (product.price - product.discount) * product.cartQuantity;

          return (
            <ProductItem key={idx}>
              <Link to={`/products/${product.slug}`}>
                <ProductImage src={product.images[0].main_image} alt={product.name} />
              </Link>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <QuantityControls>
                  <span>{t('Quantity')}: {product.cartQuantity} {t('pcs')}</span> {/* Динамический перевод количества */}
                  <QuantityButton style={{ marginLeft: 'auto' }} onClick={() => dispatch({ type: 'CART_REMOVE_ITEM', payload: product })}>-</QuantityButton>
                  <QuantityButton onClick={() => dispatch({ type: 'CART_ADD_ITEM', payload: product })}>+</QuantityButton>
                  <DeleteButton onClick={() => dispatch({ type: 'CART_REMOVE_TOTAL_ITEM', payload: product })}>{t('Remove')}</DeleteButton> 
                </QuantityControls>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <ProductPrice price={price} />
                  <ProductPrice price={rawPrice} discount={true} />
                </div>  
              </ProductDetails>
            </ProductItem>
          );
        }) 
        :
         <NoProductsMessage>
          <p>{t('No products in the cart')}</p>
          <Link to='/products'>{t('Go to the products page')}</Link>
        </NoProductsMessage>           
        }
      </ProductList>
      {products.length 
      ? 
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TransparentButton text={t('Proceed to Checkout')} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <ProductPrice price={state.cart.totalPrice} />
          <ProductPrice price={state.cart.totalPrice + state.cart.taxPrice} discount={true} />
        </div>  
      </div>
      : 
      null
      }
    </Container>
  );
}

export default CartPage;