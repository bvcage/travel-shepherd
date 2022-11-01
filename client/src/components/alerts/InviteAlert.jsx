import React from 'react'
import { useDispatch } from 'react-redux'

function InviteAlert (props) {
   const { invite, onResponse } = props
   const { sender, trip } = invite

   const dispatch = useDispatch()

   function completeInvite (status) {
      fetch(`/invites/${invite.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({'invite_status_id': status})
      }).then(r=>{
         if (r.ok) r.json().then(info => {
            if (status === 2) dispatch({type: 'trips/tripAdded', payload: info.trip})
            onResponse(info)
         })
         else console.log(r)
      })
   }

   return (
      <div className='card'>
         <div className='card-body'>
            <div className='row'>
               <div className='col'>
                  {`${sender.full_name} invites you to join their trip ${trip.name}`}
               </div>
               <div className='col-auto'>
                  <button type='button' onClick={() => {completeInvite(2)}}>accept</button>
                  <button type='button' onClick={() => {completeInvite(3)}}>decline</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InviteAlert