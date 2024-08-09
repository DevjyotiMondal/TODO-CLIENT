
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'



function App() {


  return (
    <>
    <Routes>
      <Route element={<Signup></Signup>} path='/signup'></Route>
      <Route element={<Login></Login>} path='/login'></Route>
      
         <Route element={<Home></Home>} path='/'></Route>
       
      

    </Routes>
        
    </>
  )
}

export default App
