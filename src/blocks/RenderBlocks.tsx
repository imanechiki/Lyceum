import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BackgroundRichTextBlock } from '@/blocks/BackgroundRichText/Component'

const CTA = dynamic(() => import('@/blocks/CTA/Component'))
const Paragraph = dynamic(() => import('@/blocks/Paragraph/Component'))
const FAQ = dynamic(() => import('@/blocks/FAQ/Component'))
const RichTextCenter = dynamic(() => import('@/blocks/RichTextCenter/Component'))
const FormBlock = dynamic(() => import('@/blocks/Form/Component').then(mod => ({ default: mod.FormBlock })))


const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
 
  ctaBlock: CTA,
  paragraph: Paragraph,
  faq: FAQ,
  richTextCenter: RichTextCenter,
  backgroundRichText: BackgroundRichTextBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
