import '../../assets/css/forms.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'

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
   const [showResults, setShowResults] = useState(false)
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
         setShowResults(false)
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
         setShowResults(false)
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
      switch (name) {
         case 'destination':
            setProposal({...proposal,
               [name]: value,
               country: value.country
            })
            break
         default:
            setProposal({...proposal,
               [name]: value
            })
      }
      setShowResults(false)
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
      console.log(result)
      let label = result.label.split(' ')
      label = label.map((word, i) => {
         if (i < label.length-1) word += ' '
         if (word.toLowerCase().includes(search.toLowerCase())) return (<strong>{word}</strong>)
         else return (<>{word}</>)
      })
      return (
         <div key={result.id}
            className='dropdown-list-item'
            onClick={(e) => {
               setSearch(result.label)
               handleSelect(e, 'destination', result)
            }}
            >{label}</div>
      )
   }) : null

   const divCountries = countries ? countries.map(country => {
      console.log(country)
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
                  >{destination.locality}</div>
            )
         }) 
      : null

   return (
      <div className='container'>
         <form onSubmit={handleSubmit} autoComplete='off'>
            <input autoComplete='false' name='hidden' type='text' style={{display: 'none'}} />
            <h2>new destination proposal</h2>

            <h4>search by destination</h4>
            <div className='container dropdown-container'>
               <div className='form-floating'>
                  <input name='name'
                     type='text'
                     autoComplete='off'
                     className='form-control'
                     placeholder='destination'
                     value={search}
                     onBlur={handleBlur}
                     onChange={(e) => {
                        setSearch(e.target.value)
                        setShowResults(true)
                     }}
                     onFocus={() => {
                        setShowResults(true)
                        setShowCountries(false)
                        setShowRegions(false)
                        setShowCities(false)
                     }} />
                  <label>destination</label>
               </div>

               {!!showResults && !!search
                  ? <div className='dropdown-list'>
                        {displayResults}
                        <div key='search'
                           className='dropdown-list-item'
                           onClick={() => navigate('/destinations/new', {state: {from: location.pathname}})}
                           >can't find what you're looking for?</div>
                     </div>
                  : null }
            </div>

            <br />
            <h4>or narrow by country / region</h4>

            <div className='row'>
               <div className='col'>

                  <div className='container dropdown-container'>
                     <div className='form-floating'>
                        <input name='country'
                           type='text'
                           autoComplete='off'
                           className='form-control'
                           placeholder='country'
                           value={!!proposal.country.name ? proposal.country.name : ''}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           onFocus={() => {
                              setShowResults(false)
                              setShowCountries(true)
                              setShowRegions(false)
                              setShowCities(false)
                           }} />
                        <label>country</label>
                     </div>
                     {showCountries
                        ? <div className='dropdown-list'>{divCountries}</div>
                        : null}
                  </div>

               </div>
            </div>
            <div className='row'>
               <div className='col col-12 col-md-6'>

                  <div className='form-floating'>
                     <input name='region'
                        type='text'
                        autoComplete='off'
                        className='form-control'
                        placeholder='region'
                        value={proposal.destination.region}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={() => {
                           setShowResults(false)
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
                        autoComplete='off'
                        className='form-control'
                        placeholder='city'
                        value={proposal.destination.locality}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={() => {
                           setShowResults(false)
                           setShowCountries(false)
                           setShowRegions(false)
                           setShowCities(true)
                        }} />
                     <label>city</label>
                  </div>
                  {showCities ? divCities : null}

               </div>

            </div>

            <BackBtn />
            <button type='submit' className='btn btn-primary'>+ make proposal</button>

         </form>
      </div>
   )
}

export default NewProposalForm