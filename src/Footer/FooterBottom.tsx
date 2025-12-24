import React from 'react'
import { CMSLink } from '@/components/Link'

export function FooterBottom({
  safePrivacyLinks,
  safeTermsLinks,
}: {
  safePrivacyLinks: any[]
  safeTermsLinks: any[]
}) {
  const currentYear = new Date().getFullYear()
  return (
    <div className="flex flex-col gap-6 mx-4 lg:mx-4 py-8">
      <div className="border-t border-black order-0 hidden md:block"></div>

      <div className="flex flex-col items-center md:flex-row sm:items-start justify-between text-xs gap-6 md:gap-4 order-1">
        <div className="flex sm:hidden md:flex flex-col sm:flex-row justify-center items-center gap-2 order-1 sm:order-2">
          <div className="flex gap-4 justify-center text-black text-sm leading-4 font-semibold font-plusJakarta sm:ml-auto">
            {safePrivacyLinks.map(({ link }, i) => (
              <CMSLink
                key={i}
                className="underline hover:text-[#FF0000] transition-colors font-plusJakarta font-semibold"
                {...link}
              />
            ))}
          </div>
          <div className="flex gap-4 justify-center  text-sm leading-4 font-semibold font-plusJakarta mt-2 sm:mt-0">
            {safeTermsLinks.map(({ link }, i) => (
              <CMSLink
                key={i}
                className="underline hover:text-[#FF0000] transition-colors font-plusJakarta font-semibold"
                {...link}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-black w-full order-1 md:order-3 block md:hidden"></div>

        <div className="flex flex-row items-center sm:items-start w-full md:w-fit md:justify-between justify-center order-4 sm:order-1 mt-2 sm:mt-0 mb-2 md:mb-0">
          <div className=" text-sm leading-4 font-semibold font-plusJakarta text-center md:text-left">
            © {currentYear}{' '}
            <span className="text-[15px] uppercase font-plusJakarta font-semibold">
              {' '}
              DUPONT REGISTRY GROUP
            </span>
            . All Rights Reserved.
          </div>

          <div className="hidden sm:flex md:hidden flex-col sm:flex-row justify-center items-center gap-2 order-1 sm:order-2">
            <div className="flex gap-4 justify-center  text-[16px] leading-4 font-semibold font-plusJakarta sm:ml-auto">
              {safePrivacyLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className="underline hover:text-[#FF0000] transition-colors font-plusJakarta font-semibold"
                  {...link}
                />
              ))}
            </div>
            <div className="flex gap-4 justify-center  text-[16px] leading-4 font-semibold font-plusJakarta mt-2 sm:mt-0">
              {safeTermsLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className="underline hover:text-[#FF0000] transition-colors font-plusJakarta font-semibold"
                  {...link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
