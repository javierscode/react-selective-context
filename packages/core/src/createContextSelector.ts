import type { Selector, SelectiveContext } from './types'
import { useContextSelector } from './useContextSelector'

export function createContextSelector<TState>(context: SelectiveContext<TState>) {
  return <TSlice>(selector: Selector<TState, TSlice>) =>
    useContextSelector(context, selector)
}
