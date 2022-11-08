import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import SpringList from 'react-spring-dnd'
import BackBtn from '../../components/buttons/BackBtn'

function NewVoteForm (props) {
   const { trip } = props
   const user = useSelector(state => state.user)
   const [proposals, setProposals] = useState([])
   // navigation
   const location = useLocation()
   const navigate = useNavigate()
   const path = location.pathname.split('/')
   path.pop()

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/proposals`).then(r=>{
            if (r.ok) r.json().then(setProposals)
         })
      }
   }, [trip])

   function handleSubmit (e) {
      e.preventDefault()
      const items = document.getElementsByClassName('spring-item')
      const rank = [].slice.call(items).map(item => item.textContent)
      let points = trip.voting_type.value
      let votes = []
      for (let i=0; i<trip.voting_type.value; ++i) {
         const proposal = proposals.find(ele => ele.destination.name === rank[i])
         votes.push(fetch('/votes', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               'proposal_id': proposal.id,
               'trip_id': trip.id,
               'user_id': user.id,
               'points': points
            })
         }).then(r=>{
            if (r.ok) return r.json()
            else console.log(r)
         }))
         if (points > 0) points -= 1
      }
      Promise.all(votes).then(() => navigate(path.join('/')))
   }

   const options = !!proposals[0]
      ? proposals.map(item => (
         <div key={item.id}>{item.destination.name}</div>
      )) : [<div key='loading'>loading...</div>]

   const PickForm = () => {
      return (
         <div>pick</div>
      )
   }

   const RankForm = () => {
      return (
         <SpringList>
            {options}
         </SpringList>
      )
   }

   console.log(trip)

   if (!trip ||
       !trip.voting_type) return <></>
   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <h4>vote</h4>
            {!!proposals && trip.voting_type.name === 'rank' ? <RankForm /> : <PickForm />}
            <button type='submit'
               className='btn btn-primary'
               onClick={handleSubmit}
               >vote</button>
            <BackBtn />
         </form>
      </div>
   )
}

export default NewVoteForm