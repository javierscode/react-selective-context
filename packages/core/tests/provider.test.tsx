import React, { useContext } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import SelectiveProvider from '../src/provider'
import { createSelectiveContext } from '../src/createSelectiveContext'

describe('SelectiveProvider', () => {
  it('should provide the store to children', () => {
    const TestContext = createSelectiveContext<{ count: number }>()

    const Consumer = () => {
      const store = useContext(TestContext)
      return <div data-testid='value'>{store?.getState().count}</div>
    }

    render(
      <SelectiveProvider context={TestContext} initialState={{ count: 42 }}>
        <Consumer />
      </SelectiveProvider>
    )

    expect(screen.getByTestId('value').textContent).toBe('42')
  })

  it('should create store only once across re-renders', () => {
    const TestContext = createSelectiveContext<{ count: number }>()
    let storeRef: unknown = null

    const Consumer = () => {
      const store = useContext(TestContext)
      if (!storeRef) {
        storeRef = store
      }
      return <div data-testid='same'>{store === storeRef ? 'same' : 'different'}</div>
    }

    const { rerender } = render(
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        <Consumer />
      </SelectiveProvider>
    )

    // Re-render the same component
    rerender(
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        <Consumer />
      </SelectiveProvider>
    )

    expect(screen.getByTestId('same').textContent).toBe('same')
  })

  it('should render children correctly', () => {
    const TestContext = createSelectiveContext<{ name: string }>()

    render(
      <SelectiveProvider context={TestContext} initialState={{ name: 'test' }}>
        <div data-testid='child'>Hello World</div>
      </SelectiveProvider>
    )

    expect(screen.getByTestId('child').textContent).toBe('Hello World')
  })
})
