import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../buttons/BackBtn'
import DeleteModal from '../modals/DeleteModal'

function EditProposalForm (props) {
   const params = useParams()
   const countries = useSelector(state => state.countries)
   const [destinations, setDestinations] = useState([])
   const [proposal, setProposal] = useState({
      id: '',
      country_id: '',
      destination_id: '',
      trip_id: '',
      user_id: ''
   })
   
   // navigation
   const location = useLocation()
   const navigate = useNavigate()
   let proposalPath = location.pathname.split('/')
   proposalPath.pop()
   proposalPath = proposalPath.join('/')
   let tripPath = location.pathname.split('/')
   let index = tripPath.indexOf('proposals')
   tripPath = tripPath.slice(0, index).join('/')

   useEffect(() => {
      if (!!location.state && !!location.state.proposal) {
         let temp = location.state.proposal
         setProposal({
            id: temp.id,
            country_id: temp.destination.country.id,
            destination_id: temp.destination.id,
            trip_id: temp.trip.id,
            user_id: temp.user.id
         })
      } else {
         fetch('/proposals/' + params.id).then(r=>{
            if (r.ok) r.json().then(temp => {
               setProposal({
                  id: temp.id,
                  country_id: temp.destination.country.id,
                  destination_id: temp.destination.id,
                  trip_id: temp.trip.id,
                  user_id: temp.user.id
               })
            })
            else console.log(r)
         })
      }
   }, [location, params])

   useEffect(() => {
      if (!!proposal.country_id) {
         fetch(`/countries/${proposal.country_id}/destinations`).then(r=>{
            if (r.ok) r.json().then(setDestinations)
            else console.log(r)
         })
      }
   }, [proposal.country_id])

   function handleChange (e) {
      setProposal({...proposal,
         [e.target.name]: e.target.value
      })
      if (e.target.name === 'country_id') fetch(`/countries/${proposal.country_id}/destinations`).then(r=>{
         if (r.ok) r.json().then(setDestinations)
         else console.log(r)
      })
   }

   function handleDelete () {
      if (parseInt(params.id) !== parseInt(proposal.id)) return console.log('error: url & proposal id do not match')
      fetch(`/proposals/${proposal.id}`, {
         method: 'DELETE'
      }).then(r=>{
         if (r.ok) navigate(tripPath)
         else {
            switch (r.status) {
               case 404:
                  navigate(tripPath)
                  break
               default:
                  console.log(r)
            }
         }
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/proposals/' + proposal.id, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(proposal)
      }).then(r=>{
         if (r.ok) navigate(proposalPath)
         else console.log(r)
      })
   }

   const countryOptions = !!countries ? countries.map(country => {
      return (
         <option key={country.id}
            value={country.id}
            >{country.name}</option>
      )
   }) : null

   const destinationOptions = !!destinations ? destinations.map(destination => {
      console.log(destination)
      return (
         <option key={destination.id}
            value={destination.id}
            >{destination.municipality}</option>
      )
   }) : null

   const DeleteBtn = () => {
      return (
         <button type='button'
            className='btn btn-outline-danger'
            data-bs-toggle='modal'
            data-bs-target='#deleteModal'
            >delete</button>
      )
   }

   if (!proposal) return <></>
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h2>edit proposal</h2>
            
            <label>country</label>
            <select name='country_id'
               value={proposal.country_id}
               onChange={handleChange}>
                  <option value='country'></option>
                  {countryOptions}
            </select>

            <br />

            <label>destination</label>
            <select name='destination_id'
               value={proposal.destination_id}
               onChange={handleChange}>
                  <option value='destination'></option>
                  {destinationOptions}
            </select>

            <br />

            <button type='submit' className='btn btn-primary'>save</button>
            <BackBtn />

            <br />

            <DeleteBtn />
            <DeleteModal record={proposal} recordType={'proposal'} onConfirm={handleDelete} />
         </form>
      </div>
   )
}

export default EditProposalForm