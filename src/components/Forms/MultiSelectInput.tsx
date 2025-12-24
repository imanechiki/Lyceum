'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
  description?: string
}

interface MultiSelectInputProps {
  name: string
  selectedValues: string[]
  onChange: (selectedValues: string[]) => void
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  className?: string
}

export default function MultiSelectInput({
  name,
  selectedValues,
  onChange,
  options,
  placeholder = 'Select',
  required = false,
  className = '',
}: MultiSelectInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder
    if (selectedValues.length === 1) {
      const selected = options.find((opt) => opt.value === selectedValues[0])
      return selected ? selected.label : placeholder
    }
    return `${selectedValues.length} items selected`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button styled like the other inputs */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-transparent border-b border-black/50 py-2 flex text-2xl justify-between items-center cursor-pointer ${className}`}
        aria-required={required}
        role="button"
        tabIndex={0}
      >
        <div className="truncate text-2xl">{getDisplayText()}</div>
        <ChevronDown className="h-4 w-4 flex-shrink-0" />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-black border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className={className}>{option.label}</span>
                {option.description && (
                  <span className="text-sm text-gray-400 ml-1">({option.description})</span>
                )}
              </div>
              {selectedValues.includes(option.value) && <Check className="h-4 w-4 text-blue-500" />}
            </div>
          ))}
        </div>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selectedValues.join(',')} />
    </div>
  )
}
