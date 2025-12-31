'use client'

import { SelectiveProvider } from 'react-selective-context'
import { CheckoutContext } from './context'
import { initialCheckoutState } from './CheckoutState'

export function CheckoutProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <SelectiveProvider context={CheckoutContext} initialState={initialCheckoutState}>
      {children}
    </SelectiveProvider>
  )
}
