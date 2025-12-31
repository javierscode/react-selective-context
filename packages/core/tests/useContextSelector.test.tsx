import React, { useContext } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { renderToString } from 'react-dom/server'

import { useContextSelector } from '../src/useContextSelector'
import { createSelectiveContext } from '../src/createSelectiveContext'
import SelectiveProvider from '../src/provider'
import { Store } from '../src/types'

describe('useContextSelector', () => {
  it('should throw error when used outside provider', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    expect(() => {
      renderHook(() => useContextSelector(TestContext, (state) => state.count))
    }).toThrow('useContextSelector must be used inside a SelectiveProvider')
  })

  it('should throw error when selector is not a function', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </SelectiveProvider>
    )

    expect(() => {
      renderHook(
        () =>
          useContextSelector(
            TestContext,
            'not a function' as unknown as (state: { count: number }) => number
          ),
        { wrapper }
      )
    }).toThrow('selector must be a function')
  })

  it('should return selected state slice', () => {
    const TestContext = createSelectiveContext<{ count: number; name: string }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 42, name: 'test' }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(
      () => useContextSelector(TestContext, (state) => state.count),
      { wrapper }
    )

    expect(result.current).toBe(42)
  })

  it('should update when selected slice changes', () => {
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
        const store = useContext(TestContext)
        storeRef = store
        return useContextSelector(TestContext, (state) => state.count)
      },
      { wrapper }
    )

    expect(result.current).toBe(0)

    act(() => {
      storeRef?.setState({ count: 10 })
    })

    expect(result.current).toBe(10)
  })

  it('should use custom compare function', () => {
    const TestContext = createSelectiveContext<{ items: number[] }>()
    const customCompare = vi.fn((a: number[], b: number[]) => a.length === b.length)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ items: [1, 2, 3] }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(
      () => useContextSelector(TestContext, (state) => state.items, customCompare),
      { wrapper }
    )

    expect(result.current).toEqual([1, 2, 3])
    expect(customCompare).toHaveBeenCalled()
  })

  it('should not re-render when selected slice is shallowEqual', () => {
    type TestState = { count: number; unrelated: string }
    const TestContext = createSelectiveContext<TestState>()
    let storeRef: Store<TestState> | null = null
    let renderCount = 0

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 5, unrelated: 'a' }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(
      () => {
        renderCount++
        const store = useContext(TestContext)
        storeRef = store
        return useContextSelector(TestContext, (state) => ({ count: state.count }))
      },
      { wrapper }
    )

    expect(result.current).toEqual({ count: 5 })
    const initialRenderCount = renderCount

    act(() => {
      // Change unrelated field - should not cause re-render of selector
      storeRef?.setState({ count: 5, unrelated: 'b' })
    })

    // The selector returns an object with count: 5 both times
    // shallowEqual should detect they are equal
    expect(result.current).toEqual({ count: 5 })
    expect(renderCount).toBe(initialRenderCount)
  })

  it('should update lastSlice ref when value changes', () => {
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
        const store = useContext(TestContext)
        storeRef = store
        return useContextSelector(TestContext, (state) => state.count)
      },
      { wrapper }
    )

    expect(result.current).toBe(0)

    act(() => {
      storeRef?.setState({ count: 100 })
    })

    expect(result.current).toBe(100)
  })

  it('should use server snapshot for SSR', () => {
    type TestState = { count: number }
    const TestContext = createSelectiveContext<TestState>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 42 }}>
        {children}
      </SelectiveProvider>
    )

    // This test verifies the getServerSnapshot callback is created
    // The actual SSR behavior would need an SSR testing environment
    const { result } = renderHook(
      () => useContextSelector(TestContext, (state) => state.count),
      { wrapper }
    )

    expect(result.current).toBe(42)
  })

  it('should call getServerSnapshot during server rendering', () => {
    type TestState = { count: number }
    const TestContext = createSelectiveContext<TestState>()

    const Consumer = () => {
      const count = useContextSelector(TestContext, (state) => state.count)
      return <div>{count}</div>
    }

    // Use renderToString to simulate SSR - this will call getServerSnapshot
    const html = renderToString(
      <SelectiveProvider context={TestContext} initialState={{ count: 777 }}>
        <Consumer />
      </SelectiveProvider>
    )

    // Verify the server-rendered HTML contains the initial count
    expect(html).toContain('777')
  })
})

