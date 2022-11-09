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

   function checkUsername (e, username = login.username) {
      if (!!username) {
         fetch(`/users/exist?username=${username}`).then(r=>{
            if (username === '') setUserExists(true)
            else if (r.ok) setUserExists(true)
            else if (r.status === 404) setUserExists(false)
            else console.log(r)
         })
      }
   }

   let timeout
   function handleChange (e) {
      if (!!timeout) clearTimeout(timeout)
      setLogin({...login,
         [e.target.name]: e.target.value
      })
      if (e.target.name === 'username') {
         if (e.target.value === '') setUserExists(true)
         else timeout = setTimeout(() => checkUsername(e, e.target.value), 1000)
      }
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (!userExists) return navigate('signup', {state: {'username': login.username, 'password': login.password}})
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
         else {
            switch (r.status) {
               case 401:
                  r.json().then(console.log)
                  const inputs = e.target.getElementsByClassName('form-floating')
                  inputs[1].classList.add('invalid')
                  setTimeout(() => inputs[1].classList.remove('invalid'), 2000)
                  break
               default:
                  console.log(r.json())
            }
         }
      })
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className='form-floating mb-3'>
            <input name='username'
               type='text'
               className='form-control'
               placeholder='username'
               value={login.username}
               onBlur={checkUsername}
               onChange={handleChange} />
            <label>username</label>
         </div>

         <div className='form-floating mb-3'>
            <input name='password'
               type='password'
               className='form-control'
               placeholder='password'
               value={login.password}
               onChange={handleChange} />
            <label>password</label>
         </div>

         <button type='submit' className='btn btn-primary'>{!!userExists ? 'login' : 'sign up'}</button>
      </form>
   )
}

export default Login