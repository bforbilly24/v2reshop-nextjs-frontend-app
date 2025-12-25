'use client'

import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Label } from '@/components/atoms/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { SELECT_CATEGORIES } from '@/features/reproduct/constants'
import { SidebarProductDesktop } from '../molecules/sidebar-product-desktop'
import { SidebarProductMobile } from '../molecules/sidebar-product-mobile'
import { SidebarProductProps } from '../types'

type EcommerceNav = {
  label: string
  icon: string
  active: boolean
  onClick?: () => void
}

interface ProductWrapperProps {
  children: React.ReactNode
  getEcommerceNav?: () => EcommerceNav[]
  showSidebar?: boolean
  showSort?: boolean
  sidebarProps?: SidebarProductProps
  sortBy?: string
  onSortChange?: (sortBy: string) => void
}

const ProductWrapperSection = ({
  children,
  getEcommerceNav,
  showSidebar = true,
  showSort = true,
  sidebarProps,
  sortBy = 'rating_high_low',
  onSortChange,
}: ProductWrapperProps) => {
  const menus = getEcommerceNav
    ? getEcommerceNav()
    : [
        {
          label: 'grid view',
          icon: 'heroicons:view-columns',
          active: false,
        },
        {
          label: 'list view',
          icon: 'heroicons:list-bullet',
          active: false,
        },
      ]

  const handleSortChange = (value: string) => {
    if (onSortChange && typeof onSortChange === 'function') {
      onSortChange(value)
    }
  }

  return (
    <div className='w-full'>
      <div
        className={cn(
          'grid gap-5 w-full',
          showSidebar ? 'grid-cols-12' : 'grid-cols-1'
        )}
      >
        {showSidebar && sidebarProps && (
          <div className='lg:col-span-3 col-span-12 hidden lg:block'>
            <div className='hidden lg:block'>
              <SidebarProductDesktop
                searchTerm={sidebarProps.searchTerm}
                onSearchChange={sidebarProps.onSearchChange}
                selectedCategories={sidebarProps.selectedCategories}
                onCategoryChange={sidebarProps.onCategoryChange}
                selectedPriceRanges={sidebarProps.selectedPriceRanges}
                onPriceRangeChange={sidebarProps.onPriceRangeChange}
                selectedRatings={sidebarProps.selectedRatings}
                onRatingChange={sidebarProps.onRatingChange}
                selectedCustomizations={sidebarProps.selectedCustomizations}
                onCustomizationChange={sidebarProps.onCustomizationChange}
                availableCategories={sidebarProps.availableCategories}
              />
            </div>
          </div>
        )}
        <div
          className={cn(
            showSidebar ? 'lg:col-span-9 col-span-12' : 'col-span-12'
          )}
        >
          {showSidebar && sidebarProps && (
            <div className='sticky top-[3.5rem] z-30 bg-background/95 backdrop-blur-xl lg:pb-2 lg:pt-0 md:pb-2 md:pt-0 pb-3 pt-3 lg:hidden'>
              <SidebarProductMobile
                searchTerm={sidebarProps.searchTerm}
                onSearchChange={sidebarProps.onSearchChange}
                selectedCategories={sidebarProps.selectedCategories}
                onCategoryChange={sidebarProps.onCategoryChange}
                selectedPriceRanges={sidebarProps.selectedPriceRanges}
                onPriceRangeChange={sidebarProps.onPriceRangeChange}
                selectedRatings={sidebarProps.selectedRatings}
                onRatingChange={sidebarProps.onRatingChange}
                selectedCustomizations={sidebarProps.selectedCustomizations}
                onCustomizationChange={sidebarProps.onCustomizationChange}
                sortBy={sortBy}
                onSortChange={onSortChange}
                availableCategories={sidebarProps.availableCategories}
              />
            </div>
          )}
          <div className='hidden md:flex mb-6 md:space-y-0 space-y-4'>
            <div className='flex-1 hidden md:flex items-center gap-3'>
              {menus?.map(({ active, icon, onClick }, index) => (
                <Button
                  key={`view-button-${index}`}
                  size='icon'
                  variant='outline'
                  className={cn(
                    'border border-gray-400 text-gray-400 hover:bg-transparent hover:text-gray-400 h-11 w-11',
                    {
                      'text-foreground border-foreground hover:text-foreground hover:border-foreground':
                        active,
                    }
                  )}
                  onClick={onClick}
                >
                  <Icon icon={icon} className='size-6' />
                </Button>
              ))}
            </div>

            {showSort && (
              <div className='hidden md:flex gap-2 items-center'>
                <Label
                  htmlFor='sort-select'
                  className='text-sm font-normal whitespace-nowrap'
                >
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger
                    id='sort-select'
                    className='bg-transparent w-[180px] border-gray-200 h-10'
                  >
                    <SelectValue placeholder='Select sorting' />
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
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export { ProductWrapperSection }
