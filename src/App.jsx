
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Applayout from './layouts/Applayout'
import Landingpage from './pages/Landingpage'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'


const router = createBrowserRouter([
  {
    element: <Applayout/> ,
    children: [
      {
        path: '/',
        element: <Landingpage/>,
      },
      {
        path: '/dashboard',
        element: <Dashboard/>,
      },
      {
        path: '/auth',
        element: <Auth/>,
      },
    ],
  }
])

function App() {
  

  return (
    <div className=' text-5xl'>Dixit Thakor</div>
  )
}

export default App
