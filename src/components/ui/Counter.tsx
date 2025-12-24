'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { zeroPad } from 'react-countdown'

// Dynamically import Countdown to reduce initial bundle size
const Countdown = dynamic(() => import('react-countdown').then((mod) => mod.default), {
  ssr: false,
})

interface CounterProps {
  targetDate: string | number | Date
}

const Counter: React.FC<CounterProps> = ({ targetDate }) => {
  const renderer = ({ days, hours, minutes, completed }: any) => {
    if (completed) {
      return <h2>Time’s up!</h2>
    } else {
      return (
        <div className="flex w-max items-baseline justify-center gap-2 lg:gap-4 uppercase text-[30px] leading-[44px] font-semibold font-zalando md:text-[56px] md:leading-[52px] lg:text-[78px] lg:leading-[78px]">
          <div className="text-center flex flex-col gap-2 lg:gap-4">
            <span>{days}</span>
            <div className="text-[18px] leading-[28px] font-normal font-zalando md:text-[24px] md:leading-[30px] lg:text-[32px] lg:leading-[33px]">
              DAYS
            </div>
          </div>
          <span className="text-[#FF0000] ">/</span>

          <div className="text-center flex flex-col gap-2 lg:gap-4">
            <span>{zeroPad(hours)}</span>
            <div className="text-[18px] leading-[28px] font-normal font-zalando md:text-[24px] md:leading-[30px] lg:text-[32px] lg:leading-[33px]">
              HOURS
            </div>
          </div>
          <span className="text-[#FF0000] ">/</span>

          <div className="text-center flex flex-col gap-2 lg:gap-4">
            <span>{zeroPad(minutes)}</span>
            <div className="text-[18px] leading-[28px] font-normal font-zalando md:text-[24px] md:leading-[30px] lg:text-[32px] lg:leading-[33px]">
              MINUTES
            </div>
          </div>
        </div>
      )
    }
  }

  return <Countdown date={targetDate} renderer={renderer} />
}

export default Counter
