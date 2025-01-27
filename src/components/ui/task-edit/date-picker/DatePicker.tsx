import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
// @ts-ignore
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import './DatePicker.scss'
import { formatCaption } from './DatePickerCaption'

import { useState } from 'react'
import { X } from 'lucide-react'
import useOutside from '@/hooks/useOutside'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
  onChange: (value: string) => void
  value: string
  position?: 'left' | 'right'
}

const DatePicker = ({ onChange, value, position = 'right' }: IDatePicker) => {
  const [selected, setSelected] = useState<Date>()
  const { isShow, setIsShow, ref } = useOutside(false)

  const handleDaySelect = (date: Date | undefined) => {
    const ISOdate = date?.toISOString()

    setSelected(date)

    if (ISOdate) {
      onChange(ISOdate)
      setIsShow(false)
    } else {
      onChange('')
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsShow(!isShow)}>
        {value ? dayjs(value).format('LL') : 'Click for select'}
      </button>

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      )}

      {isShow && (
        <div
          className={cn(
            'absolute p-2.5 slide bg-sidebar z-10 shadow-sm rounded-lg',
            position === 'left' ? '-left-4' : '-right-4'
          )}
          style={{
            top: 'calc(100% + .7rem)',
          }}
        >
          <DayPicker
            startMonth={new Date(2023, 0)}
            endMonth={new Date(2054, 11)}
            mode="single"
            defaultMonth={selected}
            selected={selected}
            onSelect={handleDaySelect}
            weekStartsOn={1}
            formatters={{ formatCaption }}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker
