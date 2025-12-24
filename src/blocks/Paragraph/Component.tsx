'use client'
import React from 'react'

import DefaultButton from '@/components/Buttons/DefaultButton'
import type { Paragraph as ParagraphProps } from '@/payload-types'

export const Paragraph: React.FC<ParagraphProps> = ({ paragraph, link }) => {
  return (
    <section className="container my-8 lg:my-16 flex flex-col items-center gap-4 lg:gap-y-12 text-center">
      <p className="w-full lg:w-1/2  lg:!text-[22px] lg:leading-[30px] lg:font-medium ">
        {paragraph}
      </p>
      {link && <DefaultButton link={link} variant="outline" arrow="none" />}
    </section>
  )
}

export default Paragraph
