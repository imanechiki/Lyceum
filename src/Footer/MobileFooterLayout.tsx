import React from 'react'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export function MobileFooterLayout({
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
    <div className="flex flex-col gap-4 md:hidden">
      <div className="flex flex-col w-full gap-3 border-b border-black/50 pb-6 md:mb-6 px-4">
        <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal text-left">
          Subscribe
        </h3>
        <div className="text-  font-semibold  text-[13px] leading-[20px] tracking-normal font-plusJakarta">
          {subscribeLabel}
        </div>
        {renderSubscribeForm('h-10', subscribeError, subscribeSuccess)}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 overflow-hidden">
          <Link href={logoLinkHref}>
            <Media
              resource={logo}
              className="h-16 w-auto object-contain max-w-full"
              imgClassName="h-16 w-auto object-contain max-w-full"
            />
          </Link>
        </div>
        {renderSocialLinks()}
      </div>
      {safeNavItems.length > 0 && (
        <>
          <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal text-center border-b border-black pb-4 mx-4">
            {primaryNavHeading}
          </h3>
          <ul className="flex flex-col items-center gap-1 mb-4 px-4">
            {safeNavItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  className="hover:text-[#FF0000] transition-colors text-[15px] leading-[24px] tracking-normal text-center font-plusJakarta font-semibold"
                  {...link}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {safeSecondNavItems.length > 0 && (
        <>
          <h3 className="font-plusJakarta font-semibold text-[20px] leading-[24px] tracking-normal text-center border-b border-black pb-4 mx-4 ">
            {secondaryNavHeading}
          </h3>
          <ul className="flex flex-col items-center gap-1 mb-4 px-4">
            {safeSecondNavItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  className="hover:text-[#FF0000] transition-colors text-[15px] leading-[24px] tracking-normal text-center font-plusJakarta font-semibold"
                  {...link}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
