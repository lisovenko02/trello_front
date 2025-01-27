import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { CSSProperties } from 'react'

const useTimeBlockSortable = (id: UniqueIdentifier) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style: CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  }

  return { attributes, listeners, style, setNodeRef }
}

export default useTimeBlockSortable
