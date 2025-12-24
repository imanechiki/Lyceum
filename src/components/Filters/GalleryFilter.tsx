'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

export type FilterValue = string

interface GalleryFilterProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
  days?: { value: FilterValue; label: string }[]
  className?: string
}

export const GalleryFilter: React.FC<GalleryFilterProps> = ({
  value,
  onChange,
  days = [{ value: 'all', label: 'All' }],
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-6 text-white overflow-x-auto whitespace-nowrap scrollbar-hide min-w-0 max-w-full',
        className,
      )}
    >
      {days.map((d) => {
        const active = value === d.value
        return (
          <button
            key={d.value}
            onClick={() => onChange(d.value)}
            className={cn(
              'relative overflow-hidden flex-shrink-0 text-[22px] uppercase tracking-wide transition-colors p-2',
              'before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#FF2A32] before:transition-all before:duration-500 before:z-0',
              'after:absolute after:bottom-2 after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:rounded-full after:bg-[#FF2A32] after:opacity-0 after:transition-opacity after:duration-300',
              active
                ? 'text-white before:h-full after:opacity-100'
                : 'text-white/90 hover:text-white hover:before:h-full',
            )}
            aria-pressed={active}
          >
            <span className="relative z-10">{d.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default GalleryFilter
