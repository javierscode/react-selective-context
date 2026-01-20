'use client'

import { useCheckoutSelector } from './context'

const steps = [
  { key: 'cart', label: 'Cart', icon: '1' },
  { key: 'shipping', label: 'Shipping', icon: '2' },
  { key: 'confirmation', label: 'Confirm', icon: '✓' },
] as const

export function StepIndicator() {
  const currentStep = useCheckoutSelector((state) => state.step)

  const currentIndex = steps.findIndex((s) => s.key === currentStep)

  return (
    <div className='mb-6 flex items-center justify-center gap-2'>
      {steps.map((step, index) => {
        const isActive = step.key === currentStep
        const isCompleted = index < currentIndex

        return (
          <div key={step.key} className='flex items-center'>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm
              font-medium transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                  : isCompleted
                    ? 'bg-teal-900/50 text-teal-400'
                    : 'bg-slate-800 text-slate-500'
              }`}
            >
              {isCompleted ? '✓' : step.icon}
            </div>
            <span
              className={`ml-2 text-sm ${isActive ? 'text-teal-300' : 'text-slate-500'}`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 w-8
                ${isCompleted ? 'bg-teal-600' : 'bg-slate-700'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
