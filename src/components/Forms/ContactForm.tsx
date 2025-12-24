'use client'

import { useState, useCallback } from 'react'
import type React from 'react'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import DefaultButton from '../Buttons/DefaultButton'
import { useRouter } from 'next/navigation'
import SelectInput from './SelectInput'

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  story?: string
  subject?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    story: '',
    subject: '',
  })

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }))

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const newErrors: FormErrors = {}

      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email address'

      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
      else if (!/^[+\d]+$/.test(formData.phoneNumber))
        newErrors.phoneNumber = 'Phone number can only contain digits and + symbol'

      if (!formData.subject) newErrors.subject = 'Email subject is required'

      if (!formData.story) newErrors.story = 'Your story is required'

      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors)
        return
      }

      try {
        setIsSubmitting(true)

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error(`Internal API error: ${response.statusText}`)

        router.push('/thanks')
      } catch (error) {
        console.error('Error submitting the contact us form:', error)
        setFormErrors({
          ...newErrors,
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData],
  )

  return (
    <div className="w-full lg:w-[90%] ultrawide:w-[80%] h-full bg-white p-8 flex flex-col gap-8">
      <h3 className="uppercase text-black font-normal">get in touch</h3>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="subject" className="sr-only">Email Subject</label>
            <SelectInput
              name="subject"
              value={formData.subject}
              onChange={handleChange as any}
              placeholder="Email Subject"
              required
              variant="light"
              options={[
                { value: 'General Inquiry', label: 'General Inquiry' },
                { value: 'Media Inquiry', label: 'Media Inquiry' },
                { value: 'Lost Tickets/Wrist Band', label: 'Lost Tickets/Wrist Band' },
                { value: 'Special Accommodations', label: 'Special Accommodations' },
                { value: 'Volunteer', label: 'Volunteer' },
                {
                  value: 'lyceum Vendor Opportunities',
                  label: 'lyceum Vendor Opportunities',
                },
              ]}
              aria-invalid={!!formErrors.subject}
              aria-describedby={formErrors.subject ? 'subject-error' : undefined}
            />
            {formErrors.subject && (
              <p id="subject-error" className="mt-1 text-xs text-[#FF0000]">
                {formErrors.subject}
              </p>
            )}
          </div>
          <div>
            <TextInput
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className={` text-[#000000] px-4 placeholder:text-[#000000] border border-[#D9D9D9] ${formErrors.firstName ? 'border-[#FF0000]' : ''}`}
              aria-invalid={!!formErrors.firstName}
              aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
            />
            {formErrors.firstName && (
              <p id="firstName-error" className="mt-1 text-xs text-[#FF0000]">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div>
            <TextInput
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className={` text-[#000000] px-4 placeholder:text-[#000000] border border-[#D9D9D9] ${formErrors.lastName ? 'border-[#FF0000]' : ''}`}
              aria-invalid={!!formErrors.lastName}
              aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
            />
            {formErrors.lastName && (
              <p id="lastName-error" className="mt-1 text-xs text-[#FF0000]">
                {formErrors.lastName}
              </p>
            )}
          </div>
          <div>
            <TextInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
              className={`text-[#000000] px-4 placeholder:text-[#000000] border border-[#D9D9D9] ${formErrors.email ? 'border-[#FF0000]' : ''}`}
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? 'email-error' : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-xs text-[#FF0000]">
                {formErrors.email}
              </p>
            )}
          </div>
          <div>
            <TextInput
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              type="tel"
              required
              className={`text-[#000000] px-4 placeholder:text-[#000000] border border-[#D9D9D9] ${formErrors.phoneNumber ? 'border-[#FF0000]' : ''}`}
              pattern="^[+\d]+$"
              title="Phone number can only contain digits and + symbol"
              aria-invalid={!!formErrors.phoneNumber}
              aria-describedby={formErrors.phoneNumber ? 'phone-error' : undefined}
            />
            {formErrors.phoneNumber && (
              <p id="phone-error" className="mt-1 text-xs text-[#FF0000]">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <div>
          <TextareaInput
            name="story"
            value={formData.story}
            onChange={(e) => handleChange(e as any)}
            placeholder="Your Comments/Questions"
            required
            className={`text-[#000000] px-4 placeholder:text-[#868686] border border-[#D9D9D9] ${formErrors.story ? 'border-[#FF0000]' : ''}`}
            aria-invalid={!!formErrors.story}
            aria-describedby={formErrors.story ? 'story-error' : undefined}
          />
          {formErrors.story && (
            <p id="story-error" className="mt-1 text-xs text-[#FF0000]">
              {formErrors.story}
            </p>
          )}
        </div>
        <div>
          <DefaultButton
            variant="outline"
            type="submit"
            disabled={isSubmitting}
            arrow="none"
            className="w-full !py-7"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </DefaultButton>
        </div>
      </form>
    </div>
  )
}
