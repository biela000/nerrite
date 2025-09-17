import classes from './Ners.module.css'
import NersList from './NersList/NersList'

export default function Ners() {
  return (
    <div className={classes.wrapper}>
      <NersList />
      <div>cmd</div>
    </div>
  )
}
