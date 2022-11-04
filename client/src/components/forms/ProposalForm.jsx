import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function ProposalForm (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const countries = useSelector(state => state.countries)
   const user = useSelector(state => state.user)
   const [destinations, setDestinations] = useState([])
   const [proposal, setProposal] = useState({
      country_id: '',
      destination_id: '',
      trip_id: params.id,
      user_id: user.id
   })

   useEffect(() => {
      if (!!proposal.country_id) fetch(`/countries/${proposal.country_id}/destinations`).then(r=>{
         if (r.ok) r.json().then(setDestinations)
         else console.log(r)
      })
   }, [proposal])

   function handleChange (e) {
      setProposal({...proposal,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/proposals', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(proposal)
      }).then(r=>{
         if (r.ok) r.json().then(() => {
            const path = location.pathname.split('/')
            path.pop()
            navigate(path.join('/'))
         })
         else console.log(r)
      })
   }

   const countryOptions = !!countries ? countries.map(country => {
      return (
         <option key={country.id} value={country.id}>{country.name}</option>
      )
   }) : null

   const destinationOptions = !!destinations ? destinations.map(destination => {
      return (
         <option key={destination.id} value={destination.id}>{destination.municipality}</option>
      )
   }) : null

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <h2>new proposal</h2>
            <label>search</label>
            <input name='name'
               type='text'
               value={proposal.destination}
               onChange={handleChange} />

            <br />
            
            <label>country</label>
            <select
               name='country_id'
               defaultValue='country'
               onChange={handleChange}>
                  <option value='country'></option>
                  {countryOptions}
            </select>

            <br />

            <label>destination</label>
            <select
               name='destination_id'
               defaultValue='destination'
               onChange={handleChange}>
                  <option value='destination'></option>
                  {destinationOptions}
            </select>

            <br />

            <button type='submit'>submit</button>

         </form>
      </div>
   )
}

export default ProposalForm