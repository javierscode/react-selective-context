'use client'

import { useState } from 'react'
import { useTaskBoardSetter } from './context'
import { addTask, type Task } from './TaskBoardState'

type AddTaskFormState = {
  title: string
  priority: Task['priority']
  isOpen: boolean
}

export function AddTaskForm() {
  const setTaskBoardState = useTaskBoardSetter()
  const [{ title, priority, isOpen }, setState] = useState<AddTaskFormState>({
    title: '',
    priority: 'medium',
    isOpen: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      status: 'todo',
      priority,
    }

    setTaskBoardState(addTask(newTask))
    setState({ title: '', priority: 'medium', isOpen: false })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setState((prev) => ({ ...prev, isOpen: true }))}
        className='cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl
          border-2 border-dashed border-slate-700 py-4 text-slate-500 transition-all
          hover:border-slate-100 hover:text-slate-300'
      >
        <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 4v16m8-8H4'
          />
        </svg>
        Add New Task
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-xl border border-slate-500/30 bg-slate-900/10 p-4'
    >
      <div className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Task title...'
            value={title}
            onChange={(e) => setState((prev) => ({ ...prev, title: e.target.value }))}
            autoFocus
            className='w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3
              text-slate-200 placeholder-slate-500 outline-none transition-all
              focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20'
          />
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-slate-400'>Priority:</span>
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              type='button'
              onClick={() => setState((prev) => ({ ...prev, priority: p }))}
              className={` cursor-pointer rounded-lg px-3 py-1 text-sm font-medium
              transition-all ${
                priority === p
                  ? p === 'high'
                    ? 'bg-red-600 text-white'
                    : p === 'medium'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className='flex gap-2'>
          <button
            type='submit'
            className='cursor-pointer flex-1 rounded-lg bg-amber-700 py-2 font-medium
              text-white transition-all hover:bg-amber-600'
          >
            Add Task
          </button>
          <button
            type='button'
            onClick={() => setState((prev) => ({ ...prev, isOpen: false }))}
            className='cursor-pointer rounded-lg bg-slate-700 px-4 py-2 text-slate-300
              transition-all hover:bg-slate-600'
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
