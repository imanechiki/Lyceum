import React from 'react'
import { Input } from '@/components/ui/input'
import DefaultButton from '@/components/Buttons/DefaultButton'

interface SubscribeFormProps {
  subscribeText: string
  subscribeValue: string
  onChange: (v: string) => void
  onSubmit: () => void
  subscribeButtonLabel: string
  error?: string
  success?: string
  buttonClass: string
  submitting?: boolean
}

export function SubscribeForm({
  subscribeText,
  subscribeValue,
  onChange,
  onSubmit,
  subscribeButtonLabel,
  error,
  success,
  submitting = false,
}: SubscribeFormProps) {
  return (
    <form
      className="flex flex-row md:flex-col items-start md:items-stretch gap-2 md:gap-3 w-full align-center"
      onSubmit={(e) => {
        e.preventDefault()
        if (!submitting) onSubmit()
      }}
    >
      <div className="flex flex-col lg:relative  w-full">
        <Input
          type="email"
          placeholder={subscribeText || 'Enter email'}
          value={subscribeValue}
          onChange={(e) => onChange(e.target.value)}
          className={` h-12 md:h-[3.5rem] bg-white px-4 py-0 rounded-[8px] border border-[#B2B2B2] !text-[15px]  placeholder-black !focus:border-[#FF0000] !focus:ring-0 !focus:outline-none !focus:shadow-none placeholder:text-[15px] font-plusJakarta font-semibold text-black`}
        />
        {error && (
          <span
            className="
              text-[#FF0000] text-[15px] mt-2
            "
          >
            {error}
          </span>
        )}
        {!error && success && (
          <span
            className="
              text-[#4CAF50] text-[15px] mt-2
            "
          >
            {success}
          </span>
        )}
      </div>
      <DefaultButton variant="red" type="submit" arrow='none' className='h-12 md:h-auto py-0 text-[14px] !font-plusJakarta font-semibold !normal-case' disabled={submitting}>
        {submitting ? 'Submitting…' : subscribeButtonLabel}
      </DefaultButton>
    </form>
  )
}
