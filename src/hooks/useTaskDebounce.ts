import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'
import useUpdateTasks from './useUpdateTasks'
import useCreateTask from './useCreateTask'
import { TypeTaskFromState } from '@/types/task.types'

interface IUseTaskDebounce {
  watch: UseFormWatch<TypeTaskFromState>
  itemId: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
  const { createTask } = useCreateTask()
  const { updateTask } = useUpdateTasks()

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFromState) => {
      createTask(formData)
    }, 444),
    []
  )

  const debouncedUpdateTask = useCallback(
    debounce((formData: TypeTaskFromState) => {
      updateTask({ id: itemId, data: formData })
    }, 444),
    []
  )

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      if (itemId) {
        debouncedUpdateTask({
          ...formData,
          priority: formData.priority || undefined,
        })
      } else {
        debouncedCreateTask(formData)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [watch(), debouncedUpdateTask, debouncedCreateTask])
}
