import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import SpringList from 'react-spring-dnd'
import BackBtn from '../../components/buttons/BackBtn'

function NewProposalVoteForm (props) {
   const { trip } = props
   const user = useSelector(state => state.user)
   const [proposals, setProposals] = useState([])
   const [selected, setSelected] = useState('')
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
      switch (trip.voting_type.name) {
         case 'pick':
            submitPickVote()
            break
         case 'rank':
            submitRankVote()
            break
         default:
            console.log('voting type not available / not supported')
      }
   }

   function submitPickVote () {
      const post = {
         'proposal_id': selected,
         'trip_id': trip.id,
         'user_id': user.id,
         'points': 1
      }
      fetch('/votes', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(post)
      }).then(r=>{
         if (r.ok) navigate(path.join('/'))
         else console.log(r)
      })
   }

   function submitRankVote () {
      const items = document.getElementsByClassName('spring-item')
      const rank = [].slice.call(items).map(item => item.textContent)
      let points = trip.voting_type.value
      let votes = []
      for (let i=0; i<trip.voting_type.value && i<items.length; ++i) {
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

   const pickOptions = !!proposals[0]
      ? proposals.map(item => {
         return (<>
            <input id={'proposal-vote-radio-' + item.id}
               type='radio'
               autoComplete='off'
               checked={item.id === selected}
               className='btn btn-check btn-primary'
               name='proposals'
               onChange={() => setSelected(item.id)} />
            <label 
               className='btn btn-outline-primary'
               htmlFor={'proposal-vote-radio-' + item.id}
               >{item.destination.name}</label>
         </>)})
      : null

   const rankOptions = !!proposals[0]
      ? proposals.map(item => (
         <div key={item.id}>{item.destination.name}</div>
      )) : [<div key='loading'>loading...</div>]

   const PickForm = () => {
      return (
         <div>
            {pickOptions}
         </div>
      )
   }

   const RankForm = () => {
      return (
         <SpringList>
            {rankOptions}
         </SpringList>
      )
   }

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

export default NewProposalVoteForm