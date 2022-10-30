import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const selectUser = state => state.user

function UserEditForm (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const user = useSelector(selectUser)
   const [edit, setEdit] = useState({...user})

   function handleChange (e) {
      setEdit({...user,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch(`/users/${edit.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(edit)
      }).then(r=>{
         if (r.ok) r.json().then(user => {
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/home/' + user.username, {state: {user: user}})
         })
         else console.log(r)
      })
   }

   return (
      <form onSubmit={handleSubmit}>
         <h2>edit profile</h2>

         <label>username:</label>
         <input name='username'
            type='text'
            placeholder='first'
            value={edit.username}
            disabled={true} />

         <br />
         
         <label>name:</label>
         <input name='first_name'
            type='text'
            placeholder='first'
            value={edit.first_name}
            onChange={handleChange} />

         <input name='last_name'
            type='text'
            placeholder='last'
            value={edit.last_name}
            onChange={handleChange} />
         
         <br />

         <label>email:</label>
         <input name='email'
            type='text'
            placeholder='email'
            value={edit.email}
            onChange={handleChange} />

         <br />

         <label>birthday:</label>
         <input name='date_of_birth'
            type='date'
            value={edit.date_of_birth}
            onChange={handleChange} />

         <br />

         <label>photo:</label>
         <input name='photo_url'
            type='url'
            placeholder='photo url'
            value={edit.photo_url}
            onChange={handleChange} />

         <button type='submit'>save</button>
      </form>
   )
}

export default UserEditForm