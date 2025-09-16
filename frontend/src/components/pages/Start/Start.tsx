import { useEffect, useRef, useState } from 'react'
import classes from './Start.module.css'
import KeyButton from '../../ui/KeyButton/KeyButton'
import Input from '../../ui/Input/Input'
import { CheckIfUserExists } from '../../../../wailsjs/go/main/App'

export default function Start() {
  const [password, setPassword] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const [userExists, setUserExists] = useState(true)

  const passwordInput = useRef<HTMLInputElement>(null)

  const handleKeyButtonClick = () => {
    if (inputVisible) {
    }

    setInputVisible(true)
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    CheckIfUserExists('nerriter').then(setUserExists)
  }, [CheckIfUserExists, setUserExists])

  useEffect(() => {
    if (inputVisible) {
      passwordInput.current?.focus()

      setTimeout(() => {
        setInputVisible(false)
      }, 5000)
    } else {
      setPassword('')
    }
  }, [inputVisible, setInputVisible, setPassword])

  return (
    <div className={classes.wrapper}>
      {(!userExists &&
        <p className={classes.reminder}>
          if this is your first time, remember the password you input
        </p>
      )}
      <KeyButton onClick={handleKeyButtonClick}>
        get in
      </KeyButton>
      <Input
        type="password"
        className={`${classes.input} ${inputVisible && classes.visible}`}
        onChange={handlePasswordChange}
        value={password}
        inputRef={passwordInput}
      />
    </div>
  )
}
