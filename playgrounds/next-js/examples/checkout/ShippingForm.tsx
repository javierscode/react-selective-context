'use client'

import { useCallback } from 'react'
import { updateShippingField, updateStep } from './CheckoutState'
import { useCheckoutSelector, useCheckoutSetter } from './context'
import { InputField } from './InputField'

export function ShippingForm() {
  const step = useCheckoutSelector((state) => state.step)
  const shipping = useCheckoutSelector((state) => state.shipping)
  const setCheckoutState = useCheckoutSetter()

  const updateField = useCallback(
    (field: keyof typeof shipping, value: string) =>
      setCheckoutState(updateShippingField(field, value)),
    [setCheckoutState]
  )

  const updateFullName = useCallback(
    (value: string) => updateField('fullName', value),
    [updateField]
  )

  const updateEmail = useCallback(
    (value: string) => updateField('email', value),
    [updateField]
  )

  const updateAddress = useCallback(
    (value: string) => updateField('address', value),
    [updateField]
  )

  const updateCity = useCallback(
    (value: string) => updateField('city', value),
    [updateField]
  )

  const updateZipCode = useCallback(
    (value: string) => updateField('zipCode', value),
    [updateField]
  )

  const goBack = () => setCheckoutState(updateStep('cart'))

  const goToConfirmation = () => setCheckoutState(updateStep('confirmation'))

  const isValid = Object.values(shipping).every((v) => v.trim() !== '')

  if (step !== 'shipping') return null

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-teal-300'>Shipping Information</h3>

      <div className='space-y-3'>
        <InputField
          label='Full Name'
          value={shipping.fullName}
          onChange={updateFullName}
          placeholder='John Doe'
        />
        <InputField
          label='Email'
          type='email'
          value={shipping.email}
          onChange={updateEmail}
          placeholder='john@example.com'
        />
        <InputField
          label='Address'
          value={shipping.address}
          onChange={updateAddress}
          placeholder='123 Main Street'
        />
        <div className='grid grid-cols-2 gap-3'>
          <InputField
            label='City'
            value={shipping.city}
            onChange={updateCity}
            placeholder='New York'
          />
          <InputField
            label='ZIP Code'
            value={shipping.zipCode}
            onChange={updateZipCode}
            placeholder='10001'
          />
        </div>
      </div>

      <div className='flex gap-3 pt-2'>
        <button
          onClick={goBack}
          className='flex-1 rounded-xl border border-slate-600 py-3 font-medium
            text-slate-300 transition-all hover:bg-slate-800'
        >
          ← Back
        </button>
        <button
          onClick={goToConfirmation}
          disabled={!isValid}
          className='flex-1 rounded-xl bg-teal-600 py-3 font-semibold text-white
            transition-all hover:bg-teal-500 disabled:cursor-not-allowed
            disabled:opacity-50'
        >
          Review Order →
        </button>
      </div>
    </div>
  )
}
