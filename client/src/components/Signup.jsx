import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function Signup (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const [user, setUser] = useState({
      username: !!location.state.username ? location.state.username : "",
      email: "",
      firstName: "",
      lastName: "",
      dob: "",
      password1: !!location.state.password ? location.state.password : "",
      password2: "",
      photoUrl: ""
   })

   function handleChange (e) {
      setUser({...user,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (user.password1 !== user.password2) return console.log('passwords do not match') 
      fetch('/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...user,
            'first_name': user.firstName,
            'last_name': user.lastName,
            'date_of_birth': user.dob,
            'photo_url': user.photoUrl,
            'password': user.password1
         })
      }).then(r=>{
         if (r.ok) r.json().then(user => {
            dispatch({type: 'user/userLoggedIn', payload: user})
            navigate('/')
         })
         else r.json().then(console.log)
      })
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h2>sign up</h2>

            <input name='firstName'
               type='text'
               placeholder='first'
               required={true}
               value={user.firstName}
               onChange={handleChange} />

            <br />

            <input name='lastName'
               type='text'
               placeholder='last'
               required={true}
               value={user.lastName}
               onChange={handleChange} />

            <br />

            <input name='dob'
               type='date'
               value={user.dob}
               onChange={handleChange} />

            <br />
               
            <input name='username'
               type='text'
               placeholder='username'
               required={true}
               value={user.username}
               onChange={handleChange} />

            <br />

            <input name='email'
               type='text'
               placeholder='email'
               required={true}
               value={user.email}
               onChange={handleChange} />

            <br />

            <input name='password1'
               type='password'
               placeholder='password'
               required={true}
               value={user.password1}
               onChange={handleChange} />

            <br />

            <input name='password2'
               type='password'
               placeholder='confirm password'
               required={true}
               value={user.password2}
               onChange={handleChange} />

            <br />

            <input name='photoUrl'
               type='url'
               placeholder='photo url'
               value={user.photoUrl}
               onChange={handleChange} />

            <br />

            <button type='submit'>sign up</button>

         </form>
      </div>
   )
}

export default Signup