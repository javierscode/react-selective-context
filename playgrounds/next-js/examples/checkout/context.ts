'use client'

import {
  createSelectiveContext,
  createContextSelector,
  createContextSetter,
} from 'react-selective-context'
import { CheckoutState } from './CheckoutState'

export const CheckoutContext = createSelectiveContext<CheckoutState>()

export const useCheckoutSelector = createContextSelector(CheckoutContext)
export const useCheckoutSetter = createContextSetter(CheckoutContext)
