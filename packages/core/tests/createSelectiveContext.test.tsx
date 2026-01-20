import { describe, it, expect } from 'vitest'

import { createSelectiveContext } from '../src/createSelectiveContext'

describe('createSelectiveContext', () => {
  it('should create a React context with null as default value', () => {
    const context = createSelectiveContext<{ count: number }>()

    // The context should be a valid React context
    expect(context).toBeDefined()
    expect(context.Provider).toBeDefined()
    expect(context.Consumer).toBeDefined()
    // @ts-expect-error - _currentValue is not defined on the context type
    expect(context._currentValue).toBe(null)
  })
})
