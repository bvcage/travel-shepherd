import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function ReleaseResultsBtn (props) {
   const { trip } = props
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   let backpath = location.pathname.split('/')
   backpath.pop()
   backpath = backpath.join('/')

   function releaseResults () {
      if (!trip.id) return console.log('error: no trip id')
      fetch(`/trips/${trip.id}/calc_results`).then(r=>{
         if (r.ok) r.json().then(winner => {
            dispatch({type: 'trip/resultsAreIn', payload: winner})
            navigate(backpath)
         })
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