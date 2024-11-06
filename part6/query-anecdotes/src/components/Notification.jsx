import { useAlertValue } from "../Context/NotificationContext"

const Notification = () => {

  const alert = useAlertValue()

  if(alert===null) return null

  return (
    <div>
      {alert}
    </div>
  )
}

export default Notification
