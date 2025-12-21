'use client'

import { useState, useEffect } from 'react'
import {
  COMMUNITIES,
  ReCommunityItem,
  ReSidebarCommunityProps,
} from '@/constant'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { ScrollArea } from '@/components/atoms/scroll-area'
import { Icon } from '@/components/atoms/icon'

const SidebarCommunity = ({
  searchTerm = '',
  onSearchChange,
  selectedId = 1,
  onSelectedIdChange,
  onCreateCommunity,
  communityItems = COMMUNITIES, 
}: ReSidebarCommunityProps) => {
  const [activeId, setActiveId] = useState<number>(selectedId)

  useEffect(() => {
    setActiveId(selectedId)
  }, [selectedId])

  const handleSearchChange = (value: string) => {
    if (typeof onSearchChange === 'function') {
      onSearchChange(value)
    }
  }

  const handleMenuItemClick = (id: number) => {
    setActiveId(id)
    if (typeof onSelectedIdChange === 'function') {
      onSelectedIdChange(id)
    }
  }

  const handleCreateCommunity = () => {
    if (typeof onCreateCommunity === 'function') {
      onCreateCommunity()
    }
  }

  const filteredCommunityItems = communityItems.filter(
    (item: ReCommunityItem) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className='sticky top-24 h-fit'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-2xl font-bold leading-7 text-foreground'>
            Community
          </h2>
        </div>
        <div className='relative'>
          <Icon
            icon='heroicons:magnifying-glass'
            className='absolute start-2 top-1/2 -translate-y-1/2 text-muted-foreground'
          />
          <Input
            type='text'
            placeholder='Find Community'
            className='ps-7 bg-gray-100 border-0 rounded-full'
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </CardHeader>

      <ScrollArea className='h-[calc(100vh-16rem)]'>
        <CardContent className='space-y-4'>
          {/* Community Menu Items */}
          <div className='space-y-2'>
            {filteredCommunityItems.map((item: ReCommunityItem) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                  ${
                    activeId === item.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-transparent hover:bg-muted text-foreground'
                  }
                `}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-full p-2
                      ${
                        activeId === item.id
                          ? 'bg-primary-foreground text-primary'
                          : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  <Label
                    className={`
                      text-sm font-semibold cursor-pointer
                      ${activeId === item.id ? 'text-primary-foreground' : 'text-foreground'}
                    `}
                  >
                    {item.name}
                  </Label>
                </div>
                {item.count && (
                  <span
                    className={`
                      text-xs font-semibold px-2 py-1 rounded-full
                      ${
                        activeId === item.id
                          ? 'bg-primary-foreground text-primary'
                          : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Create Community Button */}
          <div className='pt-4 border-t border-border'>
            <Button
              onClick={handleCreateCommunity}
              className='w-full h-10 gap-2 bg-emerald-50 hover:bg-emerald-500 active:bg-emerald-600 text-emerald-600 hover:text-white active:text-white border border-emerald-200 hover:border-emerald-500'
              variant='outline'
            >
              <Icon icon='heroicons:plus' className='size-4' />
              <span className='text-sm font-semibold'>
                Create A New Community
              </span>
            </Button>
          </div>

          {/* Additional Filters Section */}
          <div className='space-y-4 pt-4 border-t border-border'>
            <div className='space-y-2'>
              <div className='text-foreground font-semibold text-xs uppercase pb-2'>
                Quick Filters
              </div>
              <div className='flex flex-wrap gap-2'>
                {['Active', 'New', 'Popular', 'Following'].map((filter) => (
                  <Button
                    key={filter}
                    variant='outline'
                    size='sm'
                    className='h-7 px-3 text-xs bg-muted hover:bg-primary hover:text-primary-foreground'
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export { SidebarCommunity }
