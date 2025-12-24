'use client'

import type React from 'react'

interface TextareaInputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  className?: string
  rows?: number
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export default function TextareaInput({
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  rows = 6,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: TextareaInputProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-black py-4 px-8 border-[3px] rounded-[1rem] text-[#B2B2B2] border-[#B2B2B2] focus:outline-none text-[16px] focus:border-[#FF0000] h-30 resize-none align-top ${className}`}
      required={required}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
    />
  )
}
