export type Listener = () => void

export type Selector<TState, TSlice> = (state: TState) => TSlice

export type Store<TState> = {
  getState: () => TState
  getServerSnapshot: () => TState
  setState: (next: TState) => void
  subscribe: (listener: Listener) => () => void
}
