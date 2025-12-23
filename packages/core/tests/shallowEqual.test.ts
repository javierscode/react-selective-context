import { describe, it, expect } from 'vitest'

import { shallowEqual } from '../src/shallowEqual'

describe('shallowEqual', () => {
  describe('primitives', () => {
    it('should return true for primitives with same value', () => {
      // Primitives - compares by value
      expect(shallowEqual(1, 1)).toBe(true)
      expect(shallowEqual('hello', 'hello')).toBe(true)
      expect(shallowEqual(true, true)).toBe(true)
      expect(shallowEqual(null, null)).toBe(true)
      expect(shallowEqual(undefined, undefined)).toBe(true)
    })
    it('should return false for different primitives', () => {
      // Primitives - different values
      expect(shallowEqual(1, 2)).toBe(false)
      expect(shallowEqual('a', 'b')).toBe(false)
      expect(shallowEqual(true, false)).toBe(false)
    })
    it('should handle null and undefined comparisons', () => {
      // Different types
      expect(shallowEqual(null, undefined)).toBe(false)
      expect(shallowEqual(null, { a: 1 })).toBe(false)
      expect(shallowEqual({ a: 1 }, null)).toBe(false)
    })
    it('should handle NaN correctly', () => {
      // Same value (NaN === NaN via Object.is)
      expect(shallowEqual(NaN, NaN)).toBe(true)
      // As object properties - compares by value
      expect(shallowEqual({ a: NaN }, { a: NaN })).toBe(true)
    })
    it('should handle symbols correctly', () => {
      const sym1 = Symbol('test')
      const sym2 = Symbol('test')
      // Same reference
      expect(shallowEqual(sym1, sym1)).toBe(true)
      // Different references - symbols are unique
      // @ts-expect-error - symbols are not equal
      expect(shallowEqual(sym1, sym2)).toBe(false)
      // As object properties - same reference
      expect(shallowEqual({ a: sym1 }, { a: sym1 })).toBe(true)
      // As object properties - different references
      expect(shallowEqual({ a: sym1 }, { a: sym2 })).toBe(false)
    })
    it('should handle bigint correctly', () => {
      // Same value
      expect(shallowEqual(BigInt(123), BigInt(123))).toBe(true)
      // Different values
      expect(shallowEqual(BigInt(123), BigInt(456))).toBe(false)
      // As object properties - same value
      expect(shallowEqual({ a: BigInt(123) }, { a: BigInt(123) })).toBe(true)
      // As object properties - different values
      expect(shallowEqual({ a: BigInt(123) }, { a: BigInt(456) })).toBe(false)
    })
    it('should handle functions correctly', () => {
      const fn1 = () => {}
      const fn2 = () => {}
      // Same reference
      expect(shallowEqual(fn1, fn1)).toBe(true)
      // Different references
      expect(shallowEqual(fn1, fn2)).toBe(false)
      // As object properties - same reference
      expect(shallowEqual({ onClick: fn1 }, { onClick: fn1 })).toBe(true)
      // As object properties - different references
      expect(shallowEqual({ onClick: fn1 }, { onClick: fn2 })).toBe(false)
    })
    it('should handle Date objects correctly', () => {
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-01-01')
      const date3 = new Date('2025-12-31') // Different date
      // Same reference
      expect(shallowEqual(date1, date1)).toBe(true)
      // Different references - same timestamp value
      expect(shallowEqual(date1, date2)).toBe(true)
      // Different references - different timestamp value
      expect(shallowEqual(date1, date3)).toBe(false)
      // As object properties - compares by reference
      expect(shallowEqual({ date: date1 }, { date: date1 })).toBe(true)
      // ⚠️ As object properties - same timestamp value (different references)
      // is not a deep equal comparison ⚠️
      expect(shallowEqual({ date: date1 }, { date: date2 })).toBe(false)
      // As object properties - different timestamp value
      expect(shallowEqual({ date: date1 }, { date: date3 })).toBe(false)
    })
    it('should handle RegExp objects correctly', () => {
      const regex1 = /test/gi
      const regex2 = /test/gi
      const regex3 = /other/gi // Different pattern
      // Same reference
      expect(shallowEqual(regex1, regex1)).toBe(true)
      // Different references - same source and flags
      expect(shallowEqual(regex1, regex2)).toBe(true)
      // Different references - different source and flags
      expect(shallowEqual(regex1, regex3)).toBe(false)
      // As object properties - compares by reference
      expect(shallowEqual({ pattern: regex1 }, { pattern: regex1 })).toBe(true)
      expect(shallowEqual({ pattern: regex1 }, { pattern: regex2 })).toBe(false)
      expect(shallowEqual({ pattern: regex1 }, { pattern: regex3 })).toBe(false)
    })
  })

  describe('objects', () => {
    it('should return true for identical references', () => {
      const obj = { a: 1 }
      // Same reference
      expect(shallowEqual(obj, obj)).toBe(true)
    })
    it('should return true for shallow equal objects', () => {
      // Different references - same shallow values
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    })
    it('should return false for objects with different values', () => {
      // Different references - different values
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false)
    })
    it('should return false for objects with different keys', () => {
      // Different references - different keys
      expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false)
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    })
    it('should return false for nested objects (not deep equal)', () => {
      // ⚠️ Different references - nested objects are compared by reference,
      // this is a shallow equal comparison, not a deep equal comparison ⚠️
      expect(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(false)
    })
  })
  describe('arrays', () => {
    it('should return true for arrays with same elements', () => {
      // Different references - same shallow values
      expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    })

    it('should return false for arrays with different elements', () => {
      // Different references - different values
      expect(shallowEqual([1, 2], [1, 3])).toBe(false)
    })
  })
  describe('Map', () => {
    it('should handle Map objects correctly', () => {
      const map1 = new Map([['a', 1]])
      const map2 = new Map([['a', 1]])
      // Same reference
      expect(shallowEqual(map1, map1)).toBe(true)
      // Different references - same entries (shallow comparison)
      expect(shallowEqual(map1, map2)).toBe(true)
      // As object properties - compares by reference
      expect(shallowEqual({ data: map1 }, { data: map1 })).toBe(true)
      expect(shallowEqual({ data: map1 }, { data: map2 })).toBe(false)
    })
    it('should return false for Map with different contents', () => {
      const map1 = new Map([['a', 1]])
      const map2 = new Map([['a', 2]]) // Different value
      const map3 = new Map([['b', 1]]) // Different key
      const map4 = new Map([
        ['a', 1],
        ['b', 2],
      ]) // More entries

      expect(shallowEqual(map1, map2)).toBe(false)
      expect(shallowEqual(map1, map3)).toBe(false)
      expect(shallowEqual(map1, map4)).toBe(false)
    })
  })
  describe('Set', () => {
    it('should handle Set objects correctly', () => {
      const set1 = new Set([1, 2, 3])
      const set2 = new Set([1, 2, 3])
      // Same reference
      expect(shallowEqual(set1, set1)).toBe(true)
      // Different references - same values (shallow comparison)
      expect(shallowEqual(set1, set2)).toBe(true)
      // As object properties - compares by reference
      expect(shallowEqual({ items: set1 }, { items: set1 })).toBe(true)
      expect(shallowEqual({ items: set1 }, { items: set2 })).toBe(false)
    })
    it('should return false for Set with different contents', () => {
      const set1 = new Set([1, 2, 3])
      const set2 = new Set([4, 5, 6]) // Completely different
      const set3 = new Set([1, 2]) // Fewer elements
      const set4 = new Set([1, 2, 3, 4]) // More elements

      expect(shallowEqual(set1, set2)).toBe(false)
      expect(shallowEqual(set1, set3)).toBe(false)
      expect(shallowEqual(set1, set4)).toBe(false)
    })
  })
})
