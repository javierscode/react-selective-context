import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createContextSetter } from '../src/createContextSetter'
import { createSelectiveContext } from '../src/createSelectiveContext'
import SelectiveProvider from '../src/provider'

describe('createContextSetter', () => {
  it('should create a hook bound to the context', () => {
    const TestContext = createSelectiveContext<{ count: number }>()
    const useTestSetter = createContextSetter(TestContext)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectiveProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </SelectiveProvider>
    )

    const { result } = renderHook(() => useTestSetter(), { wrapper })

    expect(typeof result.current).toBe('function')
  })
})
