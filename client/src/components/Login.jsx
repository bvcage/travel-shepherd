import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function Login (props) {
   const dispatch = useDispatch()
   const [login, setLogin] = useState({
      username: "",
      password: ""
   })

   function handleChange (e) {
      setLogin({...login,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...login})
      }).then(r=>{
         if (r.ok) r.json().then(user => dispatch({type: 'user/userLoggedIn', payload: user}))
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
               onChange={handleChange} />

            <input name='password'
               type='text'
               placeholder='password'
               value={login.password}
               onChange={handleChange} />

            <button type='submit'>login</button>
         </form>
      </div>
   )
}

export default Login