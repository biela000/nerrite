import classes from './KeyButton.module.css'

export interface KeyButtonProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function KeyButton({ onClick, children }: KeyButtonProps) {
  return (
    <div className={classes.wrapper}>
      <button className={classes.button} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}
