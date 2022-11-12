import '../../assets/css/forms.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function NewInviteForm (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const user = useSelector(state => state.user)

   const initialInvite = {
      name: "",
      email: "",
      sender_user_id: user.id,
      invite_status_id: 1  // pending
   }

   const [invite, setInvite] = useState(initialInvite)
   const [inviteList, setInviteList] = useState([])
   const [invites, setInvites] = useState([])
   const [statusList, setStatusList] = useState([])
   const [trip, setTrip] = useState({})

   useEffect(() => {
      // get invite status list
      fetch('/invite_statuses').then(r=>{
         if (r.ok) r.json().then(setStatusList)
         else console.log(r)
      })
      // get trip info
      if (!!props.trip) setTrip(props.trip)
      else if (!!location.state && !!location.state.trip) setTrip(location.state.trip)
      else if (!!params.id) fetch(`/trips/${params.id}`).then(r=>{
         if (r.ok) r.json().then(setTrip)
         else console.log(r)
      })
      // get invite info
      if (!!props.invites) setInvites(props.invites)
      // else if (!!location.state && !!location.state.invites) setInvites(location.state.invites)
      else if (!!params.id) fetch(`/trips/${params.id}/invites`).then(r=>{
         if (r.ok) r.json().then(setInvites)
         else console.log(r)
      })
   }, [props, location, params])

   useEffect(() => {
      const users = !!trip.travelers ? trip.travelers.map(traveler => traveler.user) : null

      const initialInviteList = !!users ? users.map(user => {
         return {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            status: 2   // confirmed
         }
      }) : []
   
      if (!!invites[0] && !!invites[0].user) initialInviteList.push(...invites.map(invite => {
         return {
            name: invite.user.full_name,
            email: invite.user.email,
            status: invite.invite_status.id
         }
      }))

      setInviteList(initialInviteList)

   }, [trip.travelers, invites])

   function handleChange (e) {
      setInvite({...invite,
         [e.target.name]: e.target.value
      })
      e.target.classList.remove('invalid')
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (!validateRequired(e)) return console.log('missing required inputs')
      // if (!validateEmail(e)) return console.log('error with email')
      fetch('/invites', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({...invite,
            'trip_id': trip.id,
            'user_email': invite.email      
         })
      }).then(r=>{
         if (r.ok) r.json().then(dbInv => {
            setInviteList([...inviteList, invite])
            setInvite(initialInvite)
         })
         else r.json().then(console.log)
      })
   }

   function validateEmail (e) {
      let emailValid = true
      const emailItems = e.target.querySelectorAll('input[name=email]')
      Object.values(emailItems).forEach(item => {
         if (!item.value.match(/^[A-z]+[A-z0-9.-_]*@[A-z0-9]+.[A-z]{2,}$/)) {
            item.classList.add('invalid')
            emailValid = false
         }
      })
      return emailValid
   }

   function validateRequired (e) {
      let reqValid = true
      const reqItems = e.target.getElementsByClassName('required')
      Object.values(reqItems).forEach(item => {
         if (!item.value) {
            item.classList.add('invalid')
            reqValid = false
         }
      })
      return reqValid
   }

   const invitesDisplay = inviteList.map((invite, i) => {
      let status = statusList.find(status => status.id === invite.status)
      status = !!status && !!status.name ? status.name : 'sent'
      return (
         <div key={'invite' + i} className='row'>
            <div className='col'>

               <input name='name'
                  type='text'
                  className='form-control'
                  disabled={true}
                  value={invite.name} />

            </div>
            <div className='col col-12 col-sm'>

               <input name='email'
                  type='text'
                  className='form-control'
                  disabled={true}
                  value={invite.email} />

            </div>
            <div className='col col-12 col-sm-2'>
               
               <button type='button' className='btn btn-secondary' disabled={true}>{status}</button>

            </div>

         </div>
      )
   })

   if (!user) return <></>
   return (
      <div className='container'>

         <h2>invite friends{!!trip && !!trip.name ? ' to ' + trip.name : null}</h2>

         <div className='row'>
            <div className='col'>
               <div id='trip-invite-container' className='container'>
                  {invitesDisplay}
               </div>
            </div>
         </div>

         <form id='trip-invite-form' onSubmit={handleSubmit}>
            <div className='container'>
               <div className='row'>
                  <div className='col col-12 col-sm'>

                     <input name='name'
                        type='text'
                        className='form-control required'
                        placeholder='name'
                        value={invite.name}
                        onChange={handleChange} />
                        
                  </div>
                  <div className='col col-12 col-sm'>

                     <input name='email'
                        type='text'
                        className='form-control required'
                        placeholder='email'
                        value={invite.email}
                        onChange={handleChange} />

                  </div>
                  <div className='col col-12 col-sm-2'>
                     
                     <button type='submit' className='btn btn-primary'>invite</button>

                  </div>
               </div>
            </div>
         </form>

         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('../')}
            >continue</button>

      </div>
   )
}

export default NewInviteForm