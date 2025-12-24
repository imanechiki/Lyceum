'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'
import DefaultButton from '@/components/Buttons/DefaultButton'
import type { ActivityCarouselBlock as ActivityCarouselBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface ActivityCarouselProps extends ActivityCarouselBlockType {
  disableInnerContainer?: boolean
}

const dotVisualClasses = 'h-[10px] w-[10px] rounded-full bg-white/70 transition-colors duration-300 block'

export const ActivityCarousel: React.FC<ActivityCarouselProps> = ({
  slides,
  enableAutoplay,
  autoplayDelay,
}) => {
  const validSlides = useMemo(
    () => slides?.filter((slide) => Boolean(slide?.image)) ?? [],
    [slides],
  )

  const slideCount = validSlides.length
  const shouldLoop = slideCount > 1
  const resolvedDelay = Math.max(autoplayDelay ?? 6000, 1000)

  const autoplayPlugin = useMemo(() => {
    if (!enableAutoplay || !shouldLoop) return undefined
    return Autoplay({
      delay: resolvedDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  }, [enableAutoplay, resolvedDelay, shouldLoop])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: shouldLoop,
      skipSnaps: false,
    },
    autoplayPlugin ? [autoplayPlugin] : [],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isPointerDown, setIsPointerDown] = useState(false)

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const updateScrollSnaps = () => setScrollSnaps(emblaApi.scrollSnapList())
    const handleSelect = () => onSelect(emblaApi)
    const handleReInit = (api: EmblaCarouselType) => {
      setScrollSnaps(api.scrollSnapList())
      onSelect(api)
    }

    updateScrollSnaps()
    handleSelect()

    emblaApi.on('select', handleSelect)
    emblaApi.on('reInit', handleReInit)

    return () => {
      emblaApi.off('select', handleSelect)
      emblaApi.off('reInit', handleReInit)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return

    const handlePointerDown = () => setIsPointerDown(true)
    const handlePointerUp = () => setIsPointerDown(false)

    const containerNode = emblaApi.containerNode()

    emblaApi.on('pointerDown', handlePointerDown)
    emblaApi.on('pointerUp', handlePointerUp)
    containerNode.addEventListener('pointerleave', handlePointerUp)

    return () => {
      emblaApi.off('pointerDown', handlePointerDown)
      emblaApi.off('pointerUp', handlePointerUp)
      containerNode.removeEventListener('pointerleave', handlePointerUp)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!slideCount) {
      setSelectedIndex(0)
      return
    }

    setSelectedIndex((currentIndex) => {
      if (currentIndex < slideCount) return currentIndex
      return 0
    })
  }, [slideCount])

  const handleScrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      autoplayPlugin?.reset()
    },
    [emblaApi, autoplayPlugin],
  )

  const handlePrev = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    autoplayPlugin?.reset()
  }, [emblaApi, autoplayPlugin])

  const handleNext = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    autoplayPlugin?.reset()
  }, [emblaApi, autoplayPlugin])

  if (!slideCount) return null

  const currentSlide = validSlides[selectedIndex] ?? validSlides[0]

  return (
    <section className="container my-8 md:my-16 flex flex-col lg:flex-row lg:items-center gap-8 ">
      <div className="flex-1 space-y-6 lg:space-y-24">
        <div className=" space-y-6 lg:space-y-10">
          <div className=" space-y-6 lg:space-y-4">
            {currentSlide?.dateLabel ? (
              <h6 className="uppercase">{currentSlide.dateLabel}</h6>
            ) : null}

            {currentSlide?.title ? <h2>{currentSlide.title}</h2> : null}
          </div>

          {currentSlide?.description ? (
            <p className="max-w-xl">{currentSlide.description}</p>
          ) : null}
        </div>

        {currentSlide?.link ? (
          <DefaultButton link={currentSlide.link} variant="outline" arrow="none" />
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-6 lg:w-[50%]">
        <div className="relative flex items-center gap-6">
          {shouldLoop ? (
            <div className="hidden h-full flex-col items-center gap-2 lg:flex">
              {scrollSnaps.map((_, index) => {
                const isActive = index === selectedIndex
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleScrollTo(index)}
                    className="min-w-11 min-h-11 p-4 flex items-center justify-center"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    <span
                      className={`${dotVisualClasses} ${isActive ? '!bg-[#FF1F1F] h-[24px]' : 'bg-white/70'}`}
                    />
                  </button>
                )
              })}
              <h6>
                {selectedIndex + 1}/{slideCount}
              </h6>
            </div>
          ) : null}

          <div className="relative w-full overflow-hidden" ref={emblaRef}>
            <div
              className={cn(
                'flex will-change-transform',
                !isPointerDown && 'transition-transform duration-500 ease-out',
              )}
            >
              {validSlides.map((slide, index) => (
                <div
                  className="min-w-0 flex-[0_0_100%]"
                  key={index}
                  aria-hidden={selectedIndex !== index ? 'true' : 'false'}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-[#101010]">
                    {slide.image && typeof slide.image === 'object' && 'id' in slide.image ? (
                      <Media
                        resource={slide.image}
                        fill
                        loading="lazy"
                        quality={75}
                        size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        imgClassName="object-cover"
                        pictureClassName="block h-full w-full"
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {shouldLoop ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/30 text-black border border-white transition-colors hover:bg-[#FF1919] hover:border-[#FF1919] hover:text-white"
                  aria-label="Previous slide"
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/30 text-black border border-white transition-colors hover:bg-[#FF1919] hover:border hover:text-white"
                  aria-label="Next slide"
                >
                  <ArrowRight />
                </button>
              </>
            ) : null}
          </div>
        </div>

        {shouldLoop ? (
          <div className="flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-1">
              {scrollSnaps.map((_, index) => {
                const isActive = index === selectedIndex
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleScrollTo(index)}
                    className="min-w-11 min-h-11 p-4 flex items-center justify-center"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    <span
                      className={`${dotVisualClasses} ${isActive ? '!bg-[#FF1F1F] w-[24px]' : 'bg-white/70'}`}
                    />
                  </button>
                )
              })}
            </div>
            <h6>
              {selectedIndex + 1}/{slideCount}
            </h6>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ActivityCarousel
