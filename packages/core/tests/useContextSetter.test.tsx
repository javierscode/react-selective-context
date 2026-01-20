import React, { useContext } from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useContextSetter } from '../src/useContextSetter'
import { createSelectiveContext } from '../src/createSelectiveContext'
import SelectiveProvider from '../src/provider'
import { Store } from '../src/types'

describe('useContextSetter', () => {
  it('should throw error when used outside provider', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    expect(() => {
      renderHook(() => useContextSetter(TestContext))
    }).toThrow('useContextSetter must be used inside a SelectiveProvider')
  })

  it('should return a mutate function', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(() => useContextSetter(TestContext), { wrapper })

    expect(typeof result.current).toBe('function')
  })

  it('should update state with direct value', () => {
    type TestState = { count: number }
    const TestContext = createSelectiveContext<TestState>()
    let storeRef: Store<TestState> | null = null

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(
      () => {
        const mutate = useContextSetter(TestContext)
        const store = useContext(TestContext)
        storeRef = store
        return mutate
      },
      { wrapper }
    )

    act(() => {
      result.current({ count: 5 })
    })

    expect(storeRef!.getState().count).toBe(5)
  })

  it('should update state with updater function', () => {
    type TestState = { count: number }
    const TestContext = createSelectiveContext<TestState>()
    let storeRef: Store<TestState> | null = null

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 10 }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(
      () => {
        const mutate = useContextSetter(TestContext)
        const store = React.useContext(TestContext)
        storeRef = store
        return mutate
      },
      { wrapper }
    )

    act(() => {
      result.current((prev) => ({ count: prev.count + 5 }))
    })

    expect(storeRef!.getState().count).toBe(15)
  })

  it('should maintain stable mutate function reference', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </SelectiveProvider>
    )

    const { result, rerender } = renderHook(() => useContextSetter(TestContext), {
      wrapper,
    })

    const firstMutate = result.current

    rerender()

    expect(result.current).toBe(firstMutate)
  })
})
