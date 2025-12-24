'use client'
import React from 'react'
import type { FAQBlock as FAQProps } from '@/payload-types'
import DefaultButton from '@/components/Buttons/DefaultButton'
import RichText from '@/components/RichText'
import type { CMSLinkType } from '@/components/Link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FAQ: React.FC<FAQProps> = ({ title, items }) => {
  const defaultOpenItems = items?.length ? ['item-0'] : undefined

  return (
    <div className="container my-8 md:my-16 flex flex-col gap-8 lg:gap-10 items-center">
      <h2 className='text-center'>
        {title}
      </h2>

      <Accordion type="multiple" defaultValue={defaultOpenItems} className="space-y-4 w-full lg:w-5/6">
        {items?.map((item, index: number) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-none">
            <AccordionTrigger className="transition-opacity hover:opacity-80 hover:no-underline text-left">
              <h3 className='flex-1'>{item.question}</h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 items-start px-8 lg:px-10 py-6">
              <RichText data={item.answer} enableGutter={false} enableProse={false} />

              {item.enableLink && item.link && (
                <DefaultButton
                  link={item.link as CMSLinkType}
                  variant="outline"
                  arrow="right"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
