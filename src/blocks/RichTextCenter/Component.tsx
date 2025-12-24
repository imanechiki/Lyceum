'use client'
import React from 'react'
import type { RichTextCenter as RichTextCenterProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const RichTextCenter: React.FC<RichTextCenterProps> = ({ richText }) => {
  return (
    <section className="container my-8 lg:my-16">
      {richText && (
        <RichText
          data={richText}
          enableGutter={false}
          className="flex flex-col items-center gap-y-4 lg:gap-y-8 text-center"
        />
      )}
    </section>
  )
}

export default RichTextCenter
