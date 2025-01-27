import { pomodoroService } from '@/services/pomodoro.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteSession = (OnDeleteSuccess: () => void) => {
  const queryClient = useQueryClient()

  const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete session'],
    mutationFn: (id: string) => pomodoroService.deleteSession(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get today session'],
      })
      OnDeleteSuccess()
    },
  })

  return { deleteSession, isDeletePending }
}

export default useDeleteSession
