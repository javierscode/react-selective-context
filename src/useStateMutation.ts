import { useCallback, useContext } from 'react'
import type { Store } from './types'

export function useStateMutation<TState>(context: React.Context<Store<TState> | null>) {
  const store = useContext(context)
  if (!store) throw new Error('useStateMutation must be used inside a StateProvider')

  const mutate = useCallback(
    (next: TState | ((prev: TState) => TState)) => {
      const nextState =
        typeof next === 'function'
          ? (next as (prev: TState) => TState)(store.getState())
          : next

      store.setState(nextState)
    },
    [store]
  )

  return mutate
}
