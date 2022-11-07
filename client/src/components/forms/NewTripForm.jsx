import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function NewTripForm (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const user = useSelector(state => state.user)
   const [trip, setTrip] = useState({
      name: "",
      numDays: "",
      allowProposals: "",
      votingType: "",
      owner_id: user.id
   })

   function handleChange (e) {
      console.log(e.target.value)
      setTrip({...trip, 
         [e.target.name]: e.target.value
      })
   }

   function createTrip (e) {
      e.preventDefault()
      // create post object
      const post = {
         ...trip,
         'allow_proposals': trip.allowProposals ? true : false,
         'num_days': trip.numDays ? parseInt(trip.numDays) : null,
         'voting_type_name': trip.votingType.split(' ')[0],
         'voting_type_value': parseInt(trip.votingType.split(' ')[1])
      }
      delete post['allowProposals']
      delete post['numDays']
      delete post['votingType']
      // post to databaase
      fetch('/trips', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(post)
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

         <div className='input-group'>

            <div className='form-floating'>
               <input name='name'
                  type='text'
                  className='form-control'
                  placeholder='group name'
                  required={true}
                  value={trip.name}
                  onChange={handleChange} />
               <label>group name</label>
            </div>

            <span className='input-group-text'>Trip</span>

         </div>

         <br />

         <div className='form-floating'>
            <input name='numDays'
               type='number'
               className='form-control'
               placeholder='est. number of days'
               value={trip.num_days}
               onChange={handleChange} />
            <label>est. number of days</label>
         </div>

         <br />

         <label>allow proposals?</label>
         <div className='form-check form-check-inline'>
            <input name='allowProposals'
               type='radio'
               className='form-check-input'
               value={true}
               onChange={handleChange} />
            <label className='form-check-label'>yes</label>
         </div>
         <div className='form-check form-check-inline'>
            <input name='allowProposals'
               type='radio'
               className='form-check-input'
               value={false}
               onChange={handleChange} />
            <label className='form-check-label'>no</label>
         </div>

         <br />

         <label>voting type</label>
         <div className='form-check form-check-inline'>
            <input name='votingType'
               type='radio'
               className='form-check-input'
               value='pick 1'
               onChange={handleChange} />
            <label>pick 1</label>
         </div>
         <div className='form-check form-check-inline'>
            <input name='votingType'
               type='radio'
               className='form-check-input'
               value='rank 3'
               onChange={handleChange} />
            <label>rank</label>
         </div>
         
         <br />

         <button type='submit' className='btn btn-primary'>continue</button>

      </form>
   )
}

export default NewTripForm