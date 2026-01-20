'use client'

import { useTaskBoardSelector } from './context'
import { StatCard } from './StatCard'

export function TaskStats() {
  const tasks = useTaskBoardSelector((state) => state.tasks)

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }

  return (
    <div className='grid grid-cols-4 gap-3'>
      <StatCard label='Total' value={stats.total} />
      <StatCard label='To Do' value={stats.todo} />
      <StatCard label='In Progress' value={stats.inProgress} />
      <StatCard label='Done' value={stats.done} />
    </div>
  )
}
