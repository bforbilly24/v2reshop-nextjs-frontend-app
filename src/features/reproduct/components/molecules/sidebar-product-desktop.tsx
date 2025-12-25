'use client'

import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Checkbox } from '@/components/atoms/checkbox'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { ScrollArea } from '@/components/atoms/scroll-area'
import {
  PRICES,
  RATINGS,
  CUSTOMIZATIONS as ECOMMERCE_CUSTOMIZATIONS,
} from '@/features/reproduct/constants'
import { SidebarProductProps } from '../types'

const SidebarProductDesktop = ({
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
  availableCategories = [],
}: SidebarProductProps) => {
  const updatedCategories = availableCategories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }))

  const updatedPrices = PRICES

  const updatedRatings = RATINGS

  const updatedCustomizations = ECOMMERCE_CUSTOMIZATIONS

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
                <span className='text-muted-foreground text-xs'></span>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export { SidebarProductDesktop }
