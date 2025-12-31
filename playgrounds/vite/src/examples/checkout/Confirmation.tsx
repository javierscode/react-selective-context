import { updateStep } from './CheckoutState'
import { useCheckoutSelector, useCheckoutSetter } from './context'

export function Confirmation() {
  const step = useCheckoutSelector((state) => state.step)
  const items = useCheckoutSelector((state) => state.items)
  const shipping = useCheckoutSelector((state) => state.shipping)
  const promoCode = useCheckoutSelector((state) => state.promoCode)
  const promoDiscount = useCheckoutSelector((state) => state.promoDiscount)
  const setCheckoutState = useCheckoutSetter()

  if (step !== 'confirmation') return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal * promoDiscount
  const shippingCost = subtotal > 100 ? 0 : 9.99
  const total = subtotal - discount + shippingCost

  const goBack = () => setCheckoutState(updateStep('shipping'))

  const placeOrder = () => alert('🎉 Order placed successfully! (This is a demo)')

  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold text-teal-300'>Order Confirmation</h3>

      <div className='rounded-xl border border-slate-700/50 bg-slate-800/30 p-4'>
        <h4 className='mb-2 text-sm font-medium text-slate-400'>Shipping To</h4>
        <p className='text-slate-200'>{shipping.fullName}</p>
        <p className='text-sm text-slate-400'>{shipping.email}</p>
        <p className='text-sm text-slate-400'>
          {shipping.address}, {shipping.city} {shipping.zipCode}
        </p>
      </div>

      <div className='rounded-xl border border-slate-700/50 bg-slate-800/30 p-4'>
        <h4 className='mb-3 text-sm font-medium text-slate-400'>Items</h4>
        <div className='space-y-2'>
          {items.map((item) => (
            <div key={item.id} className='flex items-center justify-between text-sm'>
              <span className='text-slate-300'>
                {item.image} {item.name} × {item.quantity}
              </span>
              <span className='text-slate-400'>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-2 rounded-xl border border-teal-700/30 bg-teal-900/10 p-4'>
        <div className='flex justify-between text-sm text-slate-400'>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {promoCode && (
          <div className='flex justify-between text-sm text-teal-400'>
            <span>Discount ({promoCode})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className='flex justify-between text-sm text-slate-400'>
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className='border-t border-slate-700 pt-2'>
          <div className='flex justify-between text-lg font-bold text-white'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className='flex gap-3'>
        <button
          onClick={goBack}
          className='flex-1 rounded-xl border border-slate-600 py-3 font-medium
            text-slate-300 transition-all hover:bg-slate-800'
        >
          ← Back
        </button>
        <button
          onClick={placeOrder}
          className='flex-1 rounded-xl bg-teal-600 py-3 font-semibold text-white
            transition-all hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25'
        >
          Place Order 🎉
        </button>
      </div>
    </div>
  )
}
