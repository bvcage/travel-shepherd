import React, { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete from 'use-places-autocomplete'

export default function GooglePlaces (props) {
   const { destination, onSelectPlace } = props
   const [ libraries ] = useState(['places'])
   const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      libraries: libraries
   })

   if (!isLoaded) return <></>
   if (!destination) return <></>
   return (
      <div>
         <PlacesAutocomplete destination={destination} onSelectPlace={onSelectPlace} />
      </div>
   )
}

const PlacesAutocomplete = ({ destination, onSelectPlace }) => {
   const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions
   } = usePlacesAutocomplete({
      requestOptions: {
         componentRestrictions: { country: destination.country.iso2 },
         location: new window.google.maps.LatLng(destination.lat, destination.lon),
         radius: 20000,
         sessionToken: new window.google.maps.places.AutocompleteSessionToken()
      },
      debounce: 1000
   })

   const handleSelect = (suggestion) => {
      setValue(suggestion.description, false)
      clearSuggestions()
      onSelectPlace(suggestion)
   }

   const results = !!data
      ? data.map(suggestion => {
         const {
            place_id,
            structured_formatting: { main_text, secondary_text }
         } = suggestion
         return (
            <div key={place_id}
               className='dropdown-list-item'
               onClick={() => handleSelect(suggestion)}
               >
                  <strong>{main_text}</strong> <small>{secondary_text}</small>
            </div>
         )
      })
      : null

   return (
      <div>
         <div className='form-floating'>
            <input id='activity-autocomplete'
               type='text'
               className='form-control'
               disabled={!ready}
               placeholder='location'
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
            <label>location</label>
         </div>
         <div className='dropdown-list'>
            {status === 'OK' ? results : null}
         </div>
      </div>
   )
}