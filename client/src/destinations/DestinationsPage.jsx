import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DestinationsContainer from './DestinationsContainer'

function DestinationsPage (props) {
   console.log('DestinationPage render')
   const dispatch = useDispatch()
   const destinations = useSelector(state => state.destinations.list)
   const [numShow, setNumShow] = useState(12)

   useEffect(() => {
      if (!destinations) {
         fetch('/destinations/explore').then(r=>{
            if (r.ok) r.json().then(list => {
               dispatch({type: 'destinations/fullListLoaded', payload: list})
            })
            else console.log(r)
         })
      }
   }, [destinations, dispatch])

   if (!destinations) return <></>
   return (
      <div className='container'>
         <h2 className='page-title'>explore destinations</h2>
         <div className='page-content'>
            <DestinationsContainer destinations={destinations.slice(0,numShow)} />
            <div className='fin'>
               <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => {
                     if (numShow < destinations.length) setNumShow(numShow + 12)
                  }}
                  >+ show more
               </button>
            </div>
            <h6 className='fin'>fin</h6>
         </div>
      </div>
   )
}

export default DestinationsPage