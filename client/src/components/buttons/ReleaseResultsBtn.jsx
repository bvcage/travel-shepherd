import React from 'react'
import { useDispatch } from 'react-redux'

function ReleaseResultsBtn (props) {
   const { trip } = props
   const dispatch = useDispatch()

   function releaseResults () {
      if (!trip.id) return console.log('error: no trip id')
      fetch(`/trips/${trip.id}/calc_results`).then(r=>{
         if (r.ok) r.json().then(winner => dispatch({type: 'trip/resultsAreIn', payload: winner}))
         else console.log(r)
      })
   }

   if (!trip) return <></>
   return (
      <button type='button'
         className='btn btn-primary'
         onClick={releaseResults}
         >release results</button>
   )
}

export default ReleaseResultsBtn