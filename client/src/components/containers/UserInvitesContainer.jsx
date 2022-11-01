import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import InviteAlert from '../alerts/InviteAlert'

function UserInvitesContainer (props) {
   const { pendingOnly } = props
   const user = useSelector(state => state.user)
   const [invites, setInvites] = useState([])

   useEffect(() => {
      if (!!props.invites) setInvites(props.invites)
      else if (!!user.id) fetch(`/users/${user.id}/invites`).then(r=>{
         if (r.ok) r.json().then(setInvites)
         else console.log(r)
      })
   }, [props, user])

   function handleResponse (res) {
      setInvites([...invites.filter(invite => invite.id !== res.id)])
   }

   const alerts = !!invites[0] ? invites.filter(invite => pendingOnly ? invite.invite_status.id === 1 : invite).map(invite => {
      return (
         <InviteAlert key={invite.id} invite={invite} onResponse={handleResponse} />
      )
   }) : null

   return (
      <div>
         <h4>UserInvitesContainer</h4>
         {alerts}
      </div>
   )
}

export default UserInvitesContainer