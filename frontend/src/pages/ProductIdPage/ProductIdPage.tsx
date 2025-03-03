import { useParams } from 'react-router-dom';
import { StarRating } from '../../components/UI';
import { ProductIdPageSection } from './index.styled';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { useGetProductDetailsBySlugQuery } from '../../hooks/productHooks';
import { Product } from '../../types/Product';
import { useContext, useEffect, useState } from 'react';
import { TransparentButton } from '../../components/UI/TransparentButton/TransparentButton';
import { Store } from '../../store';
import { CustomNotify } from '../../components/common/CustomNotify';
import { userInfo } from 'os';

const ProductIdPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { favoritesItems } = cart
  const { data, isPending, isError, refetch } = useGetProductDetailsBySlugQuery(slug || '');

  useEffect(() => {
    if (!data && slug) refetch().catch((error) => console.error('Error fetching data:', error));
  }, [data, slug, refetch]);

  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (data) {
      setMainImage(data.images[0].main_image);
    }
  }, [data]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details.</div>;
  if (!data) return <div>No product data available.</div>;

  const product: Product = data;
  
  return (
    <ProductIdPageSection>
      <Breadcrumbs />
      <div className="gallery">
        <figure>
          <img src={mainImage} alt={product.slug} />
        </figure>

        {/* Thumbnail list */}
        <ul className="thumbnail-list">
            <li key='Zero' onClick={() => setMainImage(product.images[0].main_image)}>
              <img src={product.images[0].main_image} alt={`Thumbnail Zero`} />
            </li>
          {product.images[0].images_gallery.map((img, index) => (
            <li key={index} onClick={() => setMainImage(img)}>
              <img src={img} alt={`Thumbnail ${index}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="info">
        <StarRating rating={product.rating} />
        <h2>{product.name}</h2>
        <div className="line"></div>
        <div className="price">${product.price}</div>
        <ul>
          <li className="brand">Brand: {product.brand}</li>
          <li className="type">Type: {product.type}</li>
          <li className="description">{product.description}</li>
          <li className="variant">
            {data.quantity <= 0 ? 
              <TransparentButton text="Продано" typeBtn="disabled" /> 
            :
            <>
              <div onClick={() => {
                    if (!state.userInfo) {
                      CustomNotify('Для цієї операції треба бути залогованим', 'warning')
                      return
                    }
                  dispatch({ type: 'CART_ADD_ITEM', payload: data})
                  CustomNotify('Продукт успішно додано до кошика', 'success', undefined, '/cart')
                }}>
                <TransparentButton text="Додати до кошика" />
              </div>
              <div onClick={() => {
                  if (!state.userInfo) {
                    CustomNotify('Для цієї операції треба бути залогованим', 'warning')
                    return
                  }
                  dispatch({ type: 'FAVORITES_ADD_ITEM', payload: data})
                  if (favoritesItems.find((favorite: Product) => {
                    return data.slug === favorite.slug
                  })) { 
                    CustomNotify('Продукт вже є в улюбленних', 'warning')
                  } else {
                    CustomNotify('Продукт успішно додано до улюбленних', 'success', undefined, '/profile')
                  }
                }}>
                <TransparentButton text="Додати до улюблених" typeBtn="active" />
              </div>
            </>
            }
          </li>
        </ul>
      </div>
    </ProductIdPageSection>
  );
};

export default ProductIdPage;
