import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { BackgroundRichTextBlock as BackgroundRichTextBlockProps } from '@/payload-types'

type Props = {
  className?: string
  disableInnerContainer?: boolean
} & BackgroundRichTextBlockProps

export const BackgroundRichTextBlock: React.FC<Props> = ({
  backgroundImage,
  title,
  richText,
}) => {
  return (
    <section className="relative aspect-[1/3] lg:aspect-[5/6] xl:aspect-video">
      {backgroundImage && typeof backgroundImage === 'object' && 'id' in backgroundImage && (
        <div className="absolute inset-0">
          <Media
            fill
            size="(max-width: 1024px) 100vw, 1920px"
            resource={backgroundImage}
            imgClassName="object-cover"
          />
        </div>
      )}
      <div className="z-10 relative flex flex-col items-start justify-center gap-8 h-full w-full lg:w-2/3 xl:w-1/2   px-8 lg:px-[4rem] py-8 lg:py-[7rem]">
        <h2 className="text-white w-full">
          {title}
        </h2>
        {richText && (
          <div className="bg-[#ff0000] text-white p-6 lg:p-12 background-rich-text-content w-full max-w-full">
            <RichText data={richText} enableGutter={false} className="w-full"/>
          </div>
        )}
      </div>
    </section>
  )
}

export default BackgroundRichTextBlock

