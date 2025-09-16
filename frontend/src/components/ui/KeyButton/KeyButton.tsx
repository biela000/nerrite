import classes from './KeyButton.module.css'

export interface KeyButtonProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function KeyButton({ className, onClick, children }: KeyButtonProps) {
  return (
    <div className={classes.wrapper}>
      <button className={`${classes.button} ${className}`} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}
