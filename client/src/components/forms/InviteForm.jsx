import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function InviteForm (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const user = useSelector(state => state.user)

   const initialInvite = {
      name: "",
      email: "",
      sender_user_id: user.id,
      invite_status_id: 1  // pending
   }

   const [invite, setInvite] = useState(initialInvite)
   const [inviteList, setInviteList] = useState([])
   const [invites, setInvites] = useState([])
   const [statusList, setStatusList] = useState([])
   const [trip, setTrip] = useState({})

   useEffect(() => {
      // get invite status list
      fetch('/invite_statuses').then(r=>{
         if (r.ok) r.json().then(setStatusList)
         else console.log(r)
      })
      // get trip info
      if (!!props.trip) setTrip(props.trip)
      else if (!!location.state && !!location.state.trip) setTrip(location.state.trip)
      else if (!!params.id) fetch(`/trips/${params.id}`).then(r=>{
         if (r.ok) r.json().then(setTrip)
         else console.log(r)
      })
      // get invite info
      if (!!props.invites) setInvites(props.invites)
      // else if (!!location.state && !!location.state.invites) setInvites(location.state.invites)
      else if (!!params.id) fetch(`/trips/${params.id}/invites`).then(r=>{
         if (r.ok) r.json().then(setInvites)
         else console.log(r)
      })
   }, [props, location, params])

   useEffect(() => {
      const users = !!trip.travelers ? trip.travelers.map(traveler => traveler.user) : null

      const initialInviteList = !!users ? users.map(user => {
         return {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            status: 2   // confirmed
         }
      }) : []
   
      if (!!invites[0]) initialInviteList.push(...invites.map(invite => {
         return {
            name: invite.user.full_name,
            email: invite.user.email,
            status: invite.invite_status.id
         }
      }))

      setInviteList(initialInviteList)

   }, [trip.travelers, invites])

   function handleChange (e) {
      setInvite({...invite,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      fetch('/invites', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...invite,
            'trip_id': trip.id,
            'user_email': invite.email      
         })
      }).then(r=>{
         if (r.ok) r.json().then(dbInv => {
            setInviteList([...inviteList, invite])
            setInvite(initialInvite)
         })
         else r.json().then(console.log)
      })
      e.preventDefault()
   }

   const invitesDisplay = inviteList.map((invite, i) => {
      let status = statusList.find(status => status.id === invite.status)
      status = !!status && !!status.name ? status.name : 'sent'
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

            <button type='button' disabled={true}>{status}</button>
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