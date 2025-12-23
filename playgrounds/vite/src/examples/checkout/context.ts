import {
  createStateContext,
  createStateSelector,
  createStateMutation,
} from '@javierscode/react-state-context'
import { CheckoutState } from './CheckoutState'

export const CheckoutContext = createStateContext<CheckoutState>()

export const useCheckoutSelector = createStateSelector(CheckoutContext)
export const useCheckoutMutation = createStateMutation(CheckoutContext)
