'use client'

import { Pause, Play, RefreshCcw } from 'lucide-react'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import useCreateSession from '@/hooks/timer/useCreateSession'
import useDeleteSession from '@/hooks/timer/useDeleteSession'
import useTimer from '@/hooks/timer/useTimer'
import useTimerActions from '@/hooks/timer/useTimerActions'
import useTodaySession from '@/hooks/timer/useTodaySession'

import { formatTime } from './format-timer'
import PomodoroRounds from './rounds/PomodoroRounds'

const Pomodoro = () => {
	const timerState = useTimer()
	const { workInterval, isLoading, sessionsResponse } =
		useTodaySession(timerState)
	const rounds = sessionsResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })

	const { isPending, mutate } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	)

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}

			{isLoading ? (
				<Loader />
			) : sessionsResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>
					<button
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionsResponse.data.id)
						}}
						disabled={isDeletePending}
						className='absolute top-0 opacity-40 hover:opacity-90 transition-opacity'
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					disabled={isPending}
					className='mt-1'
				>
					Create session
				</Button>
			)}
		</div>
	)
}

export default Pomodoro
