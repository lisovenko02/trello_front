import React, { Dispatch, SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import styles from './KanbanView.module.scss'

type TypeKanbanAddRowInputProps = {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanAddRowInput = ({
	filterDate,
	setItems
}: TypeKanbanAddRowInputProps) => {
	const addCard = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className='mt-5'>
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}

export default KanbanAddRowInput
