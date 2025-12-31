'use client'

import { useState } from 'react'
import { useCheckoutSelector, useCheckoutSetter } from './context'
import { addPromoCode, checkValidPromoCode, removePromoCode } from './CheckoutState'

type PromoCodeState = {
  input: string
  error: string
}

export function PromoCode() {
  const promoCode = useCheckoutSelector((state) => state.promoCode)
  const setCheckoutState = useCheckoutSetter()
  const [state, setState] = useState<PromoCodeState>({
    input: '',
    error: '',
  })

  const applyCode = () => {
    const code = state.input.toUpperCase().trim()
    if (checkValidPromoCode(code)) {
      setCheckoutState(addPromoCode(code))
      setState({ input: '', error: '' })
    } else {
      setState({ input: '', error: 'Invalid promo code' })
    }
  }

  const removeCode = () => setCheckoutState(removePromoCode())

  if (promoCode) {
    return (
      <div
        className='flex items-center justify-between rounded-lg border border-teal-700/50
          bg-teal-900/20 px-4 py-3'
      >
        <div className='flex items-center gap-2'>
          <span className='text-teal-400'>✓</span>
          <span className='font-medium text-teal-300'>{promoCode}</span>
          <span className='text-sm text-teal-400/70'>applied</span>
        </div>
        <button
          onClick={removeCode}
          className='text-sm text-slate-400 hover:text-red-400'
        >
          Remove
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='Enter promo code'
          value={state.input}
          onChange={(e) => {
            setState({ input: e.target.value, error: '' })
          }}
          className='flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2
            text-sm text-slate-200 placeholder-slate-500 outline-none transition-all
            focus:border-teal-500'
        />
        <button
          onClick={applyCode}
          className='rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300
            transition-all hover:bg-slate-600'
        >
          Apply
        </button>
      </div>
      {state.error && <p className='mt-1 text-xs text-red-400'>{state.error}</p>}
      <p className='mt-1 text-xs text-slate-500'>Try: SAVE10, SAVE20, or HALF</p>
    </div>
  )
}
