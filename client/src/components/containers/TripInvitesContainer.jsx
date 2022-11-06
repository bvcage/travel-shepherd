import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InviteCard from '../cards/InviteCard'

function TripInvitesContainer (props) {
   const { mayInvite } = props
   const navigate = useNavigate()
   const user = useSelector(state => state.user)
   const [invites, setInvites] = useState([])

   useEffect(() => {
      if (!!props.invites) setInvites(props.invites)
      else if (!!user.id) fetch(`/users/${user.id}/invites`).then(r=>{
         if (r.ok) r.json().then(invites => setInvites(invites))
      })
   }, [props, user])

   const cards = !!invites ? invites.filter(invite => invite.invite_status.id === 1).map(invite => {
      return (
         <InviteCard key={invite.id} invite={invite} />
      )
   }) : null

   const inviteToggle = (
      <button type='button'
         className='btn btn-primary'
         onClick={() => navigate('invite', {state: {invites: invites}})}
         >+ send invite</button>
   )

   return (
      <div className='container'>
         {cards}
         {mayInvite ? inviteToggle : null}
      </div>
   )
}

export default TripInvitesContainer