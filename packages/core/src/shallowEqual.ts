/**
 * Performs a shallow equality comparison between two values.
 *
 * Handles the following types:
 * - Primitives (number, string, boolean, bigint, symbol): compared by value using Object.is()
 * - null/undefined: compared by reference using Object.is()
 * - NaN: correctly handled (NaN === NaN returns true)
 * - Functions: compared by reference
 * - Objects/Arrays: compared by shallow key-value equality
 * - Date: compared by timestamp value
 * - RegExp: compared by source pattern and flags
 * - Map: compared by shallow key-value equality of entries
 * - Set: compared by shallow equality of values
 */
export const shallowEqual = <T>(a: T, b: T): boolean => {
  // Object.is handles:
  // - Same reference (objects, arrays, functions)
  // - Same primitive value (number, string, boolean, bigint, symbol)
  // - Special cases: NaN === NaN (true), +0 !== -0
  if (Object.is(a, b)) return true

  // If either value is null, undefined, or a primitive (not an object),
  // and they weren't caught by Object.is above, they're not equal.
  // This also catches: function !== function (different references)
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Handle Date objects - compare by timestamp
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  // Handle RegExp objects - compare by source and flags
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags
  }

  // Handle Map objects - compare entries shallowly
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false
    for (const [key, value] of a) {
      if (!b.has(key) || !Object.is(value, b.get(key))) {
        return false
      }
    }
    return true
  }

  // Handle Set objects - compare values shallowly
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false
    for (const value of a) {
      if (!b.has(value)) {
        return false
      }
    }
    return true
  }

  // At this point, both a and b are plain objects or arrays
  // We compare their enumerable own properties
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  // Different number of keys = not equal
  if (keysA.length !== keysB.length) return false

  // Check each key exists in both objects and has the same value (by reference)
  // This means nested objects/arrays are compared by reference, not deep equality
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    ) {
      return false
    }
  }

  return true
}
