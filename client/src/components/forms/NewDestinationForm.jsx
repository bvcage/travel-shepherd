import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function NewDestinationForm (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const backpath = !!location.state && !!location.state.from ? location.state.from : null
   const [destination, setDestination] = useState({
      country: '',
      region: '',
      municipality: ''
   })
   const [countries, setCountries] = useState([])
   const [regions, setRegions] = useState([])
   const [cities, setCities] = useState([])
   const [showCountries, setShowCountries] = useState(false)
   const [showRegions, setShowRegions] = useState(false)
   const [showCities, setShowCities] = useState(false)

   useEffect(() => {
      fetch('https://countriesnow.space/api/v0.1/countries/iso').then(r=>{
         if (r.ok) r.json().then(res => setCountries(res.data))
         else console.log(r)
      })
   }, [])

   useEffect(() => {
      if (countries.map(country=>country.name.toLowerCase()).includes(destination.country.toLowerCase())) {
         const countryUrl = destination.country.replace(' ', '%20').toLowerCase()
         fetch('https://countriesnow.space/api/v0.1/countries/states/q?country=' + countryUrl).then(r=>{
            if (r.ok) r.json().then(res => setRegions(res.data.states))
            else console.log(r)
         })
      } else {
         setRegions([])
         setShowRegions(false)
      }
   }, [countries, destination.country])

   useEffect(() => {
      if (countries.map(country=>country.name.toLowerCase()).includes(destination.country.toLowerCase())) {
         const countryUrl = destination.country.replace(' ', '%20').toLowerCase()
         if (regions.map(region=>region.name.toLowerCase()).includes(destination.region.toLowerCase())) {
            fetch('https://countriesnow.space/api/v0.1/countries/state/cities/q?'
               + encodeURI(`country=${destination.country}`)
               + encodeURI(`&state=${destination.region}`)
            ).then(r=>{
               if (r.ok) r.json().then(res => setCities(res.data))
            })
         } else {
            fetch('https://countriesnow.space/api/v0.1/countries/cities/q?country=' + countryUrl).then(r=>{
               if (r.ok) r.json().then(res => setCities(res.data))
               else console.log(r)
            })
         }
      } else {
         setCities([])
         setShowCities(false)
      }
   }, [countries, regions, destination])

   function handleChange (e) {
      switch (e.target.name) {
         case 'country':
            setDestination({
               country: e.target.value,
               region: '',
               municipality: ''
            })
            break
         case 'region':
            setDestination({...destination,
               region: e.target.value,
               municipality: ''
            })
            break
         default:
            setDestination({...destination,
               [e.target.name]: e.target.value
            })
      }
   }

   function handleSelect (e, name, value) {
      e.stopPropagation()
      setDestination({...destination,
         [name]: value
      })
      setShowCountries(false)
      setShowRegions(false)
      setShowCities(false)
   }

   function handleSubmit (e) {
      e.preventDefault()
      fetch('/destinations', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(destination)
      }).then(r=>{
         if (r.ok) r.json().then(destination => {
            navigate(backpath, {replace: true, state: {destination: destination}})
         })
         else console.log(r)
      })
   }

   const divCountries = !!countries 
      ? countries
         .filter(country => country.name.toLowerCase().includes(destination.country.toLowerCase()))
         .map(country => {
            return (
               <div key={'country-' + country.name}
                  onClick={(e) => handleSelect(e, 'country', country.name)}
                  >{country.name}</div>
            )
         }) 
      : null

   const divRegions = !!regions
      ? regions
         .filter(region => region.name.toLowerCase().includes(destination.region.toLowerCase()))
         .map(region => {
            return (
               <div key={'region-' + region.name}
                  onClick={(e) => handleSelect(e, 'region', region.name)}
                  >{region.name}</div>
            )
         })
      : null

   const divCities = !!cities
      ? cities
         .filter(city => city.toLowerCase().includes(destination.municipality.toLowerCase()))
         .sort()
         .map(city => {
            return (
               <div key={'city-' + city}
                  onClick={(e) => handleSelect(e, 'municipality', city)}
                  >{city}</div>
            )
         })
      : null

   return (
      <form onSubmit={handleSubmit}>
         <h3>create new destination</h3>

         <div className='row'>
            <div className='col'>
         
               <div className='form-floating'>
                  <input name='country'
                     type='text'
                     className='form-control'
                     placeholder='country'
                     required={true}
                     value={destination.country}
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

            <div className='col'>

               <div className='form-floating'>
                  <input name='region'
                     type='text'
                     className='form-control'
                     placeholder='region'
                     value={destination.region}
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
            <div className='col'>

               <div className='form-floating'>
                  <input name='municipality'
                     type='text'
                     className='form-control'
                     placeholder='city'
                     value={destination.municipality}
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

         <button type='submit' className='btn btn-primary'>+ create</button>

      </form>
   )
}

export default NewDestinationForm