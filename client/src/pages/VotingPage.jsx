import React from 'react'
import { useSelector } from 'react-redux'
import NewVoteForm from '../components/forms/NewVoteForm'

function VotingPage (props) {
   const trip = useSelector(state => state.trip)
   return (
      <div className='container'>
         <h4>voting page</h4>
         <NewVoteForm trip={trip} />
      </div>
   )
}

export default VotingPage