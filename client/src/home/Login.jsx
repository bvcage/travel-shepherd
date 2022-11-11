import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [login, setLogin] = useState({
      email: "",
      password: ""
   })
   const [userExists, setUserExists] = useState(true)

   function checkEmail (e, email = login.email) {
      if (!!email) {
         fetch(`/users/exist?email=${email}`).then(r=>{
            if (email === '') setUserExists(true)
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
      if (e.target.name === 'email') {
         if (e.target.value === '') setUserExists(true)
         else timeout = setTimeout(() => checkEmail(e, e.target.value), 1000)
      }
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (!login.email || !userExists) return navigate('signup', {state: {'email': login.email, 'password': login.password}})
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
            navigate('/destinations')
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
         <div className='row'>
            <div className='col'>
               <div className='form-floating mb-3'>
                  <input name='email'
                     type='text'
                     className='form-control'
                     placeholder='email'
                     value={login.email}
                     onBlur={checkEmail}
                     onChange={handleChange} />
                  <label>email</label>
               </div>
            </div>
         </div>

         <div className='row'>
            <div className='col'>
               <div className='form-floating mb-3'>
                  <input name='password'
                     type='password'
                     className='form-control'
                     placeholder='password'
                     value={login.password}
                     onChange={handleChange} />
                  <label>password</label>
               </div>
            </div>
         </div>

         <div className='row btn-row'>
            <div className='col-auto'>
               <button type='submit'
                  className='btn btn-outline-secondary'
                  disabled={!!login.email & !!userExists}
                  >sign up</button>
            </div>
            <div className='col'>
               <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={!userExists}
                  >login</button>
            </div>
         </div>
      </form>
   )
}

export default Login