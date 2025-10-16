import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Components/layout/Navbar/Navbar'
import Footer from '../Components/layout/Footer'

import { routes } from '../routes/Routes'

const AppWrapper = () => {
  return (
    <div className='bg-primary text-gray-100 min-h-screen'>
      <Routes>
        {routes.map(route => {
            return <Route key={route.path} path={route.path} element={route.element} />;
        })}
      </Routes>
    </div>
  )
}

export default AppWrapper
