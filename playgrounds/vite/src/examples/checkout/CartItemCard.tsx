import { useCheckoutSetter } from './context'
import { updateCartItemQuantity, type CartItem } from './CheckoutState'
import { memo } from 'react'

type CartItemCardProps = {
  item: CartItem
}

export const CartItemCard = memo(function CartItemCard({ item }: CartItemCardProps) {
  const setCheckoutState = useCheckoutSetter()

  const updateQuantity = (delta: number) =>
    setCheckoutState(updateCartItemQuantity(item.id, delta))

  return (
    <div
      className='flex items-center gap-4 rounded-xl border border-slate-700/50
        bg-slate-800/30 p-4'
    >
      <div
        className='flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700/50
          text-2xl'
      >
        {item.image}
      </div>

      <div className='flex-1'>
        <h4 className='font-medium text-slate-200'>{item.name}</h4>
        <p className='text-sm text-teal-400'>${item.price.toFixed(2)}</p>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={() => updateQuantity(-1)}
          className='h-8 w-8 rounded-lg bg-slate-700 text-slate-300 transition-all
            hover:bg-slate-600'
        >
          −
        </button>
        <span className='w-8 text-center text-slate-200'>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(1)}
          className='h-8 w-8 rounded-lg bg-slate-700 text-slate-300 transition-all
            hover:bg-slate-600'
        >
          +
        </button>
      </div>
    </div>
  )
})
