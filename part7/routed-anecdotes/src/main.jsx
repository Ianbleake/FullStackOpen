import ReactDOM from 'react-dom/client'
import App from './Layout/App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)