import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/forms.css'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BackBtn from '../../components/buttons/BackBtn'
import DeleteModal from '../../components/modals/DeleteModal'

function EditTripForm (props) {

   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const [trip, setTrip] = useState({})

   useEffect(() => {
      if (!!params.id) {
         fetch(`/trips/${params.id}`).then(r=>{
            if (r.ok) r.json().then(trip => {
               Object.entries(trip).forEach(([key, value]) => {
                  if (value === null) value = ''
                  if (typeof value === 'string' &&
                     value.match(/^([0-9\-]{10})T([0-9:.]{5,})Z$/)) {
                        value = new Date(value)
                     }
                  trip[key] = value
               })
               setTrip({...trip})
            })
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
               end_date = new Date(time)
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
               end_date = new Date(time)
            }
            setTrip({...trip,
               [e.target.name]: e.target.value,
               'end_date': end_date
            })
            break
         case 'allow_proposals':
            setTrip({...trip,
               [e.target.name]: (e.target.value === 'yes' ? true : false)
            })
            break
         default:
            setTrip({...trip,
               [e.target.name]: e.target.value
            })
      }
   }

   function handleDatePicker (date, name) {
      // date = date.toISOString()
      setTrip({...trip,
         [name]: date
      })
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
         // 'voting_closes_at': !!trip.voting_closes_at ? (new Date(trip.voting_closes_at)).toUTCString() : null
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
            className='btn btn-outline-danger'
            data-bs-toggle='modal'
            data-bs-target='#deleteModal'
            >delete</button>
      )
   }

   return (
      <form id='edit-trip-form' onSubmit={handleSubmit}>
         <div className='container'>
            <h2>edit trip</h2>

            <h4>trip info</h4>
            <div className='row'>
               <div className='col'>
                  <div className='form-floating'>
                     <input name='name'
                        type='text'
                        className='form-control'
                        placeholder='name'
                        value={!!trip.name ? trip.name : ''}
                        onChange={handleChange} />
                     <label>name</label>
                  </div>
               </div>
            </div>

            <div className='row'>
               <div className='col'>
                  <div className='form-floating'>
                     <input name='start_date'
                        type='date'
                        className='form-control'
                        value={!!trip.start_date ? formatDate(trip.start_date) : ''}
                        onChange={handleChange} />
                     <label>depart</label>
                  </div>
               </div>
               <div className='col'>
                  <div className='form-floating'>
                     <input name='end_date'
                        type='date'
                        className='form-control'
                        min={trip.start_date}
                        value={!!trip.end_date ? formatDate(trip.end_date) : ''}
                        onChange={handleChange} />
                     <label>return</label>
                  </div>
               </div>
               <div className='col'>
                  <div className='form-floating'>
                     <input name='num_days'
                        type='number'
                        className='form-control'
                        placeholder='number of days'
                        value={!!trip.num_days ? trip.num_days : ''}
                        onChange={handleChange} />
                     <label>number of days</label>
                  </div>
               </div>
            </div>

            <h4>voting options</h4>

            <div className='row'>
               <div className='col'>
                  <div className='container-fluid'>
                     <div className='row'>
                        <div className='col col-3 vote-btn-col'>
                           <div className='container vote-btn-container'>
                              <div className='row'>
                                 <div className='col'>

                                    <input id='allow-proposals-yes'
                                       name='allow_proposals'
                                       type='radio'
                                       checked={trip.allow_proposals === true}
                                       className='btn-check'
                                       value='yes'
                                       onChange={handleChange} />
                                    <label
                                       className='btn btn-outline-primary'
                                       htmlFor='allow-proposals-yes'
                                       >yes</label>

                                 </div>
                                 <div className='col'>

                                    <input id='allow-proposals-no'
                                       name='allow_proposals'
                                       type='radio'
                                       checked={trip.allow_proposals === false}
                                       className='btn-check'
                                       value='no'
                                       onChange={handleChange} />
                                    <label
                                       className='btn btn-outline-primary'
                                       htmlFor='allow-proposals-no'
                                       >no</label>

                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='col vote-label-col'>

                           <label htmlFor='allow_proposals'>allow proposals?</label>
                        
                        </div>
                     </div>
                     <div className='row'>
                        <div className='col col-3 vote-btn-col'>
                           <div className='container'>
                              <div className='row'>
                                 <div className='col'>

                                    <input id='voting-type-pick-1'
                                       name='voting_type'
                                       type='radio'
                                       checked={(!!trip.voting_type &&
                                          trip.voting_type.name === 'pick' &&
                                          parseInt(trip.voting_type.value) === 1) ||
                                          trip.voting_type === 'pick 1'}
                                       className='btn-check'
                                       value='pick 1'
                                       onChange={handleChange} />
                                    <label
                                       className='btn btn-outline-primary'
                                       htmlFor='voting-type-pick-1'
                                       >pick 1</label>

                                 </div>
                                 <div className='col'>
                                    
                                    <input id='voting-type-rank-3'
                                       name='voting_type'
                                       type='radio'
                                       checked={(!!trip.voting_type &&
                                          trip.voting_type.name === 'rank' &&
                                          parseInt(trip.voting_type.value) === 3) ||
                                          trip.voting_type === 'rank 3'}
                                       className='btn-check'
                                       value='rank 3'
                                       onChange={handleChange} />
                                    <label
                                       className='btn btn-outline-primary'
                                       htmlFor='voting-type-rank-3'
                                       >rank</label>

                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='col vote-label-col'>

                           <label htmlFor='voting_type'>voting type</label>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <div className='form-control'>
                        <DatePicker
                           dateFormat={
                              !!trip.proposal_voting_opens_at &&
                              trip.proposal_voting_opens_at.getFullYear() === new Date().getFullYear()
                              ? "MMM d @ h aa"
                              : "MMM d, yyyy @ h aa"
                           }
                           // disabled={!!trip.proposal_voting_closes_at && new Date(trip.proposal_voting_closes_at) < new Date()}
                           isClearable={!!trip.proposal_voting_opens_at && trip.proposal_voting_opens_at > Date.now()}
                           // minDate={Date.now()}
                           maxDate={!!trip.proposal_voting_closes_at ? new Date(trip.proposal_voting_closes_at.getTime() - (24*60*60*1000)) : ''}
                           placeholderText='mm/ddd/yyyy @ hh'
                           selected={!!trip.proposal_voting_opens_at ? trip.proposal_voting_opens_at : ''}
                           showTimeSelect={true}
                           timeIntervals={60}
                           onChange={date => handleDatePicker(date, 'proposal_voting_opens_at')}
                        />
                     </div>
                     <label>{trip.allow_proposals ? 'submit proposals by' : 'open proposal voting at' }</label>
                  </div>
               </div>

               <div className='col'>
                  <div className='form-floating'>
                     <div className='form-control'>
                        <DatePicker
                           dateFormat={
                              !!trip.proposal_voting_closes_at &&
                              trip.proposal_voting_closes_at.getFullYear() === new Date().getFullYear()
                              ? "MMM d @ h aa"
                              : "MMM d, yyyy @ h aa"
                           }
                           disabled={!!trip.proposal_voting_closes_at &&
                              trip.proposal_voting_closes_at.getTime() < new Date().getTime() - (24*60*60*1000)}
                           isClearable={!!trip.proposal_voting_closes_at &&
                              trip.proposal_voting_closes_at.getTime() > new Date().getTime() - (24*60*60*1000)}
                           minDate={!!trip.proposal_voting_opens_at 
                              ? new Date(Math.max(trip.proposal_voting_opens_at.getTime() + (24*60*60*1000), new Date().getTime()))
                              : ''}
                           placeholderText='mm/ddd/yyyy @ hh'
                           selected={!!trip.proposal_voting_closes_at ? trip.proposal_voting_closes_at : ''}
                           showTimeSelect={true}
                           timeIntervals={60}
                           onChange={date => handleDatePicker(date, 'proposal_voting_closes_at')}
                        />
                     </div>
                     <label>{trip.allow_proposals ? 'vote on proposals by' : 'close proposal voting at' }</label>
                  </div>
               </div>

            </div>
            <div className='row'>

               <div className='col'>
                  <div className='form-floating'>
                     <div className='form-control'>
                        <DatePicker
                           dateFormat={
                              !!trip.activity_voting_opens_at &&
                              trip.activity_voting_opens_at.getFullYear() === new Date().getFullYear()
                              ? "MMM d @ h aa"
                              : "MMM d, yyyy @ h aa"
                           }
                           disabled={!!trip.activity_voting_opens_at &&
                              trip.activity_voting_opens_at.getTime() < new Date().getTime() - (24*60*60*1000)
                           }
                           isClearable={!!trip.activity_voting_opens_at &&
                              trip.activity_voting_opens_at.getTime() > new Date().getTime() - (24*60*60*1000)
                           }
                           minDate={!!trip.proposal_voting_closes_at
                              ? new Date(Math.max(trip.proposal_voting_closes_at.getTime() + (24*60*60*1000), new Date().getTime()))
                              : !!trip.proposal_voting_opens_at
                                 ? new Date(Math.max(trip.proposal_voting_opens_at.getTime() + (24*60*60*1000), new Date().getTime()))
                                 : ''
                           }
                           placeholderText='mm/ddd/yyyy @ hh'
                           selected={!!trip.activity_voting_opens_at ? trip.activity_voting_opens_at : ''}
                           showTimeSelect={true}
                           timeIntervals={60}
                           onChange={date => handleDatePicker(date, 'activity_voting_opens_at')}
                        />
                     </div>
                     <label>submit activities by</label>
                  </div>
               </div>

               <div className='col'>
                  <div className='form-floating'>
                     <div className='form-control'>
                        <DatePicker
                           dateFormat={
                              !!trip.activity_voting_closes_at &&
                              trip.activity_voting_closes_at.getFullYear() === new Date().getFullYear()
                              ? "MMM d @ h aa"
                              : "MMM d, yyyy @ h aa"
                           }
                           disabled={!!trip.activity_voting_closes_at &&
                              trip.activity_voting_closes_at.getTime() < new Date().getTime() - (24*60*60*1000)
                           }
                           isClearable={!!trip.activity_voting_closes_at &&
                              trip.activity_voting_closes_at.getTime() > new Date().getTime() - (24*60*60*1000)
                           }
                           minDate={!!trip.activity_voting_opens_at
                              ? new Date(Math.max(trip.activity_voting_opens_at.getTime() + (24*60*60*1000), new Date().getTime()))
                              : !!trip.proposal_voting_closes_at
                                 ? new Date(Math.max(trip.proposal_voting_closes_at.getTime() + (24*60*60*1000), new Date().getTime()))
                                 : !!trip.proposal_voting_opens_at
                                    ? new Date(Math.max(trip.proposal_voting_opens_at.getTime() + (24*60*60*1000), new Date().getTime()))
                                    : ''
                           }
                           placeholderText='mm/ddd/yyyy @ hh'
                           selected={!!trip.activity_voting_closes_at ? trip.activity_voting_closes_at : ''}
                           showTimeSelect={true}
                           timeIntervals={60}
                           onChange={date => handleDatePicker(date, 'activity_voting_closes_at')}
                        />
                     </div>
                     <label>vote on activities by</label>
                  </div>
               </div>

            </div>
            <div className='row action-btns-row'>
               <div className='col'>

                  <BackBtn />

               </div>
               <div className='col'>

                  <button type='submit' className='btn btn-primary'>save</button>
                  <DeleteBtn />
                  <DeleteModal record={trip} recordType={'trip'} onConfirm={handleDelete} />
               
               </div>
            </div>
         </div>
      </form>
   )
}

export default EditTripForm