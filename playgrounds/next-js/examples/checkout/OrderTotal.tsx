'use client'

import { useCheckoutSelector } from './context'

export function OrderTotal() {
  const items = useCheckoutSelector((state) => state.items)
  const promoDiscount = useCheckoutSelector((state) => state.promoDiscount)
  const promoCode = useCheckoutSelector((state) => state.promoCode)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal * promoDiscount
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal - discount + shipping

  return (
    <div className='rounded-xl border border-slate-700/50 bg-slate-800/30 p-4'>
      <h3 className='mb-4 font-semibold text-slate-300'>Order Summary</h3>

      <div className='space-y-2 text-sm'>
        <div className='flex justify-between text-slate-400'>
          <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {promoCode && (
          <div className='flex justify-between text-teal-400'>
            <span>Promo ({promoCode})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className='flex justify-between text-slate-400'>
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className='border-t border-slate-700 pt-2'>
          <div className='flex justify-between text-lg font-bold text-white'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {subtotal < 100 && (
        <p className='mt-3 text-xs text-slate-500'>
          Add ${(100 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  )
}
