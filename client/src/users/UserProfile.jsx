import './users.css'
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
      <div className='container'>
         <div className='row' id='user-profile-container'>
            <div className='col col-12 col-md-4'>
               {!!user.photo_url ? <img src={user.photo_url} alt={`${user.username} avatar`} /> : null}
               <h2>{user.username}</h2>
               <button type='button'
                  className='btn btn-secondary'
                  onClick={() => navigate('edit')}
                  >edit</button>
            </div>
            <div className='col col-12 col-md-8'>
               <h3>{user.first_name} {user.last_name}</h3>
               <h4>birthday: {user.date_of_birth}</h4>
               <h4>email: {user.email}</h4>
            </div>
            <div className='col col-12'></div>
         </div>
         <br />
      </div>
   )
}

export default UserProfile