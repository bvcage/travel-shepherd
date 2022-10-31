import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NewTripForm (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [trip, setTrip] = useState({
      name: "",
      numDays: "",
      allowProposals: "",
      votingType: ""
   })

   function handleChange (e) {
      setTrip({...trip, 
         [e.target.name]: e.target.value
      })
   }

   function createTrip (e) {
      e.preventDefault()
      fetch('/trips', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...trip,
            'num_days': trip.numDays,
            'allow_proposals': trip.allowProposals,
            'voting_type': trip.votingType
         })
      }).then(r=>{
         if (r.ok) r.json().then(trip => {
            dispatch({type: 'trips/tripAdded', payload: trip})
            navigate(`/trips/${trip.id}/invite`, {state: {trip: trip}})
         })
         else console.log(r)
      })
   }

   return (
      <form onSubmit={createTrip}>
         <h2>new trip</h2>

         <input name='name'
            type='text'
            placeholder='name'
            value={trip.name}
            onChange={(e) => handleChange(e, 'Trip')} />

         <br />

         <input name='numDays'
            type='number'
            placeholder='number of days'
            value={trip.num_days}
            onChange={(e) => handleChange(e, 'Trip')} />

         <br />

         <label>allow proposals?</label>
         <input name='allowProposals'
            type='radio'
            value={true}
            onSelect={(e) => handleChange(e, 'Trip')} />
               <label>yes</label>
         <input name='allowProposals'
            type='radio'
            value={false}
            onSelect={(e) => handleChange(e, 'Trip')} />
               <label>no</label>

         <br />

         <label>voting type</label>
         <input name='allowProposals'
            type='radio'
            value={1}
            onSelect={(e) => handleChange(e, 'Trip')} />
               <label>pick 1</label>
         <input name='allowProposals'
            type='radio'
            value={2}
            onSelect={(e) => handleChange(e, 'Trip')} />
               <label>rank</label>
         
         <br />

         <button type='submit'>continue</button>

      </form>
   )
}

export default NewTripForm