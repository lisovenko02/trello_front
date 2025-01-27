import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Loader from '@/components/ui/Loader'

import useTimeBlockDnd from '@/hooks/time-blocking/useTimeBlockDnd'
import useTimeBlocks from '@/hooks/time-blocking/useTimeBlocks'

import TimeBlock from './TimeBlock'
import styles from './TimeBlocking.module.scss'
import calcHoursLeft from './calc-hours-left'

const TimeBlockingList = () => {
	const { isLoading, items, setItems } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

	if (isLoading) return <Loader />

	const { hoursLeft } = calcHoursLeft(items)

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add the first time-block on the right</div>
						)}
					</SortableContext>
				</div>
			</DndContext>

			<div>
				{hoursLeft > 0
					? `${hoursLeft} hours out of 24 left for sleep`
					: 'No hours left for sleep'}
			</div>
		</div>
	)
}

export default TimeBlockingList
