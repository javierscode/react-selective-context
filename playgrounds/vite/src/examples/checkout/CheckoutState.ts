export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type ShippingInfo = {
  fullName: string
  email: string
  address: string
  city: string
  zipCode: string
}

export type CheckoutState = {
  items: CartItem[]
  shipping: ShippingInfo
  promoCode: string | null
  promoDiscount: number
  step: 'cart' | 'shipping' | 'confirmation'
}

export const initialCheckoutState: CheckoutState = {
  items: [
    {
      id: '1',
      name: 'Mechanical Keyboard',
      price: 149.99,
      quantity: 1,
      image: '⌨️',
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 79.99,
      quantity: 2,
      image: '🖱️',
    },
    {
      id: '3',
      name: 'USB-C Hub',
      price: 49.99,
      quantity: 1,
      image: '🔌',
    },
  ],
  shipping: {
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  },
  promoCode: null,
  promoDiscount: 0,
  step: 'cart',
}
export const PROMO_CODES: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  HALF: 0.5,
}

export const updateStep =
  (step: CheckoutState['step']) => (prevState: CheckoutState) => ({
    ...prevState,
    step,
  })

export const updateShippingField =
  (field: keyof ShippingInfo, value: string) => (prevState: CheckoutState) => ({
    ...prevState,
    shipping: { ...prevState.shipping, [field]: value },
  })

export const checkValidPromoCode = (promoCode: string) =>
  PROMO_CODES[promoCode.toUpperCase().trim()] !== undefined

export const addPromoCode = (promoCode: string) => (prevState: CheckoutState) => ({
  ...prevState,
  promoCode,
  promoDiscount: PROMO_CODES[promoCode],
})

export const removePromoCode = () => (prevState: CheckoutState) => ({
  ...prevState,
  promoCode: null,
  promoDiscount: 0,
})
