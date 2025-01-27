import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'

import KanbanAddRowInput from './KanbanAddRowInput'
import KanbanCard from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanColumn = ({ value, label, items, setItems }: IKanbanColumn) => {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>

						{filterTasks(items, value)?.map((item, index) => {
							console.log('item', item.id)
							return (
								<Draggable
									key={item.id}
									draggableId={item.id}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<KanbanCard
												key={item.id}
												item={item}
												setItems={setItems}
											/>
										</div>
									)}
								</Draggable>
							)
						})}

						{provided.placeholder}

						{value !== 'completed' && !items?.some(item => !item.id) && (
							<KanbanAddRowInput
								setItems={setItems}
								filterDate={
									FILTERS[value] ? FILTERS[value].format() : undefined
								}
							/>
						)}
					</div>

					{/* <div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<KanbanCard
										key={item.id}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== 'completed' && !items?.some(item => !item.id) && (
						<KanbanAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)} */}
				</div>
			)}
		</Droppable>
	)
}

export default KanbanColumn
