import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import Template from './pages/Template'
import Login from './components/Login'
import Signup from './components/Signup'
import LandingPage from './pages/LandingPage'

const selectUser = state => state.user

function App () {
   const user = useSelector(selectUser)

   const dispatch = useDispatch()
   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) r.json().then(user => dispatch({type: 'user/userLoggedIn', payload: user}))
      })
   }, [])

   console.log(user)
   return (
      <Router>
         <Routes>
            <Route path='/testing' element={<h1>Test Route</h1>} />
            <Route path='/welcome' element={!!user ? <Navigate to='/home' /> : <HomePage />}>
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<Signup />} />
            </Route>
            <Route path='/' element={!!user ? <Template /> : <Navigate to='/welcome' />}>
               <Route path='home' element={<LandingPage />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;