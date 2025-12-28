'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import { ScrollArea } from '@/components/atoms/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/atoms/sheet'
import {
  PRICES,
  RATINGS,
  CUSTOMIZATIONS as ECOMMERCE_CUSTOMIZATIONS,
  SELECT_CATEGORIES,
} from '@/features/reproduct/constants'
import { SidebarProductProps } from '../types'

const SidebarProductMobile = ({
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
  sortBy = 'rating_high_low',
  onSortChange,
  availableCategories,
}: SidebarProductProps) => {
  const [localCategories, setLocalCategories] = useState(selectedCategories)
  const [localPrices, setLocalPrices] = useState(selectedPriceRanges)
  const [localRatings, setLocalRatings] = useState(selectedRatings)
  const [localCustomizations, setLocalCustomizations] = useState(
    selectedCustomizations
  )
  const [localSortBy, setLocalSortBy] = useState(sortBy)
  const [isOpen, setIsOpen] = useState(false)

  const categoriesToRender = (availableCategories || []).map((c) => ({
    label: c.name,
    value: c.id.toString(),
  }))

  useEffect(() => {
    if (isOpen) {
      setLocalCategories(selectedCategories)
      setLocalPrices(selectedPriceRanges)
      setLocalRatings(selectedRatings)
      setLocalCustomizations(selectedCustomizations)
      setLocalSortBy(sortBy)
    }
  }, [
    isOpen,
    selectedCategories,
    selectedPriceRanges,
    selectedRatings,
    selectedCustomizations,
    sortBy,
  ])

  const handleApply = () => {
    onCategoryChange(localCategories)
    onPriceRangeChange(localPrices)
    onRatingChange(localRatings)
    onCustomizationChange(localCustomizations)
    if (onSortChange) {
      onSortChange(localSortBy)
    }
    setIsOpen(false)
  }

  const handleReset = () => {
    setLocalCategories([])
    setLocalPrices([])
    setLocalRatings([])
    setLocalCustomizations([])
    setLocalSortBy('rating_high_low')
  }

  const handleLocalCategoryToggle = (categoryValue: string) => {
    setLocalCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((c) => c !== categoryValue)
        : [...prev, categoryValue]
    )
  }

  const handleLocalPriceToggle = (priceLabel: string) => {
    setLocalPrices((prev) =>
      prev.includes(priceLabel)
        ? prev.filter((p) => p !== priceLabel)
        : [...prev, priceLabel]
    )
  }

  const handleLocalRatingToggle = (ratingValue: number) => {
    setLocalRatings((prev) =>
      prev.includes(ratingValue)
        ? prev.filter((r) => r !== ratingValue)
        : [...prev, ratingValue]
    )
  }

  const handleLocalCustomizationToggle = (customizationValue: boolean) => {
    setLocalCustomizations((prev) =>
      prev.includes(customizationValue)
        ? prev.filter((c) => c !== customizationValue)
        : [...prev, customizationValue]
    )
  }

  return (
    <div className='flex gap-2 items-center w-full mb-0 lg:hidden'>
      <div className='relative flex-1'>
        <Icon
          icon='heroicons:magnifying-glass'
          className='absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5'
        />
        <Input
          type='text'
          placeholder='Search products...'
          className='ps-10 h-10 rounded-lg bg-gray-50 border-gray-200'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='h-10 w-10 rounded-lg border-gray-200'
          >
            <Icon icon='heroicons:adjustments-horizontal' className='size-5' />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='bottom'
          className='h-[85vh] rounded-t-xl p-0 flex flex-col'
        >
          <SheetHeader className='p-4 border-b'>
            <SheetTitle className='text-center'>Filter</SheetTitle>
          </SheetHeader>
          <ScrollArea className='flex-1 p-4'>
            <div className='space-y-6'>
              <div>
                <h3 className='font-semibold mb-3 text-sm'>Urutkan</h3>
                <Select value={localSortBy} onValueChange={setLocalSortBy}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    {SELECT_CATEGORIES.map((selectCategory, i) => (
                      <SelectItem key={i} value={selectCategory.value}>
                        {selectCategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className='font-semibold mb-3 text-sm'>Kategori</h3>
                <div className='flex flex-wrap gap-2'>
                  {categoriesToRender.map((cat) => (
                    <Badge
                      key={cat.value}
                      variant={
                        localCategories.includes(cat.value)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer px-4 py-2 text-sm font-normal rounded-full'
                      onClick={() => handleLocalCategoryToggle(cat.value)}
                    >
                      {cat.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-semibold mb-3 text-sm'>Tipe Penjual</h3>
                <div className='flex flex-wrap gap-2'>
                  <Badge
                    variant={
                      localCustomizations.length === 0 ? 'default' : 'outline'
                    }
                    className='cursor-pointer px-4 py-2 text-sm font-normal rounded-full'
                    onClick={() => setLocalCustomizations([])}
                  >
                    All
                  </Badge>
                  {ECOMMERCE_CUSTOMIZATIONS.map((custom) => (
                    <Badge
                      key={custom.label}
                      variant={
                        localCustomizations.includes(custom.value) &&
                        localCustomizations.length > 0
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer px-4 py-2 text-sm font-normal rounded-full'
                      onClick={() =>
                        handleLocalCustomizationToggle(custom.value)
                      }
                    >
                      {custom.label === 'Non-Customized'
                        ? 'Standard'
                        : custom.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-semibold mb-3 text-sm'>Batas Harga</h3>
                <div className='flex flex-wrap gap-2'>
                  {PRICES.map((price) => (
                    <Badge
                      key={price.label}
                      variant={
                        localPrices.includes(price.label)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer px-4 py-2 text-sm font-normal rounded-full'
                      onClick={() => handleLocalPriceToggle(price.label)}
                    >
                      {price.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-semibold mb-3 text-sm'>Penilaian</h3>
                <div className='flex flex-wrap gap-2'>
                  {RATINGS.map((rating) => (
                    <Badge
                      key={rating.value}
                      variant={
                        localRatings.includes(rating.value)
                          ? 'default'
                          : 'outline'
                      }
                      className='cursor-pointer px-4 py-2 text-sm font-normal rounded-full flex items-center gap-1'
                      onClick={() => handleLocalRatingToggle(rating.value)}
                    >
                      <Icon icon='heroicons:star-solid' className='size-3' />
                      {rating.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className='p-4 border-t grid grid-cols-2 gap-4'>
            <Button variant='outline' onClick={handleReset}>
              Atur Ulang
            </Button>
            <Button onClick={handleApply}>Pakai</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { SidebarProductMobile }
