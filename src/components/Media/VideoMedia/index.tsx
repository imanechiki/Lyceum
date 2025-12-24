'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const {
    autoPlay,
    controls,
    loop,
    muted,
    onClick,
    playsInline,
    preload,
    poster,
    resource,
    videoClassName,
  } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {})
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url } = resource

    return (
      <video
        className={cn(
          'w-full h-full object-cover',
          'absolute top-0 left-0',
          'min-w-full min-h-full',
          videoClassName,
        )}
        autoPlay={autoPlay ?? true}
        controls={Boolean(controls)}
        loop={loop ?? true}
        muted={muted ?? true}
        preload={preload ?? 'metadata'}
        onClick={onClick}
        playsInline={playsInline ?? true}
        ref={videoRef}
        style={{ width: '100%', height: '100%' }}
        poster={
          poster ? (typeof poster === 'string' ? poster : getMediaUrl(poster.url)) : undefined
        }
      >
        <source src={getMediaUrl(url)} />
      </video>
    )
  }

  return null
}
