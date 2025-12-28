'use client'

import { Quote } from 'lucide-react'
import React from 'react'
import MeshGradient from './mesh-gradient'

export const AuthIllustration = () => {
  return (
    <div className='relative flex min-h-[600px] flex-col items-start justify-end overflow-hidden rounded-2xl bg-black p-4 md:p-8'>
      <div className='relative z-40 mb-2 flex items-center gap-2'>
        <p className='rounded-md bg-black/50 px-2 py-1 text-xs text-white'>
          E-Commerce
        </p>
        <p className='rounded-md bg-black/50 px-2 py-1 text-xs text-white'>
          Sustainable Shopping
        </p>
      </div>
      <div className='relative z-40 max-w-sm rounded-xl bg-black/50 p-4 backdrop-blur-sm'>
        <Quote className='mb-3 size-8 text-emerald-400' />
        <h2 className='text-white'>
          Shop smarter with quality refurbished products. Save money while making
          sustainable choices for a better future.
        </h2>
        <p className='mt-4 flex items-center gap-2 text-sm text-emerald-400'>
          <svg className='size-4' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/>
          </svg>
          <span className='font-semibold'>Verified by ReShop</span>
        </p>
      </div>

      <div className='absolute -top-48 -right-40 z-20 grid rotate-45 transform grid-cols-4 gap-32 mask-r-from-50%'>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
      </div>

      <div className='absolute -top-0 -right-10 z-20 grid rotate-45 transform grid-cols-4 gap-32 mask-r-from-50% opacity-50'>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
        <div className='size-40 shrink-0 rounded-3xl bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]'></div>
      </div>
      <MeshGradient className='absolute inset-0 z-30 h-full w-200 mask-t-from-50% blur-3xl' />
    </div>
  )
}

export default AuthIllustration
