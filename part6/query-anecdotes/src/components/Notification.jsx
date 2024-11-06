import { useContext } from "react"
import NotificationContext from "../Context/NotificationContext"

const Notification = () => {

  const [alert, alertDispatch] = useContext(NotificationContext)

  if(alert===null) return null

  return (
    <div>
      {alert}
    </div>
  )
}

export default Notification
