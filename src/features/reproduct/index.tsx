'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/atoms/button'
import { Empty } from '@/components/atoms/empty'
import { Icon } from '@/components/atoms/icon'
import Wrapper from '@/components/atoms/wrapper'
import { getProducts, getProductCategories } from './actions'
import { ProductBoxSkeleton } from './components/atoms/product-box-skeleton'
import { ProductListSkeleton } from './components/atoms/product-list-skeleton'
import ProductBoxSection from './components/organisms/product-box-section'
import ProductListSection from './components/organisms/product-list-section'
import { ProductPaginationSection } from './components/organisms/product-pagination-section'
import { ProductWrapperSection } from './components/organisms/product-wrapper-section'
import { SidebarProductProps } from './components/types'
import { PRICES } from './constants'
import type { Category, ProductParams } from './types'

const ReProductView = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('rating_high_low')
  const [initialLoading, setInitialLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    boolean[]
  >([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await getProductCategories()
        if (categoriesRes.status) {
          setCategories(categoriesRes.data)
        }
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [])

  const queryParams = useMemo(() => {
    const params: ProductParams = {
      page: currentPage,
      search: searchTerm,
    }

    if (selectedCategories.length > 0) {
      params.category_id = parseInt(selectedCategories[0])
    }

    if (selectedCustomizations.length > 0) {
      if (
        selectedCustomizations.includes(true) &&
        !selectedCustomizations.includes(false)
      ) {
        params.customized = true
      } else if (
        selectedCustomizations.includes(false) &&
        !selectedCustomizations.includes(true)
      ) {
        params.customized = false
      }
    }

    if (selectedPriceRanges.length > 0) {
      let min = Infinity
      let max = -Infinity
      selectedPriceRanges.forEach((rangeLabel) => {
        const range = PRICES.find((p) => p.label === rangeLabel)
        if (range) {
          if (range.value.min * 1000 < min) min = range.value.min * 1000
          if (range.value.max * 1000 > max) max = range.value.max * 1000
        }
      })
      if (min !== Infinity) params.price_min = min
      if (max !== -Infinity) params.price_max = max
    }

    if (selectedRatings.length > 0) {
      params.rating_min = Math.floor(Math.min(...selectedRatings))
    }

    if (sortBy === 'rating_high_low') {
      params.sort = 'rating'
      params.order = 'desc'
    } else if (sortBy === 'price_low_high') {
      params.sort = 'price'
      params.order = 'asc'
    } else if (sortBy === 'price_high_low') {
      params.sort = 'price'
      params.order = 'desc'
    } else if (sortBy === 'latest') {
      params.sort = 'created_at'
      params.order = 'desc'
    }

    return params
  }, [
    currentPage,
    searchTerm,
    selectedCategories,
    selectedCustomizations,
    selectedPriceRanges,
    selectedRatings,
    sortBy,
  ])

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: async () => {
      const res = await getProducts(queryParams)
      if (!res.status) {
        throw new Error('Failed to fetch products')
      }
      return res.data
    },
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    if (!isLoading) {
      setInitialLoading(false)
    }
  }, [isLoading])

  const products = productsData?.data || []
  const totalPages = productsData?.last_page || 1

  const showSkeleton = initialLoading && isLoading

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

  const sidebarProps: SidebarProductProps = {
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
    availableCategories: categories,
  }

  return (
    <section id='reproduct' className='w-full relative'>
      <Wrapper className='py-20 lg:py-32'>
        <ProductWrapperSection
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
                    Showing {products.length} results
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
                  selectedCategories.map((catId) => {
                    const cat = categories.find(
                      (c) => c.id.toString() === catId
                    )
                    return (
                      <span
                        key={catId}
                        className='inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20'
                      >
                        <Icon icon='heroicons:tag' className='size-3 mr-1' />
                        {cat ? cat.name : catId}
                      </span>
                    )
                  })}

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

                {selectedCustomizations &&
                  selectedCustomizations.length > 0 && (
                    <span className='inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full border border-blue-500/20'>
                      <Icon
                        icon='heroicons:cog-6-tooth'
                        className='size-3 mr-1'
                      />
                      {getCustomizationDisplayText(selectedCustomizations)}
                    </span>
                  )}
              </div>
            </div>
          )}

          {showSkeleton ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'
                  : 'flex flex-col space-y-4'
              }
            >
              {Array.from({ length: 6 }).map((_, index) =>
                viewMode === 'grid' ? (
                  <ProductBoxSkeleton key={index} />
                ) : (
                  <ProductListSkeleton key={index} />
                )
              )}
            </div>
          ) : products.length === 0 ? (
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
                <div className='text-sm text-foreground hidden md:block'>
                  Page {currentPage}
                </div>

                <div className='hidden md:flex gap-2'>
                  <Button
                    variant={
                      selectedCustomizations.length === 0
                        ? 'default'
                        : 'outline'
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
                    <Icon
                      icon='heroicons:cog-6-tooth'
                      className='size-3 mr-1'
                    />
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

              <div className='block md:hidden'>
                <div className='grid grid-cols-2 gap-3 h-max'>
                  {products.map((product) => (
                    <ProductBoxSection
                      key={`mobile_grid_key_${product.id}`}
                      product={product}
                    />
                  ))}
                </div>
              </div>

              <div className='hidden md:block'>
                {viewMode === 'grid' ? (
                  <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
                    {products.map((product) => (
                      <ProductBoxSection
                        key={`grid_key_${product.id}`}
                        product={product}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='space-y-3 grid-cols-1 gap-5 h-max'>
                    {products.map((product) => (
                      <div key={`list_key_${product.id}`}>
                        <ProductListSection product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className='mt-8'>
                  <ProductPaginationSection
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          )}
        </ProductWrapperSection>
      </Wrapper>
    </section>
  )
}

export { ReProductView }
