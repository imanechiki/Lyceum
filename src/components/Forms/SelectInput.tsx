'use client'

import type React from 'react'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectInputProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  className?: string
  variant?: 'dark' | 'light'
  'aria-invalid'?: boolean
  'aria-describedby'?: string
  disabled?: boolean
  id?: string
}

export default function SelectInput({
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = '',
  variant = 'dark',
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  disabled = false,
  id,
}: SelectInputProps) {
  const selectId = id || name
  const [hasValue, setHasValue] = useState(!!value)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setHasValue(!!value)
    const option = options.find((opt) => opt.value === value)
    setSelectedLabel(option?.label || '')
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('')
      setHighlightedIndex(-1)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    const syntheticEvent = {
      target: { value: optionValue, name },
    } as React.ChangeEvent<HTMLSelectElement>

    onChange(syntheticEvent)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
        event.preventDefault()

        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }

        const newSearchTerm = searchTerm + event.key.toLowerCase()
        setSearchTerm(newSearchTerm)

        const matchIndex = options.findIndex((opt) =>
          opt.label.toLowerCase().startsWith(newSearchTerm),
        )

        if (matchIndex !== -1) {
          setHighlightedIndex(matchIndex)
          const optionElement = dropdownRef.current?.querySelector(`[data-index="${matchIndex}"]`)
          optionElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }

        searchTimeoutRef.current = setTimeout(() => {
          setSearchTerm('')
        }, 1000)
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      } else if (event.key === 'Enter' && highlightedIndex >= 0) {
        event.preventDefault()
        const option = options[highlightedIndex]
        if (option && !option.disabled) {
          handleSelect(option.value)
        }
      } else if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, searchTerm, highlightedIndex, options.length])

  const isLight = variant === 'light'
  const containerBase = isLight
    ? 'w-full bg-black rounded-full text-[13px] cursor-pointer border-[3px] border-[##B2B2B2] py-4 px-8 flex justify-between items-center text-[#B2B2B2]'
    : 'w-full bg-transparent text-[16px] cursor-pointer border border-[##B2B2B2] px-4 py-3 flex justify-between items-center text-white'

  const containerClasses = `${containerBase} ${ariaInvalid ? (isLight ? 'border-[#FF0000]' : 'border-[#FF0000]') : ''}`

  const listBase = isLight
    ? 'absolute left-0 right-0 mt-1 z-50 bg-black text-[#B2B2B2] border-[3px] border-[##B2B2B2] rounded-[1rem] shadow-lg max-h-[40vh] md:max-h-[33vh] ultrawide:max-h-[27vh] overflow-y-auto'
    : 'absolute left-0 right-0 mt-1 z-50 bg-[#FF0000]  shadow-lg max-h-[40vh] md:max-h-[33vh] ultrawide:max-h-[27vh]  overflow-y-auto'

  const optionItemBase = isLight
    ? 'p-4 hover:bg-[#FF0000] hover:text-white cursor-pointer'
    : 'p-4 hover:bg-white hover:text-black cursor-pointer'

  return (
    <div className="relative cursor-pointer text-[16px]" ref={dropdownRef}>
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        className="sr-only"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      <div
        className={`${containerClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div
          className={
            hasValue
              ? isLight
                ? 'text-[#B2B2B2]'
                : 'text-white'
              : isLight
                ? 'text-[#B2B2B2]'
                : 'text-white'
          }
        >
          {hasValue ? selectedLabel : placeholder}
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''} ${isLight ? 'text-[#B2B2B2]' : 'text-white'}`}
        />
      </div>

      {isOpen && (
        <div className={listBase}>
          {options.length === 0 ? (
            <div className={`${optionItemBase} ${isLight ? 'text-[#B2B2B2]' : 'text-white'}`}>
              No options available
            </div>
          ) : (
            options.map((option, index) => (
              <div
                key={option.value}
                data-index={index}
                className={`${optionItemBase} ${
                  option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${
                  index === highlightedIndex
                    ? isLight
                      ? 'bg-[#FF0000] text-white'
                      : 'bg-white text-[#B2B2B2]'
                    : option.value === value
                      ? isLight
                        ? 'font-bold text-[#B2B2B2]'
                        : 'font-bold text-white'
                      : isLight
                        ? 'text-[#B2B2B2]'
                        : 'text-white'
                }`}
                onClick={() => {
                  if (!option.disabled) {
                    handleSelect(option.value)
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
