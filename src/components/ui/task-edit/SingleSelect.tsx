import useOutside from '@/hooks/useOutside'
import { Badge } from '../Badge'
import { X } from 'lucide-react'
import cn from 'clsx'

interface IOption {
  label: string
  value: string
}

interface ISingleSelect {
  data: IOption[]
  onChange: (value: string) => void
  value: string
  isColorSelect?: boolean
}

const SingleSelect = ({
  data,
  onChange,
  value,
  isColorSelect,
}: ISingleSelect) => {
  const { isShow, setIsShow, ref } = useOutside(false)

  const getValue = () => data.find((item) => item.value === value)?.value

  return (
    <div
      ref={ref}
      className={cn('relative min-w-36', {
        'w-max': isColorSelect,
      })}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShow(!isShow)
        }}
      >
        {getValue() ? (
          <Badge
            variant={value}
            className="capitalize"
            style={isColorSelect ? { backgroundColor: value } : {}}
          >
            {getValue()}
          </Badge>
        ) : (
          <Badge>Click for select</Badge>
        )}
      </button>

      {value && (
        <button
          onClick={(e) => {
            e.preventDefault()
            onChange('')
          }}
          className="absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      )}

      {isShow && (
        <div
          className={cn(
            'absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg'
          )}
          style={{
            top: 'calc(100% + .5rem)',
          }}
        >
          {data.map((item) => (
            <button
              key={item.value}
              onClick={(e) => {
                e.preventDefault()
                onChange(item.value)
                setIsShow(false)
              }}
              className="block mb-4 last:mb-0 capita rounded-lg"
              style={isColorSelect ? { backgroundColor: item.value } : {}}
            >
              <Badge variant={item.value}>{item.label}</Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SingleSelect
