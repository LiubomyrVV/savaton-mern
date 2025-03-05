import { useEffect, useState } from 'react';
import { SearchContainer, Dropdown, DropdownItem, LoadingIndicator, ErrorMessage } from './index.styled'; // Импортируем стили
import { useGetProductsQuery } from '../../hooks/productHooks';
import { Product } from '../../types/Product';

const defaultValues = {
  icon: 'translateX(0)',
  placeholder: {
    top: '20px',
    left: '24px',
    zIndex: '-1',
    fontSize: '12px',
    padding: '0px',
  },
};

function SearchInput() {
  const [styles, setStyles] = useState(defaultValues);
  const { data, isLoading, isError } = useGetProductsQuery();
  const [isVisible, setIsVisible] = useState(false)
  const [searchedValue, setSearchedValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

  const { icon, placeholder } = styles;
  
  const changeStyles = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.type === 'focus') {
      setIsVisible(true)
      setStyles({
        ...styles,
        icon: 'translateX(38px)',
        placeholder: {
          top: '-3px',
          left: '12px',
          zIndex: '1',
          fontSize: '10px',
          padding: '4px 18px 0px',
        },
      });
    } else if (e.type === 'blur' && !e.target.value) {
      setIsVisible(false)
      setStyles(defaultValues);
    }
  };


  useEffect(() => {
    const pureSearchValue = searchedValue.toLowerCase().replace(/\s/g, '');
    const filteredData = data ? data.filter(item => 
      item.name.toLowerCase().replace(/\s/g, '').includes(pureSearchValue)
    ) : [];
    setSearchedProducts(filteredData);
  }, [searchedValue, data]);

  return (
    <>
      <SearchContainer>
        <input
          type="text"
          name="search"
          onFocus={changeStyles}
          onBlur={changeStyles}
          onChange={(event) => setSearchedValue(event.target.value)}
        />
        <i className="bi bi-search" style={{ transform: icon }}></i>
        <div className="placeholder" style={placeholder}>
          Search products
        </div>
      </SearchContainer>

      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {isError && <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>}
      {searchedProducts.length > 0 && (
        <Dropdown visible={isVisible}>
          {searchedProducts.map(product => (
            <DropdownItem key={product._id}>
              <img src={product.images[0].main_image} alt={product.name} />
              <a href={`/products/${product.slug}`} target="_blank" rel="noopener noreferrer">
                {product.name}
              </a>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </>
  );
}

export default SearchInput;