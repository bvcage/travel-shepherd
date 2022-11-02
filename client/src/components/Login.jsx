import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [login, setLogin] = useState({
      username: "",
      password: ""
   })
   const [userExists, setUserExists] = useState(true)

   function checkUsername () {
      fetch(`/users/exist?username=${login.username}`).then(r=>{
         if (r.ok) setUserExists(true)
         else if (r.status === 404) setUserExists(false)
         else console.log(r)
      })
   }

   function handleChange (e) {
      setLogin({...login,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (!userExists) return navigate('../signup', {state: {'username': login.username, 'password': login.password}})
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...login})
      }).then(r=>{
         if (r.ok) r.json().then(user => {
            dispatch({type: 'user/userLoggedIn', payload: user})
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/home')
         })
         else console.log(r)
      })
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>

            <h2>login</h2>

            <input name='username'
               type='text'
               placeholder='username'
               value={login.username}
               onBlur={checkUsername}
               onChange={handleChange} />

            <input name='password'
               type='password'
               placeholder='password'
               value={login.password}
               onChange={handleChange} />

            <button type='submit'>{!!userExists ? 'login' : 'sign up'}</button>
         </form>
      </div>
   )
}

export default Login