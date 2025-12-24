import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type StructuredNavItem = {
  id: string
  label: string
  href: string
  newTab?: boolean | null
  isActive?: boolean
}

interface HeaderNavProps {
  bubbleItem?: StructuredNavItem
  leftItems: StructuredNavItem[]
  logoSlot?: React.ReactNode
  onNavigate?: () => void
  rightItems: StructuredNavItem[]
}

const baseLinkClasses =
  "relative z-[1] font-plusJakarta text-[16px] uppercase tracking-[0.19em] transition-colors duration-200 hover:text-white whitespace-nowrap after:pointer-events-none after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[5px]  after:bg-[#FF2A32] after:content-[''] after:-z-10 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:scale-x-100 hover:after:opacity-100"
const activeLinkClasses = 'text-white after:scale-x-100 after:opacity-100 font-semibold'
export const bubbleNavClasses =
  'relative overflow-hidden inline-flex items-center justify-center rounded-full bg-white px-14 py-2 font-plusJakarta text-[16px] uppercase leading-[33px] text-black shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:text-white ' +
  'before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-[#FF2A32] before:transition-all before:duration-500 hover:before:h-full before:z-0'

const HeaderNavComponent = ({
  bubbleItem,
  leftItems,
  logoSlot,
  onNavigate,
  rightItems,
}: HeaderNavProps) => {
  const renderLink = (item: StructuredNavItem) => (
    <Link
      key={item.id}
      href={item.href}
      className={cn(baseLinkClasses, item.isActive && activeLinkClasses)}
      onClick={onNavigate}
      {...(item.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
    >
      {item.label}
    </Link>
  )

  return (
    <div className="hidden w-full items-center gap-4 lg:grid lg:grid-cols-[auto_minmax(160px,1fr)_auto] lg:items-center">
      <div className="flex items-center justify-start gap-4 lg:gap-8">
        {leftItems.map(renderLink)}
      </div>
      <div className="flex items-center justify-center gap-4">{logoSlot}</div>
      <div className="flex items-center justify-end gap-6">
        {rightItems.map(renderLink)}
        {bubbleItem ? (
          <Link
            key={bubbleItem.id}
            href={bubbleItem.href}
            className={bubbleNavClasses}
            onClick={onNavigate}
            {...(bubbleItem.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
          >
            <span className="relative z-10">{bubbleItem.label}</span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export const HeaderNav = React.memo(HeaderNavComponent)
