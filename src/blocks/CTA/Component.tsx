'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { CTABlock as CTAProps } from '@/payload-types'
import DefaultButton from '@/components/Buttons/DefaultButton'
import RichText from '@/components/RichText'

export const CTA: React.FC<CTAProps & { mobileBackgroundImage?: CTAProps['backgroundImage'] }> = ({
  title,
  backgroundImage,
  mobileBackgroundImage,
  thumbnail,
  content,
  link,
}) => {
  return (
    <section className="relative w-full aspect-[3/4] lg:aspect-[2/1] overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {mobileBackgroundImage && typeof mobileBackgroundImage === 'object' && 'id' in mobileBackgroundImage ? (
          <div className="lg:hidden">
            <Media
              fill
              size="100vw"
              loading="lazy"
              quality={75}
              resource={mobileBackgroundImage}
              imgClassName="object-cover"
              poster={thumbnail || undefined}
            />
          </div>
        ) : null}
        {backgroundImage && typeof backgroundImage === 'object' && 'id' in backgroundImage ? (
          <div className={mobileBackgroundImage && typeof mobileBackgroundImage === 'object' && 'id' in mobileBackgroundImage ? 'hidden lg:block' : ''}>
            <Media
              fill
              size="1200px"
              loading="lazy"
              quality={75}
              resource={backgroundImage}
              imgClassName="object-cover"
              poster={thumbnail || undefined}
            />
          </div>
        ) : (
          !mobileBackgroundImage && <div className="h-full w-full bg-black" />
        )}
      </motion.div>

      <div
        className={`h-full py-8 lg:py-[7rem] px-8 lg:px-[4rem] z-20 relative flex flex-col items-start gap-8 justify-start`}
      >
        <div className="flex flex-col gap-4">
          <motion.h2
            className="text-white w-full lg:w-[60%]"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
            }}
            style={{ transformOrigin: 'left bottom' }}
          >
            {title}
          </motion.h2>
        </div>
        {content && (
          <motion.div
            className="w-full lg:w-[30%] text-white"
            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6,
            }}
          >
            <RichText data={content} />
          </motion.div>
        )}
        {link && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <DefaultButton link={link} variant='white' arrow='none' />
          </motion.div>
        )}
      </div>
      <motion.div />
    </section>
  )
}

export default CTA
