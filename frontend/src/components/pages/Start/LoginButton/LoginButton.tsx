import classes from './LoginButton.module.css'
import KeyButton from '../../../ui/KeyButton/KeyButton'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { LoginUser } from '../../../../../wailsjs/go/main/App'
import { DEFAULT_USERNAME, PASSWORD_TIMER } from '../../../../constants'

export interface LoginButtonProps {
  password: string
  buttonTimerAmt: number
  setButtonTimerAmt: React.Dispatch<React.SetStateAction<number>>
}

export default function LoginButton({
  password,
  buttonTimerAmt,
  setButtonTimerAmt,
}: LoginButtonProps) {
  const navigate = useNavigate()

  const handleKeyButtonClick = () => {
    if (buttonTimerAmt > 0) {
      LoginUser(DEFAULT_USERNAME, password).then(() => {
        return navigate('/ners')
      })
    }

    setButtonTimerAmt(PASSWORD_TIMER)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (buttonTimerAmt > 0) {
      timeout = setTimeout(() => {
        setButtonTimerAmt(prevButtonTimerAmt => prevButtonTimerAmt - 1)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [buttonTimerAmt, setButtonTimerAmt])

  return (
    <KeyButton className={classes.button} onClick={handleKeyButtonClick}>
      get in
      <span className={`${classes.timer} ${buttonTimerAmt > 0 && classes.visible}`}>
        {buttonTimerAmt}
      </span>
    </KeyButton>
  )
}
