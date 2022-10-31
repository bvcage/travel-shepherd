import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function InviteForm (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()

   const trip = !!props.trip ? props.trip : (
      !!location.state && !!location.state.trip ? location.state.trip : ""
   )
   const users = !!props.users ? props.users : (
      !!location.state.users ? location.state.users : []
   )

   const initialInviteList = !!users ? users.map(user => {
      return {
         name: `${user.first_name} ${user.last_name}`,
         email: user.email
      }
   }) : []
   const [inviteList, setInviteList] = useState(initialInviteList)
   const [invite, setInvite] = useState({
      name: "",
      email: ""
   })

   function handleChange (e) {
      setInvite({...invite,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      setInviteList([...inviteList, invite])
      setInvite({name: "", email: ""})
   }

   const invitesDisplay = inviteList.map((invite, i) => {
      return (
         <div key={'invite' + i}>
            <input name='name'
               type='text'
               disabled={true}
               value={invite.name} />

            <input name='email'
               type='text'
               disabled={true}
               value={invite.email} />

            <button>invited</button>
         </div>
      )
   })

   return (<>
      {invitesDisplay}

      <form onSubmit={handleSubmit}>

         <input name='name'
            type='text'
            placeholder='name'
            value={invite.name}
            onChange={handleChange} />

         <input name='email'
            type='text'
            placeholder='email'
            value={invite.email}
            onChange={handleChange} />

         <button type='submit'>invite</button>
         
      </form>

      <button type='button' onClick={() => navigate('../')}>continue</button>

   </>)
}

export default InviteForm