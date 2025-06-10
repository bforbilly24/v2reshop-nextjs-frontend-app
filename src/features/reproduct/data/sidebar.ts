interface SidebarProductProps {
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
}

export { type SidebarProductProps }
