import React, { useState, useEffect } from 'react'
import ProductItem from "../../components/ProductItem/ProductItem"
import { useGetProductsQuery } from "../../hooks/productHooks"
import { ProductPageSection, ProductGrid, FilterAside, FilterHeader, FilterOption, RangeInput } from "./index.styled"
import { Product } from '../../types/Product'

const ProductPage = () => {
  const { data, isLoading, error } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data || [])
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 10000 })

  useEffect(() => {
    if (data) {
      // Filtering products based on selected filters
      let filtered = data

      // Filter by category
      if (categoryFilter) {
        filtered = filtered.filter((product) => product.category === categoryFilter)
      }

      // Filter by brand
      if (brandFilter) {
        filtered = filtered.filter((product) => product.brand === brandFilter)
      }

      // Filter by price range
      filtered = filtered.filter((product) => product.price >= priceFilter.min && product.price <= priceFilter.max)

      setFilteredProducts(filtered)
    }
  }, [categoryFilter, brandFilter, priceFilter, data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <ProductPageSection>
      <FilterAside>
        <FilterHeader>Filters</FilterHeader>

        {/* Category Filter */}
        <FilterOption onClick={() => setCategoryFilter(categoryFilter === 'Electronics' ? null : 'Electronics')}>Electronics</FilterOption>
        <FilterOption onClick={() => setCategoryFilter('Clothing')}>Clothing</FilterOption>
        <FilterOption onClick={() => setCategoryFilter('Accessories')}>Accessories</FilterOption>

        {/* Brand Filter */}
        <FilterHeader>Brands</FilterHeader>
        <FilterOption onClick={() => setBrandFilter('Brand A')}>Brand A</FilterOption>
        <FilterOption onClick={() => setBrandFilter('Brand B')}>Brand B</FilterOption>
        <FilterOption onClick={() => setBrandFilter('Brand C')}>Brand C</FilterOption>

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
