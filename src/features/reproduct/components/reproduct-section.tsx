'use client'

import { useState, useMemo } from 'react'
import { PRICES, PRODUCTS, sortProducts } from '@/constant'
import { Button } from '@/components/ui/shadcn/button'
import { ProductBox } from '@/components/global/product/product-box'
import { ProductList } from '@/components/global/product/product-list'
import { ProductPagination } from '@/components/global/product/product-pagination'
import { ProductWrapper } from '@/components/global/product/product-wrapper'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'

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

  const isPriceInRange = (productPrice: string, priceLabel: string) => {
    const price = parseFloat(productPrice.replace(/\./g, ''))
    const priceRange = PRICES.find((p) => p.label === priceLabel)

    if (!priceRange) return false

    const { min, max } = priceRange.value
    return price >= min * 1000 && price <= max * 1000
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
        selectedCategories.some((category) => {
          if (category === 'Kitchen Set')
            return product.category === 'Kitchen Set'
          if (category === 'Furniture') return product.category === 'Furniture'
          if (category === 'Material Building')
            return product.category === 'Material Building'
          return product.category.toLowerCase() === category.toLowerCase()
        })
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
        const productRating = parseFloat(product.rating)
        return selectedRatings.some((rating) => productRating >= rating)
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
        {/* Enhanced Filter Summary */}
        {hasActiveFilters && (
          <div className='mb-6 p-4 bg-default-50 rounded-lg border border-default-200'>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-sm text-default-600'>
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

            {/* Active Filters Display */}
            <div className='flex flex-wrap gap-2'>
              {selectedCategories &&
                selectedCategories.map((category) => (
                  <span
                    key={category}
                    className='inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20'
                  >
                    <Icon icon='heroicons:tag' className='w-3 h-3 mr-1' />
                    {category}
                  </span>
                ))}

              {selectedPriceRanges &&
                selectedPriceRanges.map((price) => (
                  <span
                    key={price}
                    className='inline-flex items-center px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full border border-success/20'
                  >
                    <Icon
                      icon='heroicons:currency-dollar'
                      className='w-3 h-3 mr-1'
                    />
                    {price}
                  </span>
                ))}

              {selectedRatings &&
                selectedRatings.map((rating) => (
                  <span
                    key={rating}
                    className='inline-flex items-center px-3 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full border border-warning/20'
                  >
                    <Icon icon='heroicons:star' className='w-3 h-3 mr-1' />
                    {rating}+ stars
                  </span>
                ))}

              {selectedCustomizations && selectedCustomizations.length > 0 && (
                <span className='inline-flex items-center px-3 py-1 bg-info/10 text-info text-xs font-medium rounded-full border border-info/20'>
                  <Icon icon='heroicons:cog-6-tooth' className='w-3 h-3 mr-1' />
                  {getCustomizationDisplayText(selectedCustomizations)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredProducts.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-20 h-20 mx-auto mb-4 bg-default-100 rounded-full flex items-center justify-center'>
              <Icon
                icon='heroicons:magnifying-glass'
                className='w-10 h-10 text-default-400'
              />
            </div>

            <h3 className='text-xl font-semibold text-default-800 mb-2'>
              No products found
            </h3>
            <p className='text-default-600 mb-6 max-w-md mx-auto'>
              We couldn&apos;t find any products matching your current filters.
              Try adjusting your search criteria or clearing some filters.
            </p>
            <Button
              variant='default'
              onClick={clearAllFilters}
              className='min-w-32'
            >
              <Icon icon='heroicons:arrow-path' className='w-4 h-4 mr-2' />
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className='mb-4 flex items-center justify-between'>
              <div className='text-sm text-default-600'>
                Page {currentPage} of {totalPages}
                {totalPages > 1 && (
                  <span className='text-default-500'>
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

              {/* Quick customization filter buttons */}
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
                  <Icon icon='heroicons:cog-6-tooth' className='w-3 h-3 mr-1' />
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
                    className='w-3 h-3 mr-1'
                  />
                  Standard
                </Button>
              </div>
            </div>

            {/* Product Grid/List */}
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

            {/* Pagination */}
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
