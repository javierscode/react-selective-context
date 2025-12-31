# react-selective-context

[![npm version](https://img.shields.io/npm/v/react-selective-context.svg)](https://www.npmjs.com/package/react-selective-context)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-selective-context)](https://bundlephobia.com/package/react-selective-context)
[![license](https://img.shields.io/npm/l/react-selective-context.svg)](https://github.com/javierscode/react-selective-context/blob/main/LICENSE)

Lightweight React state management library built on Context API and `useSyncExternalStore`. Type-safe, SSR-ready, and optimized for minimal re-renders.

Perfect for managing state in specific sections of your app without prop drilling through multiple component layers.

## Features

- 🪶 **Lightweight** — Minimal footprint with zero dependencies
- 🔒 **Type-safe** — Full TypeScript support out of the box
- ⚡ **Optimized** — Shallow comparison prevents unnecessary re-renders
- 🌐 **SSR Ready** — Built-in support for server-side rendering
- 🎯 **Selective Updates** — Components only re-render when their selected state changes
- 🧩 **Scoped State** — Manage state for specific features or sections, not just global app state

## When to Use This Library

This library shines when you have a **feature or section** of your app where:

- Multiple components at different nesting levels need access to the same state
- You want to avoid passing props through intermediate components (prop drilling)
- The state is scoped to that feature, not the entire application

**Examples:**

- A multi-step checkout flow
- A complex form with multiple sections
- A dashboard panel with interconnected widgets
- A modal or drawer with nested interactive components

## Installation

```bash
npm install react-selective-context
```

## Quick Start

Let's build a checkout form where multiple nested components need access to cart and shipping data — without passing props through every layer.

### 1. Define your state and create a context

```tsx
import {
  createSelectiveContext,
  SelectiveProvider,
  createContextSelector,
  createContextSetter,
} from 'react-selective-context'

// Define your feature state type
type CheckoutState = {
  items: Array<{ id: string; name: string; price: number; quantity: number }>
  shipping: { address: string; city: string; zipCode: string }
  promoCode: string | null
}

// Create a typed context for this feature
const CheckoutContext = createSelectiveContext<CheckoutState>()

// Create hooks bound to this context
const useCheckoutSelector = createContextSelector(CheckoutContext)
const useCheckoutSetter = createContextSetter(CheckoutContext)
```

### 2. Wrap your feature with the provider

```tsx
function CheckoutPage() {
  const initialState: CheckoutState = {
    items: [],
    shipping: { address: '', city: '', zipCode: '' },
    promoCode: null,
  }

  return (
    <SelectiveProvider context={CheckoutContext} initialState={initialState}>
      <CheckoutLayout>
        {/* These components can be deeply nested - no prop drilling needed */}
        <CartSummary />
        <ShippingForm />
        <PromoCodeInput />
        <OrderTotal />
      </CheckoutLayout>
    </SelectiveProvider>
  )
}
```

### 3. Use selectors to read state (from any depth)

```tsx
// Deep inside CartSummary component tree
function CartItemCount() {
  // Only re-renders when items array changes
  const itemCount = useCheckoutSelector((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return <span className='badge'>{itemCount}</span>
}

// Inside ShippingForm, nested several levels deep
function ShippingAddressPreview() {
  // Only re-renders when shipping changes
  const shipping = useCheckoutSelector((state) => state.shipping)

  return (
    <p>
      {shipping.address}, {shipping.city} {shipping.zipCode}
    </p>
  )
}
```

### 4. Use setters to update state (from anywhere)

```tsx
// Deeply nested in the shipping form
function ShippingAddressInput() {
  const setCheckoutState = useCheckoutSetter()
  const address = useCheckoutSelector((state) => state.shipping.address)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutState((prev) => ({
      ...prev,
      shipping: { ...prev.shipping, address: e.target.value },
    }))
  }

  return <input value={address} onChange={handleChange} placeholder='Address' />
}

// In a completely different branch of the component tree
function ApplyPromoButton({ code }: { code: string }) {
  const setCheckoutState = useCheckoutSetter()

  const applyPromo = () => {
    setCheckoutState((prev) => ({ ...prev, promoCode: code }))
  }

  return <button onClick={applyPromo}>Apply</button>
}
```

## API Reference

### `createSelectiveContext<TState>()`

Creates a typed React Context for your feature state.

```tsx
const CheckoutContext = createSelectiveContext<CheckoutState>()
```

### `SelectiveProvider`

Provider component that initializes and manages the store for a specific section of your app.

```tsx
<SelectiveProvider context={CheckoutContext} initialState={initialCheckoutState}>
  <CheckoutFlow />
</SelectiveProvider>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `context` | `SelectiveContext<TState>` | The context created by `createSelectiveContext` |
| `initialState` | `TState` | The initial state value |
| `children` | `ReactNode` | Child components |

### `useContextSelector(context, selector, compare?)`

Hook to select and subscribe to a slice of state.

```tsx
const shipping = useContextSelector(CheckoutContext, (state) => state.shipping)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `context` | `SelectiveContext<TState>` | The state context |
| `selector` | `(state: TState) => TSlice` | Function to select a slice of state |
| `compare` | `(a: TSlice, b: TSlice) => boolean` | Optional comparison function (defaults to shallow equality) |

### `useContextSetter(context)`

Hook to get a setter function for updating state.

```tsx
const setState = useContextSetter(CheckoutContext)

// Update with a function (recommended)
setState((prev) => ({ ...prev, promoCode: 'SAVE20' }))

// Or update with a new state object
setState({ ...newState })
```

### `createContextSelector(context)`

Factory function that creates a pre-bound selector hook for a specific context. Recommended for cleaner component code.

```tsx
const useCheckoutSelector = createContextSelector(CheckoutContext)

// Later in components:
const items = useCheckoutSelector((state) => state.items)
```

### `createContextSetter(context)`

Factory function that creates a pre-bound setter hook for a specific context. Recommended for cleaner component code.

```tsx
const useCheckoutSetter = createContextSetter(CheckoutContext)

// Later in components:
const setCheckoutState = useCheckoutSetter()
```

## Advanced Usage

### Custom Comparison Function

By default, `useContextSelector` uses shallow equality to determine if the selected value has changed. You can provide a custom comparison function:

```tsx
// Deep equality for complex nested objects
const items = useCheckoutSelector(
  (state) => state.items,
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
)

// Strict equality for primitives
const promoCode = useCheckoutSelector((state) => state.promoCode, Object.is)
```

## Multiple Contexts for Different Features

You can create separate contexts for different parts of your application. Each feature manages its own state independently:

```tsx
// features/checkout/context.ts
type CheckoutState = { items: CartItem[]; shipping: ShippingInfo }
export const CheckoutContext = createSelectiveContext<CheckoutState>()
export const useCheckoutSelector = createContextSelector(CheckoutContext)
export const useCheckoutSetter = createContextSetter(CheckoutContext)

// features/user-settings/context.ts
type SettingsState = { theme: 'light' | 'dark'; notifications: boolean }
export const SettingsContext = createSelectiveContext<SettingsState>()
export const useSettingsSelector = createContextSelector(SettingsContext)
export const useSettingsSetter = createContextSetter(SettingsContext)

// Each feature wraps only its own section
function CheckoutPage() {
  return (
    <SelectiveProvider context={CheckoutContext} initialState={checkoutInitialState}>
      <CheckoutFlow />
    </SelectiveProvider>
  )
}

function SettingsPanel() {
  return (
    <SelectiveProvider context={SettingsContext} initialState={settingsInitialState}>
      <SettingsForm />
    </SelectiveProvider>
  )
}
```

## TypeScript

The library is written in TypeScript and provides full type inference:

```tsx
type CheckoutState = {
  items: Array<{ id: string; price: number }>
  promoCode: string | null
}

const CheckoutContext = createSelectiveContext<CheckoutState>()
const useCheckoutSelector = createContextSelector(CheckoutContext)
const useCheckoutSetter = createContextSetter(CheckoutContext)

// ✅ Type-safe selector
const items = useCheckoutSelector((state) => state.items) // type: Array<{ id: string; price: number }>
const promoCode = useCheckoutSelector((state) => state.promoCode) // type: string | null

// ✅ Type-safe setters
const setState = useCheckoutSetter()
setCheckoutState((prev) => ({ ...prev, promoCode: 'SAVE20' })) // ✓ valid
setCheckoutState((prev) => ({ ...prev, invalid: true })) // ✗ TypeScript error
```

## How It Works

This library combines React's Context API with `useSyncExternalStore` to provide efficient state management:

1. **Store Creation** — When `SelectiveProvider` mounts, it creates a store with `getState`, `setState`, and `subscribe` methods
2. **Subscription** — `useContextSelector` subscribes to the store using `useSyncExternalStore`
3. **Selective Updates** — The selector function extracts only the needed state slice
4. **Shallow Comparison** — Changes are detected using shallow equality, preventing unnecessary re-renders
5. **SSR Support** — `getServerSnapshot` provides a consistent snapshot during server-side rendering
