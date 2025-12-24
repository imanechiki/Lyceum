'use client'

import type React from 'react'
import { Check } from 'lucide-react'

interface CheckboxInputProps {
  id: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  className?: string
}

export default function CheckboxInput({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
}: CheckboxInputProps) {
  return (
    <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="appearance-none text-xl h-5 w-5 border cursor-pointer border-white/50 checked:bg-blue-600 rounded"
        />
        {checked && (
          <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none" />
        )}
      </div>
      <label htmlFor={id} className={`text-xl cursor-pointer font-HelveticaRegular ${className}`}>
        {label}
      </label>
    </div>
  )
}
