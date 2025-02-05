import { useParams } from 'react-router-dom';
import { StarRating } from '../../components/UI';
import { ProductIdPageSection } from './index.styled';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { useGetProductDetailsBySlugQuery } from '../../hooks/productHooks';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { TransparentButton } from '../../components/UI/TransparentButton/TransparentButton';

const ProductIdPage = () => {
  const { slug } = useParams<{ slug?: string }>();

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
      

      {/* Left: Product image gallery */}
      <div className="gallery">
        <figure onClick={() => console.log("Main image clicked")}>
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

      {/* Right: Product details */}
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
            <TransparentButton text="Standard" />
            <TransparentButton text="Active" typeBtn="active" />
            <TransparentButton text="Disabled" typeBtn="disabled" />
          </li>
        </ul>
      </div>
    </ProductIdPageSection>
  );
};

export default ProductIdPage;
