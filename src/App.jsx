import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import { Toaster } from 'react-hot-toast'
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
    
    
  ]
)
function App() {
  
  
  return (
    <>
      <RouterProvider router = {router}></RouterProvider>
      <Toaster></Toaster>
    </>
  )
}

export default App
