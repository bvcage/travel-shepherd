import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'

function Signup (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const [user, setUser] = useState({
      username: !!location.state && !!location.state.username ? location.state.username : "",
      email: "",
      firstName: "",
      lastName: "",
      dob: "",
      password1: !!location.state && !!location.state.password ? location.state.password : "",
      password2: "",
      photoUrl: ""
   })

   function handleChange (e) {
      setUser({...user,
         [e.target.name]: e.target.value
      })
      e.target.parentNode.classList.remove('invalid')
   }

   function handleSubmit (e) {
      e.preventDefault()
      // validate form inputs
      if (!validateRequired(e)) return console.log('missing required inputs')
      if (!validateEmail(e)) return console.log('error with email')
      if (!validatePassword(e)) return console.log('error with password')
      // send to server
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

   function validateEmail (e) {
      let emailValid = true
      const emailItems = e.target.getElementsByClassName('email')
      Object.values(emailItems).forEach(item => {
         const emailInputs = item.getElementsByTagName('input')
         Object.values(emailInputs).forEach(input => {
            const email = input.value
            if (!email.match(/^[A-z]+[A-z0-9.-_]*@[A-z0-9]+.[A-z]{2,}$/)) {
               item.classList.add('invalid')
               emailValid = false
            }
         })
      })
      return emailValid
   }

   function validateRequired (e) {
      let inputsValid = true
      const reqItems = e.target.getElementsByClassName('required')
      Object.values(reqItems).forEach(item => {
         const reqInputs = item.getElementsByTagName('input')
         Object.values(reqInputs).forEach(input => {
            if (!input.value) {
               item.classList.add('invalid')
               inputsValid = false
            }
         })
      })
      return inputsValid
   }

   function validatePassword (e) {
      let passValid = true
      let pass1
      const passItems = e.target.getElementsByClassName('password')
      Object.values(passItems).forEach(item => {
         const passInputs = item.getElementsByTagName('input')
         Object.values(passInputs).forEach(input => {
            const password = input.value
            if (!pass1) pass1 = password
            else {
               if (password !== pass1) {
                  item.classList.add('invalid')
                  console.log('passwords do not match')
                  passValid = false
               }
            }
            if (password.length < 8) {
               item.classList.add('invalid')
               console.log('password is too short')
               passValid = false
            } else if (!password.match(/[A-Z]+/)) {
               item.classList.add('invalid')
               console.log('password is missing uppercase letter')
               passValid = false
            } else if (!password.match(/[a-z]+/)) {
               item.classList.add('invalid')
               console.log('password is missing lowercase letter')
               passValid = false
            } else if (!password.match(/[0-9]+/)) {
               item.classList.add('invalid')
               console.log('password is missing number')
               passValid = false
            } else if (!password.match(/[^A-Za-z0-9.,]+/)) {
               item.classList.add('invalid')
               console.log('password is missing special character')
               passValid = false
            }
         })
      })
      return passValid
   }

   return (
      <form id='signup-form' onSubmit={handleSubmit}>
         <div className='row'>

            <div className='col col-12 col-lg-6'>
               <div className='input form-floating mb-3 required'>
                  <input name='firstName'
                     type='text'
                     className='form-control'
                     placeholder='first'
                     // required={true}
                     value={user.firstName}
                     onChange={handleChange} />
                  <label>first</label>
               </div>
            </div>

            <div className='col col-12 col-lg-6'>
               <div className='input form-floating mb-3 required'>
                  <input name='lastName'
                     type='text'
                     className='form-control'
                     placeholder='last'
                     // required={true}
                     value={user.lastName}
                     onChange={handleChange} />
                  <label>last</label>
               </div>
            </div>

         </div>
         <div className='row'>

            <div className='col col-12'>
               <div className='input form-floating mb-3 required'>
                  <input name='username'
                     type='text'
                     className='form-control'
                     placeholder='username'
                     // required={true}
                     value={user.username}
                     onChange={handleChange} />
                  <label>username</label>
               </div>
            </div>

         </div>
         <div className='row'>

            <div className='col col-12'>
               <div className='input form-floating mb-3 required email'>
                  <input name='email'
                     type='text'
                     className='form-control'
                     placeholder='email'
                     // required={true}
                     value={user.email}
                     onChange={handleChange} />
                  <label>email</label>
               </div>
            </div>

         </div>
         <div className='row'>

            <div className='col col-12 col-xl-6'>
               <div className='input form-floating mb-3 required password'>
                  <input name='password1'
                     type='password'
                     className='form-control'
                     placeholder='password'
                     // required={true}
                     value={user.password1}
                     onChange={handleChange} />
                  <label>password</label>
               </div>
            </div>

            <div className='col col-12 col-xl-6'>
               <div className='input form-floating mb-3 required password'>
                  <input name='password2'
                     type='password'
                     className='form-control'
                     placeholder='confirm password'
                     // required={true}
                     value={user.password2}
                     onChange={handleChange} />
                  <label>confirm password</label>
               </div>
            </div>

         </div>
         <div className='row'>

            {/* <div className='col col-sm-12'>
               <input name='dob'
                  className='input form-control mb-3'
                  type='date'
                  value={user.dob}
                  onChange={handleChange} />
            </div> */}

            <div className='col col-12'>
               <div className='input form-floating mb-3'>
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
            <div className='col'>
               
               <BackBtn />
               <button type='submit' className='btn btn-primary'>sign up</button>

            </div>
         </div>

      </form>
   )
}

export default Signup