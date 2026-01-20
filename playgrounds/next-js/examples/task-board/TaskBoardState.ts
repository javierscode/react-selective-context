export type Task = {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}

export type TaskBoardState = {
  tasks: Task[]
  filter: 'all' | 'todo' | 'in-progress' | 'done'
  searchQuery: string
}

export const initialTaskBoardState: TaskBoardState = {
  tasks: [
    { id: '1', title: 'Design new landing page', status: 'todo', priority: 'high' },
    { id: '2', title: 'Fix navigation bug', status: 'in-progress', priority: 'medium' },
    { id: '3', title: 'Write unit tests', status: 'todo', priority: 'low' },
    { id: '4', title: 'Update documentation', status: 'done', priority: 'low' },
    { id: '5', title: 'Code review PR #42', status: 'in-progress', priority: 'high' },
  ],
  filter: 'all',
  searchQuery: '',
}

export const updateFilter =
  (filter: TaskBoardState['filter']) => (prevState: TaskBoardState) => ({
    ...prevState,
    filter,
  })

export const updateSearchQuery =
  (searchQuery: TaskBoardState['searchQuery']) => (prevState: TaskBoardState) => ({
    ...prevState,
    searchQuery,
  })

export const updateTaskStatus =
  (taskId: Task['id'], status: Task['status']) => (prevState: TaskBoardState) => ({
    ...prevState,
    tasks: prevState.tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    ),
  })

export const deleteTask = (taskId: Task['id']) => (prevState: TaskBoardState) => ({
  ...prevState,
  tasks: prevState.tasks.filter((task) => task.id !== taskId),
})

export const addTask = (task: Task) => (prevState: TaskBoardState) => ({
  ...prevState,
  tasks: [...prevState.tasks, task],
})
