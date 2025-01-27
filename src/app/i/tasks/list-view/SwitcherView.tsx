import cn from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'

import { TypeView } from '../TasksView'

interface ISwitcherView {
	type: TypeView
	setType: (value: TypeView) => void
}

const SwitcherView = ({ type, setType }: ISwitcherView) => {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>

			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}

export default SwitcherView
