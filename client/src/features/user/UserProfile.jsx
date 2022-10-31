import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const selectUser = state => state.user

function UserProfile (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const user = useSelector(selectUser)

   useEffect(() => {
      if (!!location.state && !!location.state.user) {
         dispatch({type: 'user/userUpdated', payload: {...location.state.user}})
      } 
   }, [location, dispatch])

   return (
      <div>
         <h2>{user.username}'s Profile</h2>
         <button onClick={() => navigate('edit')}>edit</button>
         <br />
         {!!user.photo_url ? <img src={user.photo_url} alt={`${user.username} avatar`} /> : null}
         <p>
            {user.first_name} {user.last_name}
            <br />
            birthday: {user.date_of_birth}
            <br />
            email: {user.email}
         </p>
      </div>
   )
}

export default UserProfile