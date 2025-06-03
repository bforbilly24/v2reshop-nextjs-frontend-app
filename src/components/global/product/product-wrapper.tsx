'use client'

import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/shadcn/button'
import { Label } from '@/components/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'
import { Icon } from '@/components/ui/icon'
import { selectCategories, selectOptions } from './data/product'

type EcommerceNav = {
  label: string
  icon: string
  active: boolean
  onClick?: () => void
}

const ProductWrapper = ({
  children,
  getEcommerceNav,
}: {
  children: React.ReactNode
  getEcommerceNav?: () => EcommerceNav[]
}) => {
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

  return (
    <div className='w-full'>
      <div className='grid grid-cols-12 gap-5 w-full'>
        <div className='lg:col-span-12 col-span-12'>
          <div className='md:flex mb-6 md:space-y-0 space-y-4'>
            <div className='flex-1 flex items-center gap-3'>
              {menus?.map(({ active, icon, onClick }, index) => (
                <Button
                  key={`view-button-${index}`}
                  size='icon'
                  variant='outline'
                  className={cn(
                    'border border-default-400 text-default-400 hover:bg-transparent hover:text-default-400 h-11 w-11',
                    {
                      'text-default border-default hover:text-default hover:border-default':
                        active,
                    }
                  )}
                  onClick={onClick}
                >
                  <Icon icon={icon} className='w-6 h-6' />
                </Button>
              ))}
            </div>
            <div className='flex-none sm:flex items-center gap-4 sm:space-y-0 space-y-2'>
              <div className='flex gap-2 items-center'>
                <Label htmlFor='select' className='text-sm font-normal'>
                  Show:
                </Label>
                <Select defaultValue={selectOptions[0].value}>
                  <SelectTrigger className='bg-transparent w-[110px] border-default-200 h-10'>
                    <SelectValue placeholder='Select Option' />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions.map((selectOption, i) => (
                      <SelectItem key={i} value={selectOption.value}>
                        {selectOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex gap-2 items-center'>
                <Label
                  htmlFor='select'
                  className='text-sm font-normal whitespace-nowrap'
                >
                  Sort by:
                </Label>
                <Select>
                  <SelectTrigger className='bg-transparent w-[110px] border-default-200 h-10'>
                    <SelectValue placeholder='Filters' />
                  </SelectTrigger>
                  <SelectContent>
                    {selectCategories.map((selectCategory, i) => (
                      <SelectItem key={i} value={selectCategory.value}>
                        {selectCategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export { ProductWrapper }
