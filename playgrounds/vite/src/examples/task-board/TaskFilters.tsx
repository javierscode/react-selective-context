import { useEffect, useState } from 'react'
import { useTaskBoardSelector, useTaskBoardMutation } from './context'
import { updateFilter, updateSearchQuery } from './TaskBoardState'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

export function TaskFilters() {
  const filter = useTaskBoardSelector((state) => state.filter)
  const searchQuery = useTaskBoardSelector((state) => state.searchQuery)
  const mutate = useTaskBoardMutation()

  const [localSearch, setLocalSearch] = useState(searchQuery)
  const debouncedSearchQuery = useDebouncedValue(localSearch, 300)

  // Sincronizar con estado global cuando cambia el debounced
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      mutate(updateSearchQuery(debouncedSearchQuery))
    }
  }, [debouncedSearchQuery, searchQuery, mutate])

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ] as const

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <div className='flex gap-2'>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => mutate(updateFilter(f.value))}
            className={`rounded px-4 py-2 text-sm font-medium transition-all ${
              filter === f.value
                ? 'bg-slate-700 text-slate-100'
                : 'bg-slate-800 text-slate-500 hover:bg-slate-800/80 hover:text-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className='relative flex-1 min-w-[200px]'>
        <input
          type='text'
          placeholder='Search tasks...'
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className='w-full rounded border border-slate-800 bg-slate-900 px-4 py-2 pl-10
            text-slate-200 placeholder-slate-600 outline-none transition-all
            focus:border-slate-600'
        />
        <svg
          className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  )
}
