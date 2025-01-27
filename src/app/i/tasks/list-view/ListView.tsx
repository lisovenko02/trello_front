'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import useTaskDnd from '@/hooks/useTaskDnd'
import useTasks from '@/hooks/useTasks'

import { COLUMNS } from '../columns.data'

import ListRowParent from './ListRowParent'
import styles from './ListView.module.scss'

const ListView = () => {
	const { items, setItems } = useTasks()

	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
				</div>

				<div className={styles.parentsWrapper}>
					{COLUMNS.map(column => (
						<ListRowParent
							items={items}
							setItems={setItems}
							label={column.label}
							value={column.value}
							key={column.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}

export default ListView
