import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import Template from './pages/Template'
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './features/user/UserProfile'
import UserEditForm from './features/user/UserEditForm'

const selectUser = state => state.user

function App () {
   const [loggedIn, setLoggedIn] = useState(false)

   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) r.json().then(() => setLoggedIn(true))
         else setLoggedIn(false)
      })
   }, [])

   return (
      <Router>
         <Routes>
            <Route path='/' element={loggedIn ? <Navigate to='/:username' /> : <Navigate to='/welcome' />} />
            <Route path='/welcome' element={loggedIn ? <Navigate to='/home' /> : <HomePage />}>
               <Route path='login' element={<Login />} />
               <Route path='signup' element={<Signup />} />
            </Route>
            <Route path='/:username' element={loggedIn ? <Template /> : <Navigate to='/welcome' />}>
               <Route index element={<LandingPage />} />
               <Route path='profile' element={<UserProfile />} />
               <Route path='edit' element={<UserEditForm />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;