'use client'
import React from 'react'
import { Media as MediaComponent } from '@/components/Media'
import { CustomButton } from '@/components/Buttons/CustomButton'
import type { MultiBannerBlock as MultiBannerBlockType, Media as MediaType } from '@/payload-types'

export const MultiBannerBlockComponent: React.FC<{ slides: MultiBannerBlockType['slides'] }> = ({
  slides,
}) => {
  const hasSlides = !!slides && slides.length > 0
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const slidesRef = React.useRef<(HTMLDivElement | null)[]>([])

  slidesRef.current = []
  const setSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (el) slidesRef.current[index] = el
  }

  React.useEffect(() => {
    if (!hasSlides) return
    let ctx: any
    const init = async () => {
      if (!sectionRef.current || !slidesRef.current.length) return
      const { initGSAP, prefersReducedMotion } = await import('@/utilities/gsapUtils')
      if (prefersReducedMotion()) return

      const { gsap, ScrollTrigger } = await initGSAP()
      ctx = gsap.context(() => {
        const slidesEls = slidesRef.current.filter(Boolean) as HTMLDivElement[]

        gsap.set(slidesEls, {
          yPercent: (i) => (i === 0 ? 0 : 100),
          zIndex: (i) => i + 1,
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (slidesEls.length - 1)}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        slidesEls.forEach((el, i) => {
          if (i === 0) return
          tl.to(el, { yPercent: 0, duration: 1, ease: 'power2.out' }, i - 1)
        })
      }, sectionRef)
    }
    init()
    return () => {
      if (ctx) ctx.revert()
    }
  }, [slides?.length, hasSlides])

  if (!hasSlides) return null

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {slides.map((slide, i) => {
        const bg = slide.background || null
        return (
          <div
            key={i}
            ref={(el) => setSlideRef(el, i)}
            data-slide-index={i}
            className="absolute inset-0 [will-change:transform]"
          >
            {typeof bg === 'object' && (bg as MediaType)?.id ? (
              <MediaComponent
                resource={bg as MediaType}
                fill
                imgClassName="object-cover"
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,22,22,0.95)_0%,rgba(22,22,22,0.05)_100%)]" />
            <div className="container absolute inset-0 flex items-center justify-start">
              <div className="relative z-10 flex flex-col align-start gap-4 w-full max-w-md md:max-w-lg lg:w-1/3">
                <div className="flex flex-col gap-6">
                  {typeof slide.title === 'string' && slide.title ? (
                    <h2 className="text-white">{slide.title}</h2>
                  ) : null}
                </div>
                <div className="self-start">
                  {slide.link?.button?.label ? (
                    <CustomButton
                      link={
                        slide.link.button as unknown as Parameters<typeof CustomButton>[0]['link']
                      }
                      variant="glass"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default MultiBannerBlockComponent
