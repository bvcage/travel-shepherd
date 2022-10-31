import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function InviteTravelersForm (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const trip = location.state.trip
   const [invite, setInvite] = useState({
      name: "",
      email: ""
   })
   const [inviteList, setInviteList] = useState([])

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

   const invites = !!inviteList ? inviteList.map((invite, i) => {
      return (
         <div key={'invite' + i}>
            <input name='name'
               type='text'
               disabled='true'
               value={invite.name} />

            <input name='email'
               type='text'
               disabled='true'
               value={invite.email} />

            <button disabled type='button'>sent</button>
         </div>
      )
   }) : null

   return (<>
      <h2>invite your companions</h2>
      {invites}
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
      <button type='button' onClick={() => navigate('../../' + trip.id)}>continue</button>
   </>)
}

export default InviteTravelersForm