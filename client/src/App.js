import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import Template from './pages/Template'
import Login from './components/Login'
import Signup from './components/Signup'

const selectUser = state => state.user

function App () {
   const user = useSelector(selectUser)
   console.log(user)

   const dispatch = useDispatch()
   useEffect(() => {
      fetch('/auth').then(r=>{
         if (r.ok) r.json().then(user => dispatch({type: 'user/userLoggedIn', payload: user}))
      })
   }, [dispatch])

   return (
      <Router>
         <Routes>
            <Route path='/' element={!!user.id ? <Navigate to='/home' /> : <Navigate to='/welcome' />} />
            <Route path='/welcome' element={!!user.id ? <Navigate to='/home' /> : <HomePage />}>
               <Route path='login' element={<Login />} />
               <Route path='signup' element={<Signup />} />
            </Route>
            <Route path='/home' element={!!user.id ? <Template /> : <Navigate to='/welcome' />}>
               <Route index element={<LandingPage />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;