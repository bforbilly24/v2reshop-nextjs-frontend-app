'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/shadcn/breadcrumb'
import { Icon } from '@/components/ui/icon'
import React from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({
  items,
  className,
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <Icon icon="lucide:slash" className="size-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}