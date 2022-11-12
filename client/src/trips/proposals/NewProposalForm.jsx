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

   let timeout
   function handleBlur (e) {
      if (!!timeout) clearTimeout()
      timeout = setTimeout(() => {
         setShowCountries(false)
         setShowRegions(false)
         setShowCities(false)
      }, 100)
   }

   function handleChange (e) {
      setProposal({...proposal,
         [e.target.name]: e.target.value
      })
   }

   function handleSelect (e, name, value) {
      e.stopPropagation()
      setProposal({...proposal,
         [name]: value
      })
      setShowCountries(false)
      setShowRegions(false)
      setShowCities(false)
   }

   function handleSubmit (e) {
      e.preventDefault()
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
            onClick={(e) => {
               setSearch(result.name)
               handleSelect(e, 'destination', result)
            }}
            >{result.name}</div>
      )
   }) : null

   const divCountries = countries ? countries.map(country => {
      return (
         <div key={country.id}
            onClick={(e) => {
               handleSelect(e, 'country', country)
               setProposal({...proposal, country: country})
               setShowCountries(false)
            }}
            >{country.name}</div>
      )
   }) : null

   const divRegions = destinations ? destinations.map(destination => {
      return (
         <div key={'region-' + destination.id}
            onClick={(e) => {
               handleSelect(e, 'destination', destination)
            }}
            >{destination.region}</div>
      )
   }) : null

   const divCities = destinations
      ? destinations
         // .filter(destination => destination.region.toLowerCase().includes(proposal.destination.region))
         .map(destination => {
            return (
               <div key={'city-' + destination.id}
                  onClick={(e) => handleSelect(e, 'destination', destination)}
                  >{destination.municipality}</div>
            )
         }) 
      : null

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <h2>new destination proposal</h2>

            <h4>search by destination</h4>
            <div className='form-floating'>
               <input name='name'
                  type='text'
                  className='form-control'
                  placeholder='destination'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => {
                     setShowCountries(false)
                     setShowRegions(false)
                     setShowCities(false)
                  }} />
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
            <h4>or narrow by country / region</h4>

            <div className='row'>
               <div className='col'>

                  <div className='form-floating'>
                     <input name='country'
                        type='text'
                        className='form-control'
                        placeholder='country'
                        value={!!proposal.country.name ? proposal.country.name : ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={() => {
                           setShowCountries(true)
                           setShowRegions(false)
                           setShowCities(false)
                        }} />
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={() => {
                           setShowCountries(false)
                           setShowRegions(true)
                           setShowCities(false)
                        }} />
                     <label>region</label>
                  </div>
                  {showRegions ? divRegions : null}

               </div>
               <div className='col col-12 col-md-6'>

                  <div className='form-floating'>
                     <input name='city'
                        type='text'
                        className='form-control'
                        placeholder='city'
                        value={proposal.destination.municipality}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={() => {
                           setShowCountries(false)
                           setShowRegions(false)
                           setShowCities(true)
                        }} />
                     <label>city</label>
                  </div>
                  {showCities ? divCities : null}

               </div>

            </div>

            <button type='submit' className='btn btn-primary'>+ make proposal</button>

         </form>
      </div>
   )
}

export default NewProposalForm