import { BrowserRouter as Router } from 'react-router-dom'
import './Styles/App.css'
import AppWrapper from './Wrappers/AppWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthRedirect from './hooks/protectedRoutes';


function App() {
  

  return (
    <Router>
      <div className='bg-primary text-gray-100 min-h-screen'>
        <AppWrapper />
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
