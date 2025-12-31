import { useCheckoutSelector, useCheckoutSetter } from './context'
import { CartItemCard } from './CartItemCard'
import { updateStep } from './CheckoutState'

export function CartSummary() {
  const items = useCheckoutSelector((state) => state.items)
  const step = useCheckoutSelector((state) => state.step)
  const setCheckoutState = useCheckoutSetter()

  if (step !== 'cart') return null

  const goToShipping = () => setCheckoutState(updateStep('shipping'))

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-teal-300'>Your Cart</h3>

      <div className='space-y-3'>
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <button
        onClick={goToShipping}
        className='mt-4 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white
          transition-all hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25'
      >
        Continue to Shipping →
      </button>
    </div>
  )
}
