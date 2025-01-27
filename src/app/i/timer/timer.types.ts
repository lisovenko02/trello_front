import { Dispatch, SetStateAction } from 'react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

export interface ITimerState {
	isRunning: boolean
	secondsLeft: number
	activeRound: IPomodoroRoundResponse | undefined

	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
}
