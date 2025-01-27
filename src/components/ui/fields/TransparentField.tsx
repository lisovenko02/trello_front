import { forwardRef, type InputHTMLAttributes } from 'react'
import cn from 'clsx'

interface ITransparentField extends InputHTMLAttributes<HTMLInputElement> {}

const TransparentField = forwardRef<HTMLInputElement, ITransparentField>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

TransparentField.displayName = 'TransparentField'

export default TransparentField
