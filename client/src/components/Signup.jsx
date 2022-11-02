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
         if (r.ok) r.json().then(newUser => {
            fetch('/login', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  'username': newUser.username,
                  'password': user.password1
               })
            }).then(r=>{
               if (r.ok) r.json().then(user => {
                  dispatch({type: 'user/userLoggedIn', payload: user})
                  navigate('/')
               })
               else console.log(r)
            })
         })
         else r.json().then(console.log)
      })
   }

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>

            <div className='row'>

               <h2>sign up</h2>

            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='firstName'
                        type='text'
                        className='form-control'
                        placeholder='first'
                        required={true}
                        value={user.firstName}
                        onChange={handleChange} />
                     <label>first</label>
                  </div>
               </div>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='lastName'
                        type='text'
                        className='form-control'
                        placeholder='last'
                        required={true}
                        value={user.lastName}
                        onChange={handleChange} />
                     <label>last</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='username'
                        type='text'
                        className='form-control'
                        placeholder='username'
                        required={true}
                        value={user.username}
                        onChange={handleChange} />
                     <label>username</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='email'
                        type='text'
                        className='form-control'
                        placeholder='email'
                        required={true}
                        value={user.email}
                        onChange={handleChange} />
                     <label>email</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='password1'
                        type='password'
                        className='form-control'
                        placeholder='password'
                        required={true}
                        value={user.password1}
                        onChange={handleChange} />
                     <label>password</label>
                  </div>
               </div>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='password2'
                        type='password'
                        className='form-control'
                        placeholder='confirm password'
                        required={true}
                        value={user.password2}
                        onChange={handleChange} />
                     <label>confirm password</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <div className='col-auto'>
                  <input name='dob'
                     type='date'
                     value={user.dob}
                     onChange={handleChange} />
               </div>

               <div className='col'>
                  <div className='form-floating'>
                     <input name='photoUrl'
                        type='url'
                        className='form-control'
                        placeholder='photo url'
                        value={user.photoUrl}
                        onChange={handleChange} />
                     <label>photo url</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <button type='submit' className='btn btn-primary'>sign up</button>

            </div>

         </form>
      </div>
   )
}

export default Signup