'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

import InputMask from 'react-input-mask'
import { SimpleLayout } from '@/components/SimpleLayout'
import * as actions from '@/actions'

const officers = [
  {
    title: 'President',
    name: 'Sarah Viswambaran',
  },
  {
    title: 'Vice President',
    name: 'Lee Argo Rawlinson',
  },
  {
    title: 'Secretary',
    name: 'Joshua Friesen',
  },
  {
    title: 'Finance',
    name: 'Laura Oates',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [error, setError] = useState({
    email: null,
    phoneNumber: null,
    message: null,
  })

  const hasError = useMemo(() => {
    return Object.values(error).some((e) => e !== null)
  }, [error])

  const handleInputChange = (event) => {
    // console.log('event.target:', event.target)
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === 'phoneNumber') {
      // Simple regex validation for a US phone number
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      if (!phoneRegex.test(value)) {
        setError((prevError) => ({
          ...prevError,
          phoneNumber: 'Invalid phone number format',
        }))
      } else {
        setError((prevError) => ({ ...prevError, phoneNumber: null }))
      }
    } else if (name === 'email') {
      // Validate email
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!emailRegex.test(value)) {
        setError((prevError) => ({
          ...prevError,
          email: 'Invalid email format',
        }))
      } else {
        setError((prevError) => ({ ...prevError, email: null }))
      }
    } else if (name === 'message') {
      // message must have two words of minimum length 3
      const messageRegex = /\b\w{3,}\b/g
      const matches = value.match(messageRegex) || []
      if (matches.length < 2 || value.length < 6) {
        setError((prevError) => ({
          ...prevError,
          message: 'Message must have at least two words of minimum length 3',
        }))
      } else {
        setError((prevError) => ({ ...prevError, message: null }))
      }
    }
  }

  useEffect(() => {
    const { firstName, lastName, email, phoneNumber, message } = formData
    if (firstName && lastName && email && phoneNumber && message) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [formData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const message = event.target.message.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const phoneNumber = event.target.phoneNumber.value

    const response = await actions.sendEmails({
      email,
      message,
      firstName,
      lastName,
      phoneNumber,
    })

    if (response.success) {
      window.alert('Message sent successfully.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      })
    } else {
      console.error('Message not sent.')
    }
  }

  return (
    <SimpleLayout title="Contact Us." intro="Get in touch ">
      <div className="relative isolate">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 sm:pt-8 lg:static lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-gray-900/10 dark:ring-white/5 lg:w-1/2">
                <div
                  className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                      clipPath:
                        'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col md:py-8">
                <OfficersSection officers={officers} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Get in touch
              </h2>
              <p className="mt-6 text-lg leading-8">
                Please use this form to contact your local HOA board. The board
                will do their best to respond to your email within a few days.
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      className="text-white-700 transition duration-200 hover:text-teal-600"
                      href="mailto:hello@example.com"
                    >
                      hello@example.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold leading-6"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      onChange={handleInputChange}
                      value={formData.firstName}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold leading-6 "
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      onChange={handleInputChange}
                      value={formData.lastName}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 "
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      value={formData.email}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {error.email && (
                    <div className="text-sm text-red-500">{error.email}</div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold leading-6 "
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <InputMask
                      mask="(999) 999-9999"
                      maskChar={null}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    >
                      {() => (
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          autoComplete="tel"
                          onChange={handleInputChange}
                          value={formData.phoneNumber}
                          className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                        />
                      )}
                    </InputMask>
                    {error.phoneNumber && (
                      <span className="text-sm text-red-500">
                        {error.phoneNumber}
                      </span>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      onChange={handleInputChange}
                      value={formData.message}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {error.message && (
                    <div className="text-sm text-red-500">{error.message}</div>
                  )}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isButtonDisabled || hasError}
                  className={`rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm 
    ${
      isButtonDisabled || hasError
        ? 'cursor-not-allowed bg-gray-400'
        : 'bg-teal-600 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
    }`}
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}

function Officer({ title, name, email }) {
  return (
    <div className="flex flex-row justify-between gap-4">
      <p>{name}</p>
      <h2>{title}</h2>
    </div>
  )
}

function OfficersSection({ officers }) {
  return (
    <div>
      {officers.map((officer, index) => (
        <Officer key={index} title={officer.title} name={officer.name} />
      ))}
    </div>
  )
}
