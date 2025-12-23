import { TaskBoard } from './examples/task-board'
import { Checkout } from './examples/checkout'
import { Header } from './components/Header'
import { SectionHeader } from './components/SectionHeader'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className='min-h-screen bg-slate-950'>
      <div className='mx-auto max-w-6xl px-6 py-12'>
        <Header />

        {/* Key benefit callout */}
        <div
          className='mb-12 rounded border border-slate-800 bg-slate-900/50 p-6 text-center
            text-balance'
        >
          <p className='text-slate-300'>
            <span className='font-semibold text-slate-100'>No prop drilling!</span> Each
            example below wraps a section of the app with{' '}
            <code className='rounded-sm bg-slate-800 px-2 py-0.5 text-sm text-slate-300'>
              StateProvider
            </code>
            . Components at any nesting depth can access and update the shared state
            directly.
          </p>
        </div>

        {/* Examples */}
        <div className='space-y-12'>
          <section>
            <SectionHeader
              title='Task Board Example'
              description='A task management board where stats, filters, and task list all share state. Components update and react to changes without passing props through intermediate layers.'
            />
            <TaskBoard />
          </section>

          <section>
            <SectionHeader
              title='Checkout Flow Example'
              description='Multi-step checkout process where cart, shipping form, promo codes, and order summary share a common state. Perfect example of scoped state for a feature.'
            />
            <Checkout />
          </section>
        </div>

        <Footer />
      </div>
    </div>
  )
}
