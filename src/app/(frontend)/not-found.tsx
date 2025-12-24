import React from 'react'
import DefaultButton from '@/components/Buttons/DefaultButton'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | lyceum',
  description:
    'The page you are looking for does not exist. Explore our exclusive collection of luxury vehicles.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Page Not Found | lyceum',
    description:
      'The page you are looking for does not exist. Explore our exclusive collection of luxury vehicles.',
    images: [
      {
        url: '/bg.png',
        width: 1200,
        height: 630,
        alt: 'Luxury Vehicle',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | lyceum',
    description:
      'The page you are looking for does not exist. Explore our exclusive collection of luxury vehicles.',
    images: ['/CTA.webp'],
  },
}

export default function NotFound() {
  return (
    <section
      className="relative w-full mt-[-120px] min-h-screen aspect-[2/3] md:aspect-video  overflow-hidden"
      data-theme="dark"
    >
      {/* Content */}
      <div className="container relative z-20 text-white  flex flex-col items-center justify-center gap-4 h-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {/* Error Code */}
            <h1>404</h1>

            {/* Error Message */}
            <h2>Destination Not Found</h2>

            {/* Description */}
            <div className="text-base md:text-lg lg:text-xl xl:text-2xl ultrawide:text-4xl leading-relaxed pt-4 font-medium text-center max-w-xl font-montserrat">
              <p>
                {
                  "The premium experience you're searching for is currently unavailable. Let us guide you back to our exclusive collection of luxury vehicles."
                }
              </p>
            </div>
            <DefaultButton variant="white" href="/" arrow='none'>
              Return to Home
            </DefaultButton>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/CTA.webp"
          alt="404 alt image"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="z-0 object-cover"
        />
      </div>
    </section>
  )
}
