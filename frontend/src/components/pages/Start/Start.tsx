import { useEffect, useRef, useState } from 'react'
import classes from './Start.module.css'
import Input from '../../ui/Input/Input'
import { CheckIfUserExists } from '../../../../wailsjs/go/main/App'
import LoginButton from './LoginButton/LoginButton'
import { DEFAULT_USERNAME, PASSWORD_TIMER } from '../../../constants'

export default function Start() {
  const [password, setPassword] = useState('')
  const [userExists, setUserExists] = useState(true)
  const [buttonTimerAmt, setButtonTimerAmt] = useState(0)

  const passwordInput = useRef<HTMLInputElement>(null)
  const loginButton = useRef<HTMLButtonElement>(null)

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        loginButton.current?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      }
    }

    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    CheckIfUserExists(DEFAULT_USERNAME).then(setUserExists)
  }, [CheckIfUserExists, setUserExists])

  useEffect(() => {
    if (buttonTimerAmt === PASSWORD_TIMER) {
      passwordInput.current?.focus()
    } else if (buttonTimerAmt === 0) {
      setPassword('')
    }
  }, [buttonTimerAmt, setPassword, PASSWORD_TIMER])

  return (
    <div className={classes.wrapper}>
      {!userExists &&
        <p className={classes.reminder}>
          if this is your first time, remember the password you input
        </p>
      }
      <LoginButton
        password={password}
        buttonTimerAmt={buttonTimerAmt}
        setButtonTimerAmt={setButtonTimerAmt}
        loginButtonRef={loginButton}
      />
      <Input
        type="password"
        className={`${classes.input} ${buttonTimerAmt && classes.visible}`}
        onChange={handlePasswordChange}
        value={password}
        inputRef={passwordInput}
      />
    </div>
  )
}
