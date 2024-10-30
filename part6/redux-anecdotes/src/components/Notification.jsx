import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.alert)

  return (
    <div className={`notification ${notification.type}`} >
      {notification.text}
    </div>
  )
}
export default Notification