import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import { useEffect, useState } from 'react'
import useLoadSettings from './useLoadSettings'
import { ITimerState } from '@/app/i/timer/timer.types'

const useTimer = (): ITimerState => {
  const { breakInterval, workInterval } = useLoadSettings()

  const [isRunning, setIsRunning] = useState(false)
  const [isBreakTime, setIsBreakTime] = useState(false)

  const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
  const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1)
      }, 1000)
    } else if (!isRunning && secondsLeft !== 0 && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, secondsLeft, workInterval, activeRound])

  useEffect(() => {
    if (secondsLeft > 0) return

    setIsBreakTime(!isBreakTime)
    setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
  }, [secondsLeft, isBreakTime, workInterval, breakInterval])

  return {
    activeRound,
    secondsLeft,
    setActiveRound,
    setIsRunning,
    setSecondsLeft,
    isRunning,
  }
}

export default useTimer
