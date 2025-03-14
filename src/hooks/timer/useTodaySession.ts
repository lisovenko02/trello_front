import { pomodoroService } from '@/services/pomodoro.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import useLoadSettings from './useLoadSettings'
import { ITimerState } from '@/app/i/timer/timer.types'

const useTodaySession = ({ setActiveRound, setSecondsLeft }: ITimerState) => {
  const { workInterval } = useLoadSettings()

  const {
    data: sessionsResponse,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get today session'],
    queryFn: () => pomodoroService.getTodaySession(),
  })

  const rounds = sessionsResponse?.data.rounds

  useEffect(() => {
    if (isSuccess && rounds) {
      const activeRound = rounds.find((round) => !round.isCompleted)
      setActiveRound(activeRound)

      if (activeRound && activeRound.totalSeconds !== 0) {
        setSecondsLeft(activeRound.totalSeconds)
      }
    }
  }, [isSuccess, rounds])

  return { sessionsResponse, isLoading, refetch, isSuccess, workInterval }
}

export default useTodaySession
