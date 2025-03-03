import React, { useState, useEffect } from 'react'
import ProductItem from "../../components/ProductItem/ProductItem"
import { useGetProductsQuery } from "../../hooks/productHooks"
import { ProductPageSection, ProductGrid, FilterAside, FilterHeader, FilterOption, RangeInput } from "./index.styled"
import { Product } from '../../types/Product'

const ProductPage = () => {
  const { data, isLoading, error } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data || [])
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 10000 })

  useEffect(() => {
    if (data) {
      // Filtering products based on selected filters
      let filtered = data

      // Filter by category
      if (typeFilter) {
        filtered = filtered.filter((product) => product.type === typeFilter)
      }

      // Filter by brand
      if (categoryFilter) {
        filtered = filtered.filter((product) => product.category === categoryFilter)
      }

      // Filter by price range
      filtered = filtered.filter((product) => product.price >= priceFilter.min && product.price <= priceFilter.max)

      setFilteredProducts(filtered)
    }
  }, [typeFilter, categoryFilter, priceFilter, data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <ProductPageSection>
      <FilterAside>
        <FilterHeader>Types</FilterHeader>

        {/* Category Filter */}
        <FilterOption
  style={{ backgroundColor: typeFilter === 'Electronics' ? '#ddd' : '#fff' }}
  onClick={() => setTypeFilter(typeFilter === 'Electronics' ? null : 'Electronics')}
>
  Electronics
</FilterOption>
<FilterOption
  style={{ backgroundColor: typeFilter === 'Gaming Laptop' ? '#ddd' : '#fff' }}
  onClick={() => setTypeFilter(typeFilter === 'Gaming Laptop' ? null : 'Gaming Laptop')}
>
  Gaming Laptop
</FilterOption>
<FilterOption
  style={{ backgroundColor: typeFilter === 'Business Laptop' ? '#ddd' : '#fff' }}
  onClick={() => setTypeFilter(typeFilter === 'Business Laptop' ? null : 'Business Laptop')}
>
  Business Laptop
</FilterOption>
<FilterOption
  style={{ backgroundColor: typeFilter === 'Sports & Action' ? '#ddd' : '#fff' }}
  onClick={() => setTypeFilter(typeFilter === 'Sports & Action' ? null : 'Sports & Action')}
>
  Sports & Action
</FilterOption>
<FilterOption
  style={{ backgroundColor: typeFilter === 'Gaming Accessories' ? '#ddd' : '#fff' }}
  onClick={() => setTypeFilter(typeFilter === 'Gaming Accessories' ? null : 'Gaming Accessories')}
>
  Gaming Accessories
</FilterOption>


   
        <FilterHeader>Categories</FilterHeader>
        <FilterOption
  style={{ backgroundColor: categoryFilter === 'Laptop' ? '#ddd' : '#fff' }}
  onClick={() => setCategoryFilter(categoryFilter === 'Laptop' ? null : 'Laptop')}
>
  Laptop
</FilterOption>
<FilterOption
  style={{ backgroundColor: categoryFilter === 'Headphones' ? '#ddd' : '#fff' }}
  onClick={() => setCategoryFilter(categoryFilter === 'Headphones' ? null : 'Headphones')}
>
  Headphones
</FilterOption>
<FilterOption
  style={{ backgroundColor: categoryFilter === 'Smartphone' ? '#ddd' : '#fff' }}
  onClick={() => setCategoryFilter(categoryFilter === 'Smartphone' ? null : 'Smartphone')}
>
  Smartphone
</FilterOption>
<FilterOption
  style={{ backgroundColor: categoryFilter === 'Smartwatch' ? '#ddd' : '#fff' }}
  onClick={() => setCategoryFilter(categoryFilter === 'Smartwatch' ? null : 'Smartwatch')}
>
  SmartWatch
</FilterOption>
<FilterOption
  style={{ backgroundColor: categoryFilter === 'Action Camera' ? '#ddd' : '#fff' }}
  onClick={() => setCategoryFilter(categoryFilter === 'Action Camera' ? null : 'Action Camera')}
>
  Action Camera
</FilterOption>

        

        {/* Price Filter */}
        <FilterHeader>Price</FilterHeader>
        <RangeInput
          type="range"
          min="0"
          max="10000"
          value={priceFilter.min}
          onChange={(e) => setPriceFilter({ ...priceFilter, min: Number(e.target.value) })}
        />
        <RangeInput
          type="range"
          min="0"
          max="10000"
          value={priceFilter.max}
          onChange={(e) => setPriceFilter({ ...priceFilter, max: Number(e.target.value) })}
        />
        <div>
          <span>Price: ${priceFilter.min} - ${priceFilter.max}</span>
        </div>
      </FilterAside>

      <ProductGrid>
        {filteredProducts.map((product, idx) => (
          <ProductItem key={idx} product={product} />
        ))}
      </ProductGrid>
    </ProductPageSection>
  )
}

export default ProductPage
