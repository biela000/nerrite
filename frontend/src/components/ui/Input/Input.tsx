import classes from './Input.module.css'

export interface InputProps {
  className?: string,
  type?: 'text' | 'password' | 'email',
  value?: string,
  placeholder?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  inputRef?: React.Ref<HTMLInputElement>
}

export default function Input({
  className,
  type = 'text',
  value,
  placeholder,
  onChange,
  inputRef,
}: InputProps) {
  return (
    <input
      className={`${classes.input} ${className}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef}
    />
  )
}
