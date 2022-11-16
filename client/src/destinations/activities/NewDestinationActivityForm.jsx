import '../../assets/css/forms.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DefaultAddressForm from '../../components/addressForms/DefaultAddressForm'
import BackBtn from '../../components/buttons/BackBtn'
import GooglePlaces from './GooglePlaces'

function NewDestinationActivityForm (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const backpath = !!location.state && !!location.state.from ? location.state.from : null
   const navigate = useNavigate()
   const params = useParams()

   // form input
   const [destination, setDestination] = useState({})
   const [activities, setActivities] = useState([])
   const [activityTypes, setActivityTypes] = useState([])
   const [showActivityTypes, setShowActivityTypes] = useState(false)
   const [placeTypes, setPlaceTypes] = useState([])
   const [showPlaceTypes, setShowPlaceTypes] = useState(false)
   const [search, setSearch] = useState({token: '', text: ''})
   const [searchToken, setSearchToken] = useState('')
   const [predictions, setPredictions] = useState([])
   const [newPlace, setNewPlace] = useState({
      name: '',
      street_number: '',
      building_name: '',
      street_number_suffix: '',
      street_name: '',
      street_type: '',
      street_direction: '',
      address_type: '',
      address_type_identifier: '',
      destination_id: '',
      type: undefined,
      typeSearch: ''
   })
   const [newActivity, setNewActivity] = useState({
      name: '',
      description: '',
      type: undefined,
      typeSearch: ''
   })

   useEffect(() => {
      if (!!params.id) {
         fetch(`/destinations/${params.id}`).then(r=>{
            if (r.ok) r.json().then(setDestination)
            else console.log(r)
         })
         fetch(`/destinations/${params.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setActivities)
            else console.log(r)
         })
      }
      fetch('/activity_types').then(r=>{
         if (r.ok) r.json().then(setActivityTypes)
         else console.log(r)
      })
      fetch('/place_types').then(r=>{
         if (r.ok) r.json().then(setPlaceTypes)
         else console.log(r)
      })
   }, [params])


   function checkActivityType () {
      setTimeout(() => {setShowActivityTypes(false)}, 100)
      if (!newActivity.typeSearch) return
      const activityTypeNames = activityTypes.map(type => type.name.toLowerCase())
      const searchText = newActivity.typeSearch.toLowerCase()
      if (activityTypeNames.includes(searchText)) {
         const temp = activityTypes.find(type => type.name.toLowerCase() === searchText)
         setNewActivity({...newActivity,
            type: temp,
            typeSearch: temp.name
         })
      } else {
         const matches = activityTypeNames.filter(type => type.includes(searchText))
         if (matches.length === 1) {
            setNewActivity({...newActivity,
               type: activityTypes.find(type => type.name.toLowerCase() === matches[0]),
               typeSearch: matches[0]
            })
         } else {
            setNewActivity({...newActivity,
               type: '',
               typeSearch: ''
            })
         }
      }
   }

   function checkPlaceType () {
      setTimeout(() => {setShowPlaceTypes(false)}, 100)
      if (!newPlace.typeSearch) return
      const placeTypeNames = placeTypes.map(type => type.name.toLowerCase())
      const searchText = newPlace.typeSearch.toLowerCase()
      if (placeTypeNames.includes(searchText)) {
         const temp = placeTypes.find(type => type.name.toLowerCase() === searchText)
         setNewPlace({...newPlace,
            type: temp,
            typeSearch: temp.name
         })
      } else {
         const matches = placeTypeNames.filter(type => type.includes(searchText))
         if (matches.length === 1) {
            setNewPlace({...newPlace,
               type: placeTypes.find(type => type.name.toLowerCase() === matches[0]),
               typeSearch: matches[0]
            })
         } else {
            setNewPlace({...newPlace,
               type: '',
               typeSearch: ''
            })
         }
      }
   }

   function handlePlaceChange (e, edits=null) {
      if (!!edits) setNewPlace({...newPlace, ...edits})
      else setNewPlace({...newPlace,
         [e.target.name]: e.target.value
      })
   }

   function handleSearchSelect (place) {
      console.log(place)
      setNewPlace({
         name: place.structured_formatting.main_text,
         // street_number: '',
         // building_name: '',
         // street_number_suffix: '',
         // street_name: '',
         // street_type: '',
         // street_direction: '',
         // address_type: '',
         // address_type_identifier: '',
         destination_id: destination.id,
         type: undefined,
         typeSearch: place.types.join(', '),
         google_id: place.place_id
      })
      // clear session token when user selects
      setSearchToken('')
   }

   function handleSubmit (e) {
      e.preventDefault()
      const placePost = {
         ...newPlace,
         'destination_id': destination.id,
         'place_type_id': newPlace.type ? newPlace.type.id : null
      }
      fetch('/places', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(placePost)
      }).then(r=>{
         if (r.ok) r.json().then(place => {
            const activityPost = {
               ...newActivity,
               'activity_type_id': newActivity.type.id,
               'destination_id': destination.id,
               'place_id': place.id
            }
            fetch('/activities', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(activityPost)
            }).then(r=>{
               if (r.ok) r.json().then(activity => {
                  dispatch({type: 'activities/newActivity', payload: activity})
                  navigate(backpath, {state: {activity: activity}})
               })
               else {
                  console.log(r)
                  r.json().then(err => console.log('error message: ' + err))
               }
            })
         })
         else {
            console.log(r)
            r.json().then(err => console.log(err.error))
         }
      })
   }

   const activityTypeOptions = !!activityTypes
      ? activityTypes
         .filter(type => {
            return type.name.toLowerCase().includes(newActivity.typeSearch.toLowerCase())
         }).map(type => {
            return (
               <div key={type.id}
                  className='dropdown-list-item'
                  onClick={() => {
                     setNewActivity({...newActivity,
                        type: type,
                        typeSearch:type.name
                     })
                     setShowActivityTypes(false)
                  }}
                  >{type.name}</div>
            )
         })
      : null

   const placeTypeOptions = !!placeTypes
      ? placeTypes
         .filter(type => {
            return type.name.toLowerCase().includes(newPlace.typeSearch.toLowerCase())
         })
         .map(type => {
            return (
               <div key={type.id}
                  className='dropdown-list-item'
                  onClick={() => {
                     setNewPlace({...newPlace,
                        type: type,
                        typeSearch: type.name
                     })
                     setShowPlaceTypes(false)
                  }}
                  >{type.name}</div>
            )
         })
      : null

   if (  !destination ||
         !destination.country ) return <></>
   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <h2>new activity for...<br />{destination.label}</h2>
            
            <h3>do...</h3>

            <div className='row'>
               <div className='col col-12 col-md-8 col-xl-9'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        placeholder='activity'
                        required={true}
                        value={newActivity.name}
                        onChange={(e) => {
                           setNewActivity({...newActivity, name: e.target.value})
                        }}
                        onFocus={() => setShowActivityTypes(false)} />
                     <label>activity</label>
                  </div>
               </div>
               <div className='col col-12 col-md-4 col-xl-3'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        placeholder='category'
                        required={true}
                        value={newActivity.typeSearch}
                        onBlur={checkActivityType}
                        onChange={(e) => {
                           setNewActivity({...newActivity,
                              typeSearch: e.target.value
                           })
                        }}
                        onFocus={() => setShowActivityTypes(true)} />
                     <label>category</label>
                  </div>
                  {showActivityTypes
                     ?  <div className='dropdown-list'>
                           {activityTypeOptions}
                        </div>
                     : null}
               </div>
            </div>
            <div className='row'>
               <div className='col'>
                  <div className='form-floating'>
                     <textarea
                        className='form-control'
                        placeholder='description'
                        value={newActivity.description}
                        onChange={(e) => {
                           setNewActivity({...newActivity, description: e.target.value})
                        }}
                        onFocus={() => setShowActivityTypes(false)} />
                     <label>description</label>
                  </div>
               </div>
            </div>
            

            <h3>at...</h3>

            <div className='row'>
               <div className='col'>
                  <GooglePlaces destination={destination} onSelectPlace={handleSearchSelect} />
               </div>
            </div>

            <div className='row'>
               <div className='col'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        placeholder='location name'
                        required={true}
                        value={newPlace.name}
                        onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                        onFocus={() => {
                           setShowActivityTypes(false)
                           setShowPlaceTypes(false)
                        }} />
                     <label>location name</label>
                  </div>
               </div>
               <div className='col col-12 col-md-4 col-xl-3'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        placeholder='place type'
                        required={true}
                        value={newPlace.typeSearch}
                        onBlur={checkPlaceType}
                        onChange={(e) => setNewPlace({...newPlace, typeSearch: e.target.value})}
                        onFocus={() => setShowPlaceTypes(true)} />
                     <label>location type</label>
                  </div>
                  {showPlaceTypes
                     ?  <div className='dropdown-list'>
                           {placeTypeOptions}
                        </div>
                     : null}
               </div>
            </div>

            {/* <DefaultAddressForm place={newPlace} onChange={handlePlaceChange} /> */}

            <div className='row'>
               <div className='col col-12 col-md-6 col-lg-6'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        disabled={true}
                        placeholder='city'
                        value={destination.locality} />
                     <label>city</label>
                  </div>
               </div>
               <div className='col col-12 col-md-6 col-lg-3'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        disabled={!!destination.region}
                        placeholder='region'
                        value={!!destination.region ? destination.region : undefined} />
                     <label>region</label>
                  </div>
               </div>
               <div className='col col-12 col-lg-3'>
                  <div className='form-floating'>
                     <input type='text'
                        className='form-control'
                        disabled={true}
                        placeholder='country'
                        value={destination.country.name} />
                     <label>country</label>
                  </div>
               </div>
            </div>
            <button type='submit' className='btn btn-primary'>+ create</button>
         </form>
         <BackBtn path={backpath} />
      </div>
   )
}

export default NewDestinationActivityForm