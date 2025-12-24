'use client'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Footer as FooterType } from '@/payload-types'
import { MobileFooterLayout } from './MobileFooterLayout'
import { FooterBottom } from './FooterBottom'
import { SubscribeForm } from './SubscribeForm'
import { MediumFooterLayout } from './MediumFooterLayout'
import { DesktopFooterLayout } from './DesktopFooterLayout'

type FooterNavItem = NonNullable<FooterType['navItems']>[number]

const resolveHref = (link?: FooterNavItem['link']) => {
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

export function FooterClient({ footerData }: { footerData: Partial<FooterType> | null }) {
  const {
    navItems = [],
    secondNavItems = [],
    primaryNavHeading = 'lyceum',
    secondaryNavHeading = 'duPont REGISTRY Group',
    subscribeText = '',
    subscribeLabel = '',
    subscribeButtonLabel = '',
    privacyLinks = [],
    termsLinks = [],
    socialLinks: rawSocialLinks = [],
    logo,
    link,
  } = footerData || {}

  const logoLinkHref = resolveHref(link) || '/'

  const safeNavItems = Array.isArray(navItems) ? navItems : []
  const safeSecondNavItems = Array.isArray(secondNavItems) ? secondNavItems : []
  const safePrivacyLinks = Array.isArray(privacyLinks) ? privacyLinks : []
  const safeTermsLinks = Array.isArray(termsLinks) ? termsLinks : []

  type SocialLink = NonNullable<FooterType['socialLinks']>[number]
  const socialLinks: SocialLink[] = Array.isArray(rawSocialLinks) ? rawSocialLinks : []

  const [subscribeError, setSubscribeError] = React.useState<string | undefined>(undefined)
  const [subscribeSuccess, setSubscribeSuccess] = React.useState<string | undefined>(undefined)
  const [subscribeValue, setSubscribeValue] = React.useState('')
  const [subscribeSubmitting, setSubscribeSubmitting] = React.useState(false)

  const handleSubscribeChange = (v: string) => {
    setSubscribeValue(v)
    if (subscribeError) setSubscribeError(undefined)
    if (subscribeSuccess) setSubscribeSuccess(undefined)
  }
  const handleSubscribeSubmit = async () => {
    if (subscribeSubmitting) return
    const email = subscribeValue.trim()
    if (!email) {
      setSubscribeError('Please enter your email address.')
      setSubscribeSuccess(undefined)
      return
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      setSubscribeError('Enter a valid email address.')
      setSubscribeSuccess(undefined)
      return
    }

    try {
      setSubscribeSubmitting(true)
      setSubscribeError(undefined)
      setSubscribeSuccess(undefined)
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        const errorMessage = data.error || 'Failed to subscribe. Please try again.'
        console.error('Newsletter subscription failed:', errorMessage)
        setSubscribeError(errorMessage)
        setSubscribeSuccess(undefined)
        return
      }
      
      const successMessage = data.message || 'Thanks! You are subscribed.'
      // console.log('Newsletter subscription successful:', { email, profileId: data.profileId })
      setSubscribeSuccess(successMessage)
      setSubscribeValue('') 
    } catch (e) {
      console.error('Newsletter subscribe failed', e)
      setSubscribeError('Failed to subscribe. Please try again.')
      setSubscribeSuccess(undefined)
    } finally {
      setSubscribeSubmitting(false)
    }
  }

  const renderSocialLinks = () => (
    <div className="flex items-center justify-center lg:justify-start gap-7 w-full">
      {socialLinks.map((link, index) => {
        if (!link) return null

        const { platform, url, icon } = link
        if (!url) return null

        const iconResource = typeof icon === 'object' && icon !== null ? icon : undefined
        const ariaLabel = iconResource?.alt || platform || 'social media link'

        return (
          <Link
            href={url}
            key={index}
            className="inline-flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
          >
            {iconResource && (
              <Media
                resource={iconResource}
                alt={iconResource.alt || `${platform ?? 'social'} icon`}
                imgClassName="h-full w-full object-cover"
                htmlElement={null}
              />
            )}
          </Link>
        )
      })}
    </div>
  )

  const renderSubscribeForm = (buttonClass: string, error?: string, success?: string) => (
    <SubscribeForm
      subscribeText={subscribeText || ''}
      subscribeValue={subscribeValue}
      onChange={handleSubscribeChange}
      onSubmit={handleSubscribeSubmit}
      subscribeButtonLabel={subscribeButtonLabel || ''}
      error={error}
      success={success}
      buttonClass={buttonClass}
      submitting={subscribeSubmitting}
    />
  )

  return (
    <footer className="mt-auto bg-[#ECECEC]">
      <div className="px-0 md:px-4 py-8 lg:py-12">
        <MobileFooterLayout
          logo={logo}
          logoLinkHref={logoLinkHref}
          renderSocialLinks={renderSocialLinks}
          primaryNavHeading={primaryNavHeading || ''}
          safeNavItems={safeNavItems}
          secondaryNavHeading={secondaryNavHeading || ''}
          safeSecondNavItems={safeSecondNavItems}
          subscribeLabel={subscribeLabel || ''}
          renderSubscribeForm={renderSubscribeForm}
          subscribeError={subscribeError}
          subscribeSuccess={subscribeSuccess}
        />
        <MediumFooterLayout
          logo={logo}
          logoLinkHref={logoLinkHref}
          renderSocialLinks={renderSocialLinks}
          primaryNavHeading={primaryNavHeading || ''}
          safeNavItems={safeNavItems}
          secondaryNavHeading={secondaryNavHeading || ''}
          safeSecondNavItems={safeSecondNavItems}
          subscribeLabel={subscribeLabel || ''}
          renderSubscribeForm={renderSubscribeForm}
          subscribeError={subscribeError}
          subscribeSuccess={subscribeSuccess}
        />
        <DesktopFooterLayout
          logo={logo}
          logoLinkHref={logoLinkHref}
          renderSocialLinks={renderSocialLinks}
          primaryNavHeading={primaryNavHeading || ''}
          safeNavItems={safeNavItems}
          secondaryNavHeading={secondaryNavHeading || ''}
          safeSecondNavItems={safeSecondNavItems}
          subscribeLabel={subscribeLabel || ''}
          renderSubscribeForm={renderSubscribeForm}
          subscribeError={subscribeError}
          subscribeSuccess={subscribeSuccess}
        />
      </div>
      <FooterBottom safePrivacyLinks={safePrivacyLinks} safeTermsLinks={safeTermsLinks} />
    </footer>
  )
}
