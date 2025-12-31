import { SelectiveProvider } from 'react-selective-context'
import { CheckoutContext } from './context'
import { initialCheckoutState } from './CheckoutState'
import { StepIndicator } from './StepIndicator'
import { CartSummary } from './CartSummary'
import { ShippingForm } from './ShippingForm'
import { Confirmation } from './Confirmation'
import { OrderTotal } from './OrderTotal'
import { PromoCode } from './PromoCode'

export function Checkout() {
  return (
    <SelectiveProvider context={CheckoutContext} initialState={initialCheckoutState}>
      <div
        className='rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6
          backdrop-blur-sm'
      >
        <div className='mb-6 flex items-center gap-3'>
          <div className='rounded-xl bg-teal-600 p-2'>
            <svg
              className='h-6 w-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
          <div>
            <h2 className='text-xl font-bold text-white'>Checkout Flow</h2>
            <p className='text-sm text-slate-400'>
              Multi-step form with shared state across components
            </p>
          </div>
        </div>

        <StepIndicator />

        <div className='flex gap-6 flex-col lg:flex-row'>
          <div className='flex-1'>
            <CartSummary />
            <ShippingForm />
            <Confirmation />
          </div>

          <div className='w-full lg:w-80 space-y-4'>
            <OrderTotal />
            <PromoCode />
          </div>
        </div>
      </div>
    </SelectiveProvider>
  )
}
