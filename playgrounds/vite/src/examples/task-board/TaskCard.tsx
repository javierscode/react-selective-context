import { useTaskBoardMutation } from './context'
import { deleteTask, updateTaskStatus, type Task } from './TaskBoardState'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const mutate = useTaskBoardMutation()

  const statusColors = {
    todo: 'border-l-slate-500',
    'in-progress': 'border-l-amber-600',
    done: 'border-l-teal-600',
  }

  const priorityBadges = {
    low: 'bg-yellow-600 text-white',
    medium: 'bg-amber-600 text-white',
    high: 'bg-red-600 text-white',
  }

  const statusOptions: Task['status'][] = ['todo', 'in-progress', 'done']

  const handleUpdateTaskStatus = (newStatus: Task['status']) =>
    mutate(updateTaskStatus(task.id, newStatus))

  const handleDeleteTask = () => mutate(deleteTask(task.id))

  return (
    <div
      className={`group relative rounded border border-slate-800 border-l-2
        bg-slate-900/50 p-4 transition-all hover:bg-slate-900
        ${statusColors[task.status]}`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <h3
            className={`font-medium
              ${task.status === 'done' ? 'text-slate-600 line-through' : 'text-slate-200'}`}
          >
            {task.title}
          </h3>
          <div className='mt-2 flex items-center gap-2'>
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium
                ${priorityBadges[task.priority]}`}
            >
              {task.priority}
            </span>
            <select
              value={task.status}
              onChange={(e) => handleUpdateTaskStatus(e.target.value as Task['status'])}
              className='rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs
                text-slate-400 outline-none transition-all focus:border-slate-600'
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'in-progress'
                    ? 'In Progress'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleDeleteTask}
          className='rounded p-2 text-slate-600 opacity-0 transition-all
            hover:bg-slate-800 hover:text-slate-400 group-hover:opacity-100'
        >
          <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
