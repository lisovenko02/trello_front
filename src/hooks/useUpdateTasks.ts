import { taskService } from '@/services/task.service'
import { TypeTaskFromState } from '@/types/task.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateTasks = (key?: string) => {
  const queryClient = useQueryClient()

  const { mutate: updateTask } = useMutation({
    mutationKey: ['update task', key],
    mutationFn: ({ id, data }: { id: string; data: TypeTaskFromState }) =>
      taskService.updateTask(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })

  return { updateTask }
}

export default useUpdateTasks
