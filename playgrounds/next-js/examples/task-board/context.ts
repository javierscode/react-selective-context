'use client'

import {
  createSelectiveContext,
  createContextSelector,
  createContextSetter,
} from 'react-selective-context'
import { TaskBoardState } from './TaskBoardState'

export const TaskBoardContext = createSelectiveContext<TaskBoardState>()

export const useTaskBoardSelector = createContextSelector(TaskBoardContext)
export const useTaskBoardSetter = createContextSetter(TaskBoardContext)
