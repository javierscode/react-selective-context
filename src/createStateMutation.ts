import { useStateMutation } from './useStateMutation'
import type { Store } from './types'

export function createStateMutation<TState>(
  context: React.Context<Store<TState> | null>
) {
  return () => useStateMutation(context)
}
