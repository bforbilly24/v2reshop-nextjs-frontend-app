import { Category } from '@/features/reproduct/types'

export interface SidebarProductProps {
  searchTerm?: string
  onSearchChange: (value: string) => void
  selectedCategories?: string[]
  onCategoryChange: (categories: string[]) => void
  selectedPriceRanges?: string[]
  onPriceRangeChange: (ranges: string[]) => void
  selectedRatings?: number[]
  onRatingChange: (ratings: number[]) => void
  selectedCustomizations?: boolean[]
  onCustomizationChange: (customizations: boolean[]) => void
  sortBy?: string
  onSortChange?: (sortBy: string) => void
  availableCategories?: Category[]
}
