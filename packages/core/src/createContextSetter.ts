import { useContextSetter } from './useContextSetter'
import { SelectiveContext } from './types'

export function createContextSetter<TState>(context: SelectiveContext<TState>) {
  return () => useContextSetter(context)
}
