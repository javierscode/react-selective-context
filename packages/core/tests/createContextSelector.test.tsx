import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createContextSelector } from '../src/createContextSelector'
import { createSelectiveContext } from '../src/createSelectiveContext'
import SelectiveProvider from '../src/provider'

describe('createContextSelector', () => {
  it('should create a hook bound to the context', () => {
    const TestContext = createSelectiveContext<{ count: number }>()
    const useTestSelector = createContextSelector(TestContext)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 42 }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(() => useTestSelector((state) => state.count), {
      wrapper,
    })

    expect(result.current).toBe(42)
  })
})
