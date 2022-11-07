import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function NewProposalForm (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const countries = useSelector(state => state.countries)
   const user = useSelector(state => state.user)

   const [proposal, setProposal] = useState({
      country: !!location.state && !!location.state.destination ? location.state.destination.country : '',
      destination: !!location.state && !!location.state.destination ? location.state.destination : '',
      trip_id: params.id,
      user_id: user.id
   })
   
   const [destinations, setDestinations] = useState([])
   const [search, setSearch] = useState('')
   const [results, setResults] = useState([])
   const [regions, setRegions] = useState([])
   const [cities, setCities] = useState([])
   const [showCountries, setShowCountries] = useState(false)
   const [showRegions, setShowRegions] = useState(false)
   const [showCities, setShowCities] = useState(false)

   useEffect(() => {
      if (!!search) {
         fetch('/destinations?name=' + search).then(r=>{
            if (r.ok) r.json().then(setResults)
            else console.log(r)
         })
      } else {
         setResults([])
      }
   }, [search])

   useEffect(() => {
      if (!!proposal.country.id) fetch(`/countries/${proposal.country.id}/destinations`).then(r=>{
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
      console.log(proposal)
      const post = {
         'country_id': proposal.country.id,
         'destination_id': proposal.destination.id,
         'trip_id': proposal.trip_id,
         'user_id': proposal.user_id
      }
      fetch('/proposals', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(post)
      }).then(r=>{
         if (r.ok) r.json().then(() => {
            const path = location.pathname.split('/')
            path.pop()
            navigate(path.join('/'))
         })
         else console.log(r)
      })
   }

   const displayResults = results ? results.map(result => {
      return (
         <div key={result.id}
            onClick={() => {
               setSearch(result.name)
               setProposal({...proposal,
                  destination: result
               })
            }}
            >{result.name}</div>
      )
   }) : null

   const divCountries = countries ? countries.map(country => {
      return (
         <div key={country.id}
            onClick={() => {
               setProposal({...proposal, country: country})
               setShowCountries(false)
            }}
            >{country.name}</div>
      )
   }) : null

   const divRegions = destinations ? destinations.map(destination => {
      return (
         <div key={'region-' + destination.id}>{destination.region}</div>
      )
   }) : null

   const divCities = destinations
      ? destinations
         // .filter(destination => destination.region.toLowerCase().includes(proposal.destination.region))
         .map(destination => {
            return (
               <div key={'city-' + destination.id}>{destination.municipality}</div>
            )
         }) 
      : null

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <h2>new proposal</h2>

            <div className='form-floating'>
               <input name='name'
                  type='text'
                  className='form-control'
                  placeholder='destination'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
               <label>destination</label>
            </div>

            {!!search
               ? <div className='container'>
                     {displayResults}
                     <div key='search'
                        onClick={() => navigate('/destinations/new', {state: {from: location.pathname}})}
                        >can't find what you're looking for?</div>
                  </div>
               : null }

            <br />
            <h6>or</h6>
            <br />

            <div className='row'>
               <div className='col'>

                  <div className='form-floating'>
                     <input name='country'
                        type='text'
                        className='form-control'
                        placeholder='country'
                        value={proposal.country.name}
                        onChange={handleChange}
                        onFocus={() => setShowCountries(true)} />
                     <label>country</label>
                  </div>
                  {showCountries ? divCountries : null}

               </div>
            </div>
            <div className='row'>
               <div className='col col-12 col-md-6'>

                  <div className='form-floating'>
                     <input name='region'
                        type='text'
                        className='form-control'
                        placeholder='region'
                        value={proposal.destination.region}
                        onChange={handleChange} />
                     <label>region</label>
                  </div>
                  {divRegions}

               </div>
               <div className='col col-12 col-md-6'>

                  <div className='form-floating'>
                     <input name='city'
                        type='text'
                        className='form-control'
                        placeholder='city'
                        value={proposal.destination.municipality}
                        onChange={handleChange} />
                     <label>city</label>
                  </div>
                  {divCities}

               </div>

            </div>

            <button type='submit' className='btn btn-primary'>submit</button>

         </form>
      </div>
   )
}

export default NewProposalForm