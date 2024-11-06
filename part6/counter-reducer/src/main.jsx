import ReactDOM from 'react-dom/client'
import App from './layout/App'
import './styles/index.css'
import { CounterContextProvider } from './context/CounterContext'

ReactDOM.createRoot(document.getElementById('root')).render(

  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)