import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'

function ProposalSummaryPage (props) {
   const navigate = useNavigate()
   const params = useParams()
   const user = useSelector(state => state.user)
   const [proposal, setProposal] = useState({})

   useEffect(() => {
      if (!!params.id) {
         fetch('/proposals/' + params.id).then(r=>{
            if (r.ok) r.json().then(setProposal)
            else console.log(r)
         })
      }
   }, [params])

   const EditBtn = () => {
      return (
         <button type='button'
            className='btn'
            onClick={() => navigate('edit', {state: {proposal: proposal}})}
            >edit</button>
      )
   }

   if (!proposal ||
       !proposal.user ||
       !proposal.destination ) return <></>
   return (
      <div className='container'>
         <h5>{proposal.user.first_name}'s proposal to...</h5>
         <h2>{proposal.destination.name} {proposal.destination.country.flag}</h2>
         {user.id === proposal.user.id ? <EditBtn /> : null}
         <BackBtn />
      </div>
   )
}

export default ProposalSummaryPage