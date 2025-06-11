'use client'

import { AppProgressProvider } from '@bprogress/next'
import { ReactNode } from 'react'

interface BProgressProviderProps {
  children: ReactNode
}

export function BProgressProvider({ children }: BProgressProviderProps) {
  return (
    <AppProgressProvider 
      height="3px"
      color="#10B981"
      options={{ 
        showSpinner: false,
        trickle: true,
        trickleSpeed: 200,
        minimum: 0.08,
        easing: 'ease',
        speed: 200,
        template: '<div class="bar"><div class="peg"></div></div>'
      }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  )
}