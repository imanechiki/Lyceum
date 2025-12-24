import React from 'react'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export function DesktopFooterLayout({
  logo,
  logoLinkHref,
  renderSocialLinks,
  primaryNavHeading,
  safeNavItems,
  secondaryNavHeading,
  safeSecondNavItems,
  subscribeLabel,
  renderSubscribeForm,
  subscribeError,
  subscribeSuccess,
}: {
  logo: any
  logoLinkHref: string
  renderSocialLinks: () => React.ReactNode
  primaryNavHeading: string
  safeNavItems: any[]
  secondaryNavHeading: string
  safeSecondNavItems: any[]
  subscribeLabel: string
  renderSubscribeForm: (buttonClass: string, error?: string, success?: string) => React.ReactNode
  subscribeError?: string
  subscribeSuccess?: string
}) {
  return (
    <div className="hidden lg:flex gap-12">
      <div className="flex flex-col gap-4 flex-1">
        <Link href={logoLinkHref}>
          <Media
            resource={logo}
            className="h-full w-[80%] object-cover"
            imgClassName="h-full w-full object-cover"
          />
        </Link>

        {renderSocialLinks()}
      </div>
      {safeNavItems.length > 0 && (
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal text-left border-b border-black pb-4">
            {primaryNavHeading}
          </h3>
          <ul className="flex flex-col gap-4">
            {safeNavItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  className="hover:text-[#FF0000] transition-colors text-[15px] leading-[24px] tracking-normal font-plusJakarta font-semibold"
                  {...link}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {safeSecondNavItems.length > 0 && (
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal text-left border-b border-black pb-4">
            {secondaryNavHeading}
          </h3>
          <ul className="flex flex-col gap-4">
            {safeSecondNavItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  className="hover:text-[#FF0000] transition-colors text-[15px] leading-[24px] tracking-normal font-plusJakarta font-semibold"
                  {...link}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col w-full max-w-md mx-auto lg:mx-0 flex-1 gap-6">
        <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal border-b border-black pb-4">
          Subscribe
        </h3>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="text-black  font-semibold  text-[13px] leading-[20px] tracking-normal font-plusJakarta">
            {subscribeLabel}
          </div>
          {renderSubscribeForm('text-sm', subscribeError, subscribeSuccess)}
        </div>
      </div>
    </div>
  )
}
