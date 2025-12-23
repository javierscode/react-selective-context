import { Badge } from './Badge'

export function Header() {
  return (
    <header className='mb-12 text-center'>
      <h1 className='mb-4 text-4xl font-bold tracking-tight text-slate-100 md:text-5xl'>
        react-state-context
      </h1>
      <p className='mx-auto max-w-2xl text-lg text-slate-400 text-balance'>
        Lightweight state management for React. Perfect for managing state in{' '}
        <span className='text-slate-200'>specific sections</span> of your app without prop
        drilling.
      </p>
      <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
        <Badge icon='🪶' label='Lightweight' />
        <Badge icon='🔒' label='Type-safe' />
        <Badge icon='⚡' label='Optimized' />
        <Badge icon='🎯' label='Selective Updates' />
      </div>
    </header>
  )
}
