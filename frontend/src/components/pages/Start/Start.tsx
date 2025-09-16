import { useEffect, useRef, useState } from 'react'
import classes from './Start.module.css'
import KeyButton from '../../ui/KeyButton/KeyButton'
import Input from '../../ui/Input/Input'
import { CheckIfUserExists } from '../../../../wailsjs/go/main/App'

const PASSWORD_TIMER = 5

export default function Start() {
  const [password, setPassword] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const [userExists, setUserExists] = useState(true)
  const [buttonTimerAmt, setButtonTimerAmt] = useState(0)

  const passwordInput = useRef<HTMLInputElement>(null)

  const handleKeyButtonClick = () => {
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
      setButtonTimerAmt(PASSWORD_TIMER)
    } else {
      setPassword('')
    }
  }, [inputVisible, setInputVisible, setPassword, PASSWORD_TIMER])

  useEffect(() => {
    let timeout: number;

    if (buttonTimerAmt === 0) {
      setInputVisible(false)
    } else {
      timeout = setTimeout(() => {
        setButtonTimerAmt(prevButtonTimerAmt => prevButtonTimerAmt - 1)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [buttonTimerAmt, setInputVisible, setButtonTimerAmt])

  return (
    <div className={classes.wrapper}>
      {!userExists &&
        <p className={classes.reminder}>
          if this is your first time, remember the password you input
        </p>
      }
      <KeyButton className={classes.button} onClick={handleKeyButtonClick}>
        get in
        <span className={`${classes.timer} ${buttonTimerAmt > 0 && classes.visible}`}>
          {buttonTimerAmt}
        </span>
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
