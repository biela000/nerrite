import classes from './KeyButton.module.css'

export interface KeyButtonProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  buttonRef?: React.RefObject<HTMLButtonElement>
}

export default function KeyButton({
  className,
  onClick,
  children,
  buttonRef
}: KeyButtonProps) {
  return (
    <div className={classes.wrapper}>
      <button
        className={`${classes.button} ${className}`}
        onClick={onClick}
        ref={buttonRef}
      >
        {children}
      </button>
    </div>
  )
}
