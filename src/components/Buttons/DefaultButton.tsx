import Link from 'next/link'
import type { MouseEventHandler, ReactNode } from 'react'

import Arrow from '@/components/Icons/Arrow'
import { cn } from '@/utilities/ui'
import { Button } from '../ui/button'
import type { CMSLinkType } from '@/components/Link'
import type { Page, Post } from '@/payload-types'
import { ArrowDown, ChevronLeft } from 'lucide-react'

type ButtonVariant =
  | 'white'
  | 'outline'
  | 'red'
type ArrowPosition = 'left' | 'right' | 'down' | 'back' | 'none'

interface DefaultButtonProps {
  arrow?: ArrowPosition
  children?: ReactNode
  className?: string
  disabled?: boolean
  link?: CMSLinkType
  href?: string
  id?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
}

const baseClasses =
  'rounded-full group/btn relative inline-flex items-center justify-center overflow-hidden px-6 lg:px-8 py-2 lg:py-4  font-black text-[14px] uppercase  transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[##000] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60'

const beforeBaseClasses =
  "before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:transition-all before:duration-500 before:ease-out before:content-[''] before:z-0 hover:before:h-full"

const beforeClassesByVariant: Record<ButtonVariant, string> = {
  white: 'before:rounded-full before:bg-black',
  outline: 'before:rounded-full before:bg-white',
  red: 'before:rounded-[8px] before:bg-black',
}

const variantClasses: Record<ButtonVariant, string> = {
  white: 'bg-white text-black shadow-[0_12px_24px_rgba(0,0,0,0.25)] hover:text-white',
  outline:
    ' border-[5px] border-[#D9D9D9] bg-transparent text-white shadow-[0_12px_24px_rgba(0,0,0,0.25)] hover:text-black',
  red: 'rounded-[8px] bg-[#FF0000] text-white shadow-[0_12px_24px_rgba(0,0,0,0.25)] hover:text-white',
}

const arrowClassesByVariant: Record<ButtonVariant, string> = {
  white: 'text-white group-hover/btn:text-black',
  outline: 'text-white group-hover/btn:text-black',
  red: 'text-white group-hover/btn:text-white',
}

const DefaultButton = ({
  arrow = 'right',
  children,
  className,
  disabled = false,
  link,
  href,
  id = '',
  onClick,
  type = 'button',
  variant = 'outline',
}: DefaultButtonProps) => {
  const buttonClasses = cn(
    baseClasses,
    beforeBaseClasses,
    variantClasses[variant],
    beforeClassesByVariant[variant],
    href && disabled ? 'pointer-events-none opacity-60' : null,
    className,
  )
  const arrowClasses = cn(
    'relative z-10 transition-colors duration-300',
    arrowClassesByVariant[variant],
  )

  const resolvedHref = (() => {
    if (link) {
      const isRef = link.type === 'reference'
      const value = link.reference?.value as Page | Post | string | number | undefined
      if (isRef && value && typeof value === 'object' && 'slug' in (value as Page | Post)) {
        const base = link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''
        return `${base}/${(value as Page | Post).slug}`
      }
      return link.url ?? undefined
    }
    return href
  })()

  const resolvedLabel = children ?? link?.label ?? undefined
  const newTabProps = link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const renderContent = (
    <span className="relative z-10 flex items-center gap-6">
      {arrow === 'left' ? <Arrow direction="left" className={arrowClasses} /> : null}
      {arrow === 'back' ? <ChevronLeft className="!w-8 !h-8 text-black" /> : null}
      <span className="relative z-10 transition-colors duration-300">{resolvedLabel}</span>
      {arrow === 'right' ? <Arrow direction="right" className={arrowClasses} /> : null}
      {arrow === 'down' ? <ArrowDown className="w-12 h-12" /> : null}
    </span>
  )

  if (resolvedHref) {
    return (
      <Link
        id={id}
        href={resolvedHref}
        className={buttonClasses}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={onClick}
        {...newTabProps}
      >
        {renderContent}
      </Link>
    )
  }

  return (
    <Button id={id} className={buttonClasses} onClick={onClick} type={type} disabled={disabled}>
      {renderContent}
    </Button>
  )
}

export default DefaultButton
