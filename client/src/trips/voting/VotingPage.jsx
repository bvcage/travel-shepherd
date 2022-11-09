import React from 'react'
import { useSelector } from 'react-redux'
import BackBtn from '../../components/buttons/BackBtn'
import NewActivityVoteForm from './NewActivityVoteForm'
import NewProposalVoteForm from './NewProposalVoteForm'

function VotingPage (props) {
   const trip = useSelector(state => state.trip)
   return (
      <div className='container'>
         <h2>voting page</h2>
         {!!trip.winning_proposal_id ? <NewActivityVoteForm /> : <NewProposalVoteForm trip={trip} /> }
         <BackBtn />
      </div>
   )
}

export default VotingPage