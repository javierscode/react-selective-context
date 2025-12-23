import { StateProvider } from '@javierscode/react-state-context'
import { TaskBoardContext } from './context'
import { initialTaskBoardState } from './TaskBoardState'
import { TaskStats } from './TaskStats'
import { TaskFilters } from './TaskFilters'
import { TaskList } from './TaskList'
import { AddTaskForm } from './AddTaskForm'

export function TaskBoard() {
  return (
    <StateProvider context={TaskBoardContext} initialState={initialTaskBoardState}>
      <div className='rounded border border-slate-800 bg-slate-900/80 p-6'>
        <div className='mb-6 flex items-center gap-3'>
          <div className='rounded bg-amber-600 p-2'>
            <svg
              className='h-6 w-6 text-amber-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
              />
            </svg>
          </div>
          <div>
            <h2 className='text-xl font-bold text-slate-100'>Task Board</h2>
            <p className='text-sm text-slate-500'>
              Components access shared state without prop drilling
            </p>
          </div>
        </div>

        <header className='mb-6'>
          <aside className='mb-6'>
            <TaskStats />
          </aside>
        </header>

        <main>
          <div className='space-y-4'>
            <TaskFilters />
            <TaskList />
            <AddTaskForm />
          </div>
        </main>
      </div>
    </StateProvider>
  )
}
