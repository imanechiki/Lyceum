'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Media } from '@/components/Media'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { HeaderMobile } from './MobileNav'

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]

type HeaderClientProps = {
  headerData: Partial<HeaderType> | null
}

const normalizePath = (value: string) => {
  if (!value) return '/'

  const [pathWithoutHash = ''] = value.split('#')
  const [pathWithoutQuery = ''] = pathWithoutHash.split('?')
  if (!pathWithoutQuery) return '/'

  if (pathWithoutQuery === '/') return '/'

  return pathWithoutQuery.endsWith('/') ? pathWithoutQuery.slice(0, -1) : pathWithoutQuery
}

const isInternalHref = (href: string) => href.startsWith('/')

const isPathActive = (currentPath: string, itemHref: string) => {
  const current = normalizePath(currentPath)
  const target = normalizePath(itemHref)

  if (target === '/') {
    return current === '/'
  }

  return current === target || current.startsWith(`${target}/`)
}

const resolveHref = (link?: HeaderNavItem['link']) => {
  if (!link) return null

  if (link.type === 'reference') {
    const reference = link.reference

    if (
      reference &&
      typeof reference.value === 'object' &&
      reference.value !== null &&
      'slug' in reference.value &&
      reference.value.slug
    ) {
      const slug = reference.value.slug as string
      const base = reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''

      return `${base}/${slug}`
    }

    return null
  }

  return link.url ?? null
}

export function HeaderClient({ headerData }: HeaderClientProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const [isBlurActive, setIsBlurActive] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const lastScrollY = React.useRef(0)

  // Only mount scroll behavior on mobile
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    setIsMobile(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  React.useEffect(() => {
    // Skip scroll handler if not mobile
    if (!isMobile) return

    let ticking = false

    const initialScrollY = window.scrollY
    lastScrollY.current = initialScrollY
    setIsBlurActive(initialScrollY > 0)

    const handleScroll = () => {
      const current = window.scrollY
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const previous = lastScrollY.current
        const threshold = 80
        setIsBlurActive((prev) => {
          const shouldBlur = current > 0
          return prev !== shouldBlur ? shouldBlur : prev
        })

        if (Math.abs(current - previous) >= 4) {
          let nextVisible = true

          if (current <= threshold) {
            nextVisible = true
          } else if (current > previous) {
            nextVisible = false
          } else {
            nextVisible = true
          }

          setIsVisible((prev) => (prev !== nextVisible ? nextVisible : prev))
          lastScrollY.current = current
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  React.useEffect(() => {
    if (!isMobileNavOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileNavOpen])

  React.useEffect(() => {
    setIsMobileNavOpen(false)
  }, [pathname])


  const logoHref = React.useMemo(() => {
    if (!headerData?.link) return '/'
    return resolveHref(headerData.link as HeaderNavItem['link']) || '/'
  }, [headerData?.link])

  const logoSlot = React.useMemo(() => {
    if (!headerData?.logo) return null

    const logoContent = (
      <Media
        resource={headerData.logo}
        imgClassName="w-full"
        loading='eager'
        priority
      />
    )

    return (
      <Link href={logoHref} className="flex items-center">
        {logoContent}
      </Link>
    )
  }, [headerData?.logo, logoHref])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-transform duration-300 will-change-transform transform-gpu lg:hidden',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isBlurActive && 'backdrop-blur-lg',
      )}
    >
      <div className="flex w-full flex-col px-4 py-8 sm:px-6 lg:px-10 bg-white">
        <HeaderMobile
          logoSlot={logoSlot}
        />
      </div>
    </header>
  )
}
