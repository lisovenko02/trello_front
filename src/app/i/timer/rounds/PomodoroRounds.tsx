import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import styles from './PomodoroRound.module.scss'

type TypePomodoroRounds = {
	rounds: IPomodoroRoundResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: IPomodoroRoundResponse | undefined
}

const PomodoroRounds = ({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: TypePomodoroRounds) => {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false

	const isCanNextRound = rounds ? rounds[rounds.length - 1].isCompleted : false

	return (
		<div className={styles.container}>
			<button
				disabled={!isCanNextRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
				className={styles.button}
			>
				<ChevronLeft size={23} />
			</button>

			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]:
									round.id === activeRound?.id && !round.isCompleted
							})}
						/>
					))}
			</div>

			<button
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
				className={styles.button}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}

export default PomodoroRounds
