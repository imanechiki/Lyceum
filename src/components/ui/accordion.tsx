'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between gap-4 px-6 lg:px-10 py-6 font-medium transition-all hover:underline [&[data-state=open]]:bg-[#ff0000] [&[data-state=open]>span]:border-white [&[data-state=open]>h3]:text-white [&[data-state=open]>span>img:first-child]:hidden [&[data-state=open]>span>img:last-child]:block [&[data-state=closed]>span>img:first-child]:block [&[data-state=closed]>span>img:last-child]:hidden',
        className,
      )}
      {...props}
    >
      {children}
      <span>
        <Image
          src="/plus.svg fill.svg"
          alt="Plus"
          width={33}
          height={33}
          // className="h-8 w-8"
        />
        <Image
          src="/Minus.svg"
          alt="Minus"
          width={33}
          height={33}
          className=" hidden"
        />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
