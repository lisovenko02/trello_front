'use client'

import Loader from '@/components/ui/Loader'

import useLocalStorage from '@/hooks/useLocalStorage'

import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'
import SwitcherView from './list-view/SwitcherView'

export type TypeView = 'list' | 'kanban'

const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValues: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}

export default TasksView
