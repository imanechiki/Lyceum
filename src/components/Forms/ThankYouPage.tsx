'use client'

import DefaultButton from '../Buttons/DefaultButton'
import React from 'react'
import Image from 'next/image'

export default function ThankYouPage() {
  const thankYouContent = {
    title: `THANK YOU!`,
    description:
      "We appreciate you taking the time to reach out to us. Your message has been received and we'll respond as soon as possible.",
    buttonText: 'BACK TO HOME PAGE',
    buttonUrl: '/',
  }

  return (
    <section
      className="relative w-full mt-[-120px] md:mt-[-100px] min-h-screen aspect-[2/3] md:aspect-video  overflow-hidden"
      data-theme="dark"
    >
      <div className="container relative z-20 text-white  flex flex-col items-center justify-center gap-4 h-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            <h1>{thankYouContent.title}</h1>
            <div className="text-base md:text-lg lg:text-xl xl:text-2xl ultrawide:text-4xl leading-relaxed pt-4 font-medium text-center max-w-xl font-montserrat">
              <p className="">{thankYouContent.description}</p>
            </div>

            <div className="pt-6 flex justify-center">
              <DefaultButton variant="outline" href="/" arrow="none" className='!py-6'>
                Return to Home
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/thank.webp"
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
