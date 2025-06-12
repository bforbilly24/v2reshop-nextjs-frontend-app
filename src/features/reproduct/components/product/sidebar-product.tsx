'use client'

import { SidebarProductProps } from '@/constant'
import {
  ECOMMERCE_CATEGORIES,
  PRICES,
  RATINGS,
  ECOMMERCE_CUSTOMIZATIONS,
  PRODUCTS,
} from '@/constant'
import { Card, CardContent, CardHeader } from '@/components/ui/shadcn/card'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { ScrollArea } from '@/components/ui/shadcn/scroll-area'
import { Icon } from '@/components/ui/icon'

const SidebarProduct = ({
  searchTerm = '',
  onSearchChange,
  selectedCategories = [],
  onCategoryChange,
  selectedPriceRanges = [],
  onPriceRangeChange,
  selectedRatings = [],
  onRatingChange,
  selectedCustomizations = [],
  onCustomizationChange,
}: SidebarProductProps) => {
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

  const getFilteredProducts = (excludeFilter?: string) => {
    let filtered = [...PRODUCTS]

    if (excludeFilter !== 'search' && searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (
      excludeFilter !== 'category' &&
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

    if (
      excludeFilter !== 'price' &&
      selectedPriceRanges &&
      selectedPriceRanges.length > 0
    ) {
      filtered = filtered.filter((product) =>
        selectedPriceRanges.some((priceRange) =>
          isPriceInRange(product.price, priceRange)
        )
      )
    }

    if (
      excludeFilter !== 'rating' &&
      selectedRatings &&
      selectedRatings.length > 0
    ) {
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

    if (
      excludeFilter !== 'customization' &&
      selectedCustomizations &&
      selectedCustomizations.length > 0
    ) {
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

    return filtered
  }

  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === 'all') {
      return getFilteredProducts('category').length.toString()
    }

    const filtered = getFilteredProducts('category')
    const count = filtered.filter(
      (product) =>
        product.category.toLowerCase() === categoryValue.toLowerCase()
    ).length

    return count.toString()
  }

  const getPriceCount = (priceLabel: string) => {
    const filtered = getFilteredProducts('price')
    const count = filtered.filter((product) =>
      isPriceInRange(product.price, priceLabel)
    ).length
    return count.toString()
  }

  const getRatingCount = (ratingValue: number) => {
    const filtered = getFilteredProducts('rating')
    const count = filtered.filter((product) => {
      const productRating = getAverageRating(product)
      return (
        product.reviews.length > 0 &&
        isRatingInRange(productRating, ratingValue)
      )
    }).length
    return count.toString()
  }

  const getCustomizationCount = (customizationValue: boolean) => {
    const filtered = getFilteredProducts('customization')
    const count = filtered.filter(
      (product) => product.customized === customizationValue
    ).length
    return count.toString()
  }

  const updatedCategories = ECOMMERCE_CATEGORIES.map((category) => ({
    ...category,
    count: getCategoryCount(category.value),
  }))

  const updatedPrices = PRICES.map((price) => ({
    ...price,
    count: getPriceCount(price.label),
  }))

  const updatedRatings = RATINGS.map((rating) => ({
    ...rating,
    count: getRatingCount(rating.value),
  }))

  const updatedCustomizations = ECOMMERCE_CUSTOMIZATIONS.map(
    (customization) => ({
      ...customization,
      count: getCustomizationCount(customization.value),
    })
  )

  const handleCategoryToggle = (categoryValue: string) => {
    if (typeof onCategoryChange !== 'function') {
      console.error('onCategoryChange is not a function')
      return
    }

    const currentCategories = selectedCategories || []
    const newCategories = currentCategories.includes(categoryValue)
      ? currentCategories.filter((cat) => cat !== categoryValue)
      : [...currentCategories, categoryValue]
    onCategoryChange(newCategories)
  }

  const handlePriceToggle = (priceLabel: string) => {
    if (typeof onPriceRangeChange !== 'function') {
      console.error('onPriceRangeChange is not a function')
      return
    }

    const currentPrices = selectedPriceRanges || []
    const newPrices = currentPrices.includes(priceLabel)
      ? currentPrices.filter((price) => price !== priceLabel)
      : [...currentPrices, priceLabel]
    onPriceRangeChange(newPrices)
  }

  const handleRatingToggle = (ratingValue: number) => {
    if (typeof onRatingChange !== 'function') {
      console.error('onRatingChange is not a function')
      return
    }

    const currentRatings = selectedRatings || []
    const newRatings = currentRatings.includes(ratingValue)
      ? currentRatings.filter((rating) => rating !== ratingValue)
      : [...currentRatings, ratingValue]
    onRatingChange(newRatings)
  }

  const handleCustomizationToggle = (customizationValue: boolean) => {
    if (typeof onCustomizationChange !== 'function') {
      console.error('onCustomizationChange is not a function')
      return
    }

    const currentCustomizations = selectedCustomizations || []
    let newCustomizations: boolean[]

    if (currentCustomizations.includes(customizationValue)) {
      newCustomizations = currentCustomizations.filter(
        (custom) => custom !== customizationValue
      )
    } else {
      newCustomizations = [...currentCustomizations, customizationValue]
    }

    onCustomizationChange(newCustomizations)
  }

  const handleSearchChange = (value: string) => {
    if (typeof onSearchChange !== 'function') {
      console.error('onSearchChange is not a function')
      return
    }
    onSearchChange(value)
  }

  return (
    <Card className='sticky top-24'>
      <CardHeader>
        <div className='relative'>
          <Icon
            icon='heroicons:magnifying-glass'
            className='absolute start-2 top-1/2 -translate-y-1/2 text-muted-foreground'
          />
          <Input
            type='text'
            placeholder='Search products...'
            className='ps-7'
            value={searchTerm || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </CardHeader>
      <ScrollArea className='h-[calc(100vh-14rem)]'>
        <CardContent className='space-y-6 divide-y divide-gray-200'>
          <div className='space-y-2'>
            <div className='text-foreground font-semibold text-xs uppercase pt-5 pb-2'>
              categories
            </div>
            {updatedCategories.map((category, i) => (
              <div
                key={`category_key_${i}`}
                className='flex justify-between items-center space-y-1'
              >
                <div className='flex gap-3 items-center'>
                  <Checkbox
                    id={`category_key_${i}`}
                    checked={(selectedCategories || []).includes(
                      category.value
                    )}
                    onCheckedChange={() => handleCategoryToggle(category.value)}
                  />
                  <Label
                    className='text-foreground flex gap-1 items-center justify-center font-normal cursor-pointer'
                    htmlFor={`category_key_${i}`}
                  >
                    <Icon
                      icon='heroicons:tag-solid'
                      className='size-4 text-muted-foreground'
                    />
                    <span className='text-foreground font-normal'>
                      {category.label}
                    </span>
                  </Label>
                </div>
                <span className='text-muted-foreground font-semibold text-xs'>
                  {category.count}
                </span>
              </div>
            ))}
          </div>
          <div className='space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6'>
            <div className='text-foreground font-semibold text-xs uppercase pt-5 pb-2'>
              customization
            </div>
            {updatedCustomizations.map((customization, i) => (
              <div
                key={`customization_${i}`}
                className='flex justify-between items-center space-y-1'
              >
                <div className='flex gap-3 items-center'>
                  <Checkbox
                    id={`customization_${i}`}
                    checked={(selectedCustomizations || []).includes(
                      customization.value
                    )}
                    onCheckedChange={() =>
                      handleCustomizationToggle(customization.value)
                    }
                  />
                  <Label
                    className='text-foreground flex gap-1 items-center justify-center font-normal cursor-pointer'
                    htmlFor={`customization_${i}`}
                  >
                    <Icon
                      icon='heroicons:cog-6-tooth-solid'
                      className='size-4 text-blue-400'
                    />
                    <span className='text-foreground font-normal'>
                      {customization.label}
                    </span>
                  </Label>
                </div>
                <span className='text-muted-foreground text-xs'>
                  {customization.count}
                </span>
              </div>
            ))}
          </div>
          <div className='space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6'>
            <div className='text-foreground font-semibold text-xs uppercase pt-5 pb-2'>
              price
            </div>
            {updatedPrices.map((price, i) => (
              <div
                key={`price_${i}`}
                className='flex justify-between items-center space-y-1'
              >
                <div className='flex gap-3 items-center'>
                  <Checkbox
                    id={`price_${i}`}
                    checked={(selectedPriceRanges || []).includes(price.label)}
                    onCheckedChange={() => handlePriceToggle(price.label)}
                  />
                  <Label
                    className='text-foreground flex gap-1 items-center justify-center font-normal cursor-pointer'
                    htmlFor={`price_${i}`}
                  >
                    <Icon
                      icon='heroicons:currency-dollar-solid'
                      className='size-4 text-green-400'
                    />
                    <span className='text-foreground font-normal'>
                      {price.label}
                    </span>
                  </Label>
                </div>
                <span className='text-muted-foreground text-xs'>
                  {price.count}
                </span>
              </div>
            ))}
          </div>
          <div className='space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6'>
            <div className='text-foreground font-semibold text-xs uppercase pt-5 pb-2'>
              ratings
            </div>
            {updatedRatings.map((rating, i) => (
              <div
                key={`rating_${i}`}
                className='flex justify-between items-center space-y-1'
              >
                <div className='flex gap-3 items-center'>
                  <Checkbox
                    id={`rating_${i}`}
                    checked={(selectedRatings || []).includes(rating.value)}
                    onCheckedChange={() => handleRatingToggle(rating.value)}
                  />
                  <Label
                    className='text-foreground flex gap-1 items-center justify-center font-normal cursor-pointer'
                    htmlFor={`rating_${i}`}
                  >
                    <Icon
                      icon='heroicons:star-solid'
                      className='size-4 text-yellow-400'
                    />
                    <span className='text-foreground font-normal'>
                      {rating.name}
                    </span>
                  </Label>
                </div>
                <span className='text-muted-foreground text-xs'>
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export { SidebarProduct }
