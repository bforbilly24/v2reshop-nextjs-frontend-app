'use client'

import { JSX } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/shadcn/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/shadcn/pagination'

type ProductPaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

const ProductPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: ProductPaginationProps) => {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    setCurrentPage(page)
  }

  const renderPageLinks = () => {
    const pages: JSX.Element[] = []

    if (totalPages <= 3) {
      // Show all pages if 3 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href=''
              isActive={currentPage === i}
              onClick={(e) => handlePageChange(e, i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Show first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href=''
            isActive={currentPage === 1}
            onClick={(e) => handlePageChange(e, 1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 2) {
        // Show ellipsis if current page is beyond 2
        pages.push(
          <PaginationItem key='start-ellipsis'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show current page and surrounding pages
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href=''
              isActive={currentPage === i}
              onClick={(e) => handlePageChange(e, i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 1) {
        // Show ellipsis if current page is before the second-to-last page
        pages.push(
          <PaginationItem key='end-ellipsis'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href=''
            isActive={currentPage === totalPages}
            onClick={(e) => handlePageChange(e, totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <div className='mt-6'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant='ghost'
              size='icon'
              onClick={(e) => handlePageChange(e, 1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className='w-4 h-4' />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href=''
              onClick={(e) => handlePageChange(e, Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
          {renderPageLinks()}
          <PaginationItem>
            <PaginationNext
              href=''
              onClick={(e) =>
                handlePageChange(e, Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
          <PaginationItem>
            <Button
              variant='ghost'
              size='icon'
              onClick={(e) => handlePageChange(e, totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className='w-4 h-4' />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export { ProductPagination }
