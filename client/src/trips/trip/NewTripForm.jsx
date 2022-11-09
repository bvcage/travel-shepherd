import '../../assets/css/forms.css'
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
      setTrip({...trip, 
         [e.target.name]: e.target.value
      })
      switch (e.target.name) {
         case 'allowProposals':
         case 'votingType':
            e.target.parentNode.parentNode.classList.remove('invalid')
            break
         default:
            e.target.parentNode.classList.remove('invalid')
      }
   }

   function createTrip (e) {
      e.preventDefault()
      // validate input
      if (!validateRequired(e)) return console.log('missing required input')
      // create post object
      console.log(trip)
      const post = {
         ...trip,
         'allow_proposals': trip.allowProposals === 'true' ? true : false,
         'num_days': trip.numDays ? parseInt(trip.numDays) : null,
         'voting_type_name': trip.votingType.split(' ')[0],
         'voting_type_value': parseInt(trip.votingType.split(' ')[1])
      }
      delete post['allowProposals']
      delete post['numDays']
      delete post['votingType']
      // post to database
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

   function validateRequired (e) {
      let reqValid = true
      const reqItems = e.target.getElementsByClassName('required')
      Object.values(reqItems).forEach(item => {
         const reqInputs = item.getElementsByTagName('input')
         Object.values(reqInputs).forEach(input => {
            switch (input.name) {
               case 'allowProposals':
                  if (trip.allowProposals === '') {
                     item.classList.add('invalid')
                     reqValid = false
                  }
                  break
               case 'votingType':
                  if (trip.votingType === '') {
                     item.classList.add('invalid')
                     reqValid = false
                  }
                  break
               default:
                  if (!input.value) {
                     item.classList.add('invalid')
                     reqValid = false
                  }
            }
         })
      })
      return reqValid
   }

   return (
      <form id='new-trip-form' onSubmit={createTrip}>
         <div className='container'>
            <h2>create new trip</h2>

            <div className='row'>
               <div className='col'>

                  <div className='input-group'>

                     <div className='form-floating required'>
                        <input name='name'
                           type='text'
                           className='form-control'
                           placeholder='group name'
                           // required={true}
                           value={trip.name}
                           onChange={handleChange} />
                        <label>group name</label>
                     </div>

                     <span className='input-group-text'>Trip</span>

                  </div>

               </div>
            </div>
            <div className='row'>
               <div className='col'>

                  <div className='form-floating'>
                     <input name='numDays'
                        type='number'
                        className='form-control'
                        placeholder='est. number of days'
                        value={trip.num_days}
                        onChange={handleChange} />
                     <label>est. number of days</label>
                  </div>

               </div>
            </div>
            <div className='row required'>
               <div className='col col-6 vote-label-col'>

                  <label>allow proposals?</label>

               </div>
               <div className='col vote-btn-col'>
                  
                     <input id='allow-proposals-yes'
                        name='allowProposals'
                        type='radio'
                        className='btn-check'
                        value={true}
                        onChange={handleChange} />
                     <label
                        className='btn btn-outline-primary'
                        htmlFor='allow-proposals-yes'
                        >yes</label>
                  
                     <input id='allow-proposals-no'
                        name='allowProposals'
                        type='radio'
                        className='btn-check'
                        value={false}
                        onChange={handleChange} />
                     <label
                        className='btn btn-outline-primary'
                        htmlFor='allow-proposals-no'
                        >no</label>

               </div>
            </div>

            <div className='row required'>
               <div className='col col-6 vote-label-col'>

                  <label>voting type</label>

               </div>
               <div className='col vote-btn-col required'>

                     <input id='voting-type-pick-1'
                        name='votingType'
                        type='radio'
                        className='btn-check'
                        value='pick 1'
                        onChange={handleChange} />
                     <label
                        className='btn btn-outline-primary'
                        htmlFor='voting-type-pick-1'
                        >pick 1</label>

                     <input id='voting-type-rank-3'
                        name='votingType'
                        type='radio'
                        className='btn-check'
                        value='rank 3'
                        onChange={handleChange} />
                     <label
                        className='btn btn-outline-primary'
                        htmlFor='voting-type-rank-3'
                        >rank</label>

               </div>
            </div>

            <button type='submit' className='btn btn-primary'>+ create group</button>

         </div>
      </form>
   )
}

export default NewTripForm