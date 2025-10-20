import { BrowserRouter as Router } from 'react-router-dom'
import './Styles/App.css'
import AppWrapper from './Wrappers/AppWrapper'

function App() {

  return (
    <Router>
      <div className='bg-primary text-gray-100 min-h-screen'>
        <AppWrapper />
         
      </div>
      
    </Router>
    
  )
}

export default App
