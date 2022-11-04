import './forms.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BackBtn from '../buttons/BackBtn'
import DeleteModal from '../modals/DeleteModal'

function TripEditForm (props) {

   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const [trip, setTrip] = useState({})

   useEffect(() => {
      if (!!params.id) {
         fetch(`/trips/${params.id}`).then(r=>{
            if (r.ok) r.json().then(trip => setTrip({...trip,
               'start_date': !!trip.start_date ? formatDate(new Date(trip.start_date)) : null,
               'end_date': !!trip.end_date ? formatDate(new Date(trip.end_date)) : null,
               'voting_deadline': !!trip.voting_deadline ? formatDate(new Date(trip.voting_deadline).toLocaleString('en-US'), true) : null
            }))
            else console.log(r)
         })
      }
   }, [params])

   function formatDate (date, includeTime = false) {
      if (typeof date === 'string') date = new Date(date)
      const dd = ('0' + date.getUTCDate()).slice(-2)
      const MM = ('0' + (date.getUTCMonth()+1)).slice(-2)
      const yyyy = date.getUTCFullYear()
      if (includeTime) {
         const hh = ('0' + date.getHours()).slice(-2)
         const mm = ('0' + date.getMinutes()).slice(-2)
         return `${yyyy}-${MM}-${dd}T${hh}:${mm}`
      } else {
         return `${yyyy}-${MM}-${dd}`
      }
   }
   
   function handleChange (e) {
      let num_days = trip.num_days
      let start_date = trip.start_date
      let end_date = trip.end_date
      switch (e.target.name) {
         case 'start_date':
            if (!!end_date) {
               num_days = new Date(end_date) - new Date(e.target.value)
               num_days = Math.floor(num_days / (1000*60*60*24))
            }
            if (!!num_days) {
               num_days = trip.num_days
               let time = new Date(e.target.value).getTime()
               time = time + (num_days * (24*60*60*1000))
               end_date = formatDate(new Date(time))
            }
            setTrip({...trip,
               [e.target.name]: e.target.value,
               'num_days': num_days,
               'end_date': end_date
            })
            break
         case 'end_date':
            if (!!trip.start_date) {
               num_days = new Date(e.target.value) - new Date(trip.start_date)
               num_days = Math.floor(num_days / (1000*60*60*24))
            }
            setTrip({...trip,
               [e.target.name]: e.target.value,
               'num_days': num_days
            })
            break
         case 'num_days':
            console.log(start_date)
            if (!!start_date) {
               let time = (new Date(start_date)).getTime()
               time = time + (e.target.value * (24*60*60*1000))
               end_date = formatDate(new Date(time))
            }
            setTrip({...trip,
               [e.target.name]: e.target.value,
               'end_date': end_date
            })
            break
         case 'allow_proposals':
            setTrip({...trip,
               [e.target.name]: e.target.value === 'yes' ? true : false
            })
            break
         default:
            setTrip({...trip,
               [e.target.name]: e.target.value
            })
      }
   }

   function handleDelete () {
      if (parseInt(params.id) !== parseInt(trip.id)) return console.log('error: url & trip id do not match')
      fetch(`/trips/${params.id}`, {
         method: 'DELETE'
      }).then(() => {
         dispatch({type: 'trips/tripRemoved', payload: trip})
         navigate('/trips')
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      // prepare patch object
      const patch = {...trip,
         'voting_type': Array.isArray(trip.voting_type) ?
         {
            name: trip.voting_type.split(' ')[0],
            value: trip.voting_type.split(' ')[1]
         } : (
            !!trip.voting_type && !!trip.voting_type.id ? {
               name: trip.voting_type.name,
               value: trip.voting_type.value
            } : null
         ),
         'voting_deadline': !!trip.voting_deadline ? (new Date(trip.voting_deadline)).toUTCString() : null
      }
      delete patch['invites']
      delete patch['travelers']
      // update trip
      fetch (`/trips/${params.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(patch)
      }).then(r=>{
         if (r.ok) r.json().then(() => {
            const path = location.pathname.split('/')
            path.pop()
            const back = path.join('/')
            navigate(back)
         })
         else console.log(r)
      })
   }

   const DeleteBtn = () => {
      return (
         <button type='button'
            className='btn'
            data-bs-toggle='modal'
            data-bs-target='#deleteModal'
            >delete</button>
      )
   }

   return (
      <form onSubmit={handleSubmit}>
         <h4>Trip Edit Form</h4>

         <input name='name'
            type='text'
            placeholder='name'
            value={trip.name}
            onChange={handleChange} />

         <br />

         <input name='num_days'
            type='number'
            placeholder='number of days'
            value={trip.num_days}
            onChange={handleChange} />

         <br />

         <label>depart</label>
         <input name='start_date'
            type='date'
            value={trip.start_date}
            onChange={handleChange} />

         <br />

         <label>return</label>
         <input name='end_date'
            type='date'
            min={trip.start_date}
            value={trip.end_date}
            onChange={handleChange} />

         <br />

         <label>voting deadline</label>
         <input name='voting_deadline'
            type='datetime-local'
            max={trip.start_date}
            value={trip.voting_deadline}
            onChange={handleChange} />

         <br />

         <label>allow proposals</label>
         <input name='allow_proposals'
            checked={trip.allow_proposals === true}
            type='radio'
            value='yes'
            id='proposalsYes'
            onChange={handleChange} />
         <label htmlFor='proposalsYes'>yes</label>
         <input name='allow_proposals'
            checked={trip.allow_proposals === false}
            type='radio'
            value='no'
            id='proposalsNo'
            onChange={handleChange} />
         <label htmlFor='proposalsNo'>no</label>

         <br />

         <label>voting type</label>
         <input name='voting_type'
            checked={(!!trip.voting_type &&
               trip.voting_type.name === 'pick' &&
               parseInt(trip.voting_type.value) === 1) ||
               trip.voting_type === 'pick 1'}
            type='radio'
            value='pick 1'
            id='votingPick'
            onChange={handleChange} />
         <label htmlFor='votingPick'>pick 1</label>
         <input name='voting_type'
            checked={(!!trip.voting_type &&
               trip.voting_type.name === 'rank' &&
               parseInt(trip.voting_type.value) === 3) ||
               trip.voting_type === 'rank 3'}
            type='radio'
            value='rank 3'
            id='votingRank'
            onChange={handleChange} />
         <label htmlFor='votingRank'>rank choice</label>

         <br />

         <button type='submit'>save</button>
         <DeleteBtn />
         <BackBtn />
         <DeleteModal record={trip} recordType={'trip'} onConfirm={handleDelete} />
      </form>
   )
}

export default TripEditForm