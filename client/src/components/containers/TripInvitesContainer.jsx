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

   const inviteToggle = (<button type='button' onClick={() => navigate('invite', {state: {invites: invites}})}>+ invite</button>)

   return (
      <div>
         <h5>invites container</h5>
         {cards}
         {mayInvite ? inviteToggle : null}
      </div>
   )
}

export default TripInvitesContainer