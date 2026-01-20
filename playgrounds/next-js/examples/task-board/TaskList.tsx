'use client'

import { useTaskBoardSelector } from './context'
import { TaskCard } from './TaskCard'

export function TaskList() {
  const tasks = useTaskBoardSelector((state) => state.tasks)
  const filter = useTaskBoardSelector((state) => state.filter)
  const searchQuery = useTaskBoardSelector((state) => state.searchQuery)

  const filteredTasks = tasks
    .filter((task) => filter === 'all' || task.status === filter)
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (filteredTasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-slate-500'>
        <svg
          className='h-16 w-16 mb-4 opacity-50'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
        <p className='text-lg'>No tasks found</p>
        <p className='text-sm opacity-70'>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
