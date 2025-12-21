'use client'

import { useState, useMemo } from 'react'
import { PRICES, PRODUCTS, sortProducts } from '@/constant'
import { Button } from '@/components/atoms/button'
import Wrapper from '@/components/atoms/wrapper'
import { Icon } from '@/components/atoms/icon'
import { ProductBox } from './product/product-box'
import { ProductList } from './product/product-list'
import { ProductPagination } from './product/product-pagination'
import { ProductWrapper } from './product/product-wrapper'
import { Empty } from '@/components/atoms/empty'

const ITEMS_PER_PAGE = 6

const ReProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('rating_high_low')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    boolean[]
  >([])

  const getAverageRating = (product: { reviews: { starReview: number }[] }) => {
    return product.reviews.length
      ? product.reviews.reduce((sum, review) => sum + review.starReview, 0) /
          product.reviews.length
      : 0
  }

  const isPriceInRange = (productPrice: string, priceLabel: string) => {
    const price = parseFloat(productPrice.replace(/\./g, ''))
    const priceRange = PRICES.find((p) => p.label === priceLabel)

    if (!priceRange) return false

    const { min, max } = priceRange.value
    return price >= min * 1000 && price <= max * 1000
  }

  const isRatingInRange = (productRating: number, ratingValue: number) => {
    if (ratingValue === 5.0) return productRating === 5.0
    if (ratingValue === 4.5) return productRating >= 4.5 && productRating <= 4.9
    if (ratingValue === 4.0) return productRating >= 4.0 && productRating <= 4.4
    if (ratingValue === 3.5) return productRating >= 3.5 && productRating <= 3.9
    if (ratingValue === 3.0) return productRating >= 3.0 && productRating <= 3.4
    return false
  }

  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS]

    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (
      selectedCategories &&
      selectedCategories.length > 0 &&
      !selectedCategories.includes('all')
    ) {
      filtered = filtered.filter((product) =>
        selectedCategories.some(
          (category) =>
            product.category.toLowerCase() === category.toLowerCase()
        )
      )
    }

    if (selectedPriceRanges && selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPriceRanges.some((priceRange) =>
          isPriceInRange(product.price, priceRange)
        )
      )
    }

    if (selectedRatings && selectedRatings.length > 0) {
      filtered = filtered.filter((product) => {
        const productRating = getAverageRating(product)
        return (
          product.reviews.length > 0 &&
          selectedRatings.some((rating) =>
            isRatingInRange(productRating, rating)
          )
        )
      })
    }

    if (selectedCustomizations && selectedCustomizations.length > 0) {
      if (
        selectedCustomizations.includes(true) &&
        selectedCustomizations.includes(false)
      ) {
      } else {
        filtered = filtered.filter((product) =>
          selectedCustomizations.includes(product.customized)
        )
      }
    }

    return sortProducts(filtered, sortBy)
  }, [
    searchTerm,
    selectedCategories,
    selectedPriceRanges,
    selectedRatings,
    selectedCustomizations,
    sortBy,
  ])

  useMemo(() => {
    setCurrentPage(1)
  }, [])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const updatedGetEcommerceNav = () => {
    return [
      {
        label: 'grid view',
        icon: 'heroicons:view-columns',
        active: viewMode === 'grid',
        onClick: () => setViewMode('grid'),
      },
      {
        label: 'list view',
        icon: 'heroicons:list-bullet',
        active: viewMode === 'list',
        onClick: () => setViewMode('list'),
      },
    ]
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setSelectedRatings([])
    setSelectedCustomizations([])
    setSortBy('rating_high_low')
    setCurrentPage(1)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const getCustomizationDisplayText = (customizations: boolean[]) => {
    if (customizations.includes(true) && customizations.includes(false)) {
      return 'All Products'
    } else if (customizations.includes(true)) {
      return 'Customized Only'
    } else if (customizations.includes(false)) {
      return 'Non-Customized Only'
    }
    return ''
  }

  const hasActiveFilters =
    searchTerm ||
    (selectedCategories && selectedCategories.length > 0) ||
    (selectedPriceRanges && selectedPriceRanges.length > 0) ||
    (selectedRatings && selectedRatings.length > 0) ||
    (selectedCustomizations && selectedCustomizations.length > 0)

  const sidebarProps = {
    searchTerm,
    onSearchChange: setSearchTerm,
    selectedCategories,
    onCategoryChange: setSelectedCategories,
    selectedPriceRanges,
    onPriceRangeChange: setSelectedPriceRanges,
    selectedRatings,
    onRatingChange: setSelectedRatings,
    selectedCustomizations,
    onCustomizationChange: setSelectedCustomizations,
  }

  return (
    <Wrapper className='py-20 lg:py-32'>
      <ProductWrapper
        getEcommerceNav={updatedGetEcommerceNav}
        showSidebar={true}
        sidebarProps={sidebarProps}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      >
        {hasActiveFilters && (
          <div className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-sm text-gray-600'>
                <span className='font-medium'>
                  Showing {filteredProducts.length} of {PRODUCTS.length}{' '}
                  products
                </span>
                {searchTerm && <span> for &quot;{searchTerm}&quot;</span>}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={clearAllFilters}
                className='text-sm hover:bg-destructive hover:text-destructive-foreground'
              >
                <Icon icon='heroicons:x-mark' className='w-4 h-4 mr-1' />
                Clear All
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              {selectedCategories &&
                selectedCategories.map((category) => (
                  <span
                    key={category}
                    className='inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20'
                  >
                    <Icon icon='heroicons:tag' className='size-3 mr-1' />
                    {category}
                  </span>
                ))}

              {selectedPriceRanges &&
                selectedPriceRanges.map((price) => (
                  <span
                    key={price}
                    className='inline-flex items-center px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20'
                  >
                    <Icon
                      icon='heroicons:currency-dollar'
                      className='size-3 mr-1'
                    />
                    {price}
                  </span>
                ))}

              {selectedRatings &&
                selectedRatings.map((rating) => (
                  <span
                    key={rating}
                    className='inline-flex items-center px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-medium rounded-full border border-yellow-500/20'
                  >
                    <Icon icon='heroicons:star' className='size-3 mr-1' />
                    {rating}+ stars
                  </span>
                ))}

              {selectedCustomizations && selectedCustomizations.length > 0 && (
                <span className='inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full border border-blue-500/20'>
                  <Icon icon='heroicons:cog-6-tooth' className='size-3 mr-1' />
                  {getCustomizationDisplayText(selectedCustomizations)}
                </span>
              )}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <Empty
            onClick={clearAllFilters}
            ButtonText='Clear Filters'
            Title='No products found'
            Desc="We couldn't find any products matching your current filters. Try
        adjusting your search criteria or clearing some filters."
          />
        ) : (
          <>
            <div className='mb-4 flex items-center justify-between'>
              <div className='text-sm text-foreground'>
                Page {currentPage} of {totalPages}
                {totalPages > 1 && (
                  <span className='text-muted-foreground'>
                    {' '}
                    ({startIndex + 1}-
                    {Math.min(
                      startIndex + ITEMS_PER_PAGE,
                      filteredProducts.length
                    )}{' '}
                    of {filteredProducts.length})
                  </span>
                )}
              </div>

              <div className='flex gap-2'>
                <Button
                  variant={
                    selectedCustomizations.length === 0 ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCustomizations([])}
                  className='text-xs'
                >
                  All
                </Button>
                <Button
                  variant={
                    selectedCustomizations.includes(true) &&
                    selectedCustomizations.length === 1
                      ? 'default'
                      : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCustomizations([true])}
                  className='text-xs'
                >
                  <Icon icon='heroicons:cog-6-tooth' className='size-3 mr-1' />
                  Customized
                </Button>
                <Button
                  variant={
                    selectedCustomizations.includes(false) &&
                    selectedCustomizations.length === 1
                      ? 'default'
                      : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCustomizations([false])}
                  className='text-xs'
                >
                  <Icon
                    icon='heroicons:square-3-stack-3d'
                    className='size-3 mr-1'
                  />
                  Standard
                </Button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
                {paginatedProducts.map((product) => (
                  <ProductBox
                    key={`grid_key_${product.id}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className='space-y-3 grid-cols-1 gap-5 h-max'>
                {paginatedProducts.map((product) => (
                  <div key={`list_key_${product.id}`}>
                    <ProductList product={product} />
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className='mt-8'>
                <ProductPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </ProductWrapper>
    </Wrapper>
  )
}

export { ReProductSection }
