import {
  createStateContext,
  createStateSelector,
  createStateMutation,
} from '@javierscode/react-state-context'
import { TaskBoardState } from './TaskBoardState'

export const TaskBoardContext = createStateContext<TaskBoardState>()

export const useTaskBoardSelector = createStateSelector(TaskBoardContext)
export const useTaskBoardMutation = createStateMutation(TaskBoardContext)
