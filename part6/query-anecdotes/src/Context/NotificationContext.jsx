import { useContext } from "react";
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [alert, alertDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[alert, alertDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useAlertValue = ()=>{
  const alertAndDiscpatch = useContext(NotificationContext)
  return alertAndDiscpatch[0]
}

export const useAlertDispatch = () => {
  const alertAndDiscpatch = useContext(NotificationContext)
  return alertAndDiscpatch[1]
}

export default NotificationContext;
