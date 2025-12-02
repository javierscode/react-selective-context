import type { Selector, Store } from './types'
import React from 'react'
import { useStateSelector } from './useStateSelector'

export function createStateSelector<TState>(
  context: React.Context<Store<TState> | null>
) {
  return <TSlice>(selector: Selector<TState, TSlice>) =>
    useStateSelector(context, selector)
}
