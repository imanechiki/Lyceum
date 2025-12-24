'use client'

import type React from 'react'

interface TextInputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'number'
  required?: boolean
  className?: string
  pattern?: string
  title?: string
  maxLength?: number
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search' | 'decimal'
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export default function TextInput({
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  className = '',
  pattern,
  title,
  maxLength,
  inputMode,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: TextInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-black rounded-full py-4 px-8 focus:outline-none text-[16px] md:text-[13px] focus:border-[#FF0000] border-[3px] border-[#B2B2B2] text-[#B2B2B2] ${className}`}
      required={required}
      pattern={pattern}
      title={title}
      maxLength={maxLength}
      inputMode={inputMode}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
    />
  )
}
