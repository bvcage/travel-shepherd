import React from 'react'
import { useNavigate } from 'react-router-dom'
import InviteCard from '../cards/InviteCard'

function InvitesContainer (props) {
   const { invites, mayInvite } = props

   const navigate = useNavigate()

   const cards = !!invites ? invites.map(invite => {
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

export default InvitesContainer