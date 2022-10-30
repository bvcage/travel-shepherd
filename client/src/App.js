import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'

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
            <Route path='/' element={!!user ? <Navigate to='/home' /> : <HomePage />}>
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<Signup />} />
            </Route>
            <Route path='/home' element={!!user ? <LandingPage /> : <Navigate to='/login' />}>
            </Route>
         </Routes>
      </Router>
   );
}

export default App;