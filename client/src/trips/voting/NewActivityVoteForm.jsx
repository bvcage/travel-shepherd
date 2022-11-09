import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import NominationCard from './NominationCard'

function NewActivityVoteForm (props) {
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   const destination = useSelector(state => state.trip.destination)
   const [nominations, setNominations] = useState([])
   const [choices, setChoices] = useState({
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      obj1: '',
      obj2: '',
      obj3: '',
      obj4: ''
   })
   const [search, setSearch] = useState({text: '', num: 0})
   const [showChoices, setShowChoices] = useState(false)

   // navigation
   const location = useLocation()
   const navigate = useNavigate()
   const path = location.pathname.split('/')
   path.pop()
   const backpath = !!location.state && !!location.state.from ? location.state.from : path.join('/')

   useEffect(() => {
      if (!!trip.id && !nominations[0]) {
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setNominations)
            else console.log(r)
         })
      }
   }, [trip, nominations])

   function handleChange (e) {
      setChoices({...choices,
         ['str' + e.target.name]: e.target.value
      })
      setSearch({num: e.target.name, text: e.target.value})
      if (e.target.value === '') setShowChoices(false)
      else setShowChoices(true)
   }

   function handleSubmit (e) {
      e.preventDefault()
      console.log(choices)
      let temp = {...choices}
      for (let i=0; i<Object.keys(choices).length / 2; ++i) {
         delete temp['str' + (i+1)]
      }
      Object.values(temp).forEach((activity, i) => {
         if (!!activity.id) {
            const post = {
               'trip_id': trip.id,
               'user_id': user.id,
               'activity_id': activity.id,
               'rank': i+1
            }
            fetch('/activity_votes', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(post)
            }).then(r=>{
               if (r.ok) r.json().then(() => navigate(backpath))
               else console.log(r)
            })
         }
      })
   }

   function validateChoice (e) {
      setTimeout(() => setShowChoices(false), 100)
      if (e.target.value === '') return setChoices({...choices, ['obj' + e.target.name]: ''})
      if (choices['obj' + e.target.name].name === e.target.value) return
      const userInput = e.target.value.toLowerCase()
      const matches = nomOptions.filter(activity => activity.name.toLowerCase().includes(userInput))
      if (matches.length > 0) {
         setChoices({...choices,
            ['obj' + e.target.name]: matches[0],
            ['str' + e.target.name]: matches[0].name
         })
      } else {
         setChoices({...choices,
            ['obj' + e.target.name]: '',
            ['str' + e.target.name]: ''
         })
         setSearch({num: 0, text: ''})
      }
   }

   const nomOptions = !!nominations 
      ? nominations
         .filter(activity => activity.name.toLowerCase().includes(search.text.toLowerCase()))
         .filter(activity => !Object.values(choices).includes(activity.name))
      : null

   const nomCards = !!nomOptions ?
      nomOptions
         .map(activity => {
            return (
               <div key={'nom=' + activity.id}
                  onClick={() => {
                     setChoices({...choices,
                        ['obj' + search.num]: activity,
                        ['str' + search.num]: activity.name
                     })
                     setShowChoices(false)
                  }}
                  >{activity.name}</div>
            )
         })
      : null

   const cards = !!nominations ? nominations.map(activity => {
      return (
         <div key={activity.id} className='col col-12 col-md-6 col-lg-4'>
            <NominationCard activity={activity} />
         </div>
      )
   }) : null
   
   return (
      <div className='container'>
         <h3>nominations</h3>
         <div className='row'>
            {cards}
         </div>
         <h3>my rankings</h3>
         <form onSubmit={handleSubmit}>
            <div className='row'>
               <div className='col'>
                  <div className='form-floating'>
                     <input
                        name='1'
                        type='text'
                        className='form-control'
                        placeholder='absolute must do'
                        value={choices.str1}
                        onBlur={validateChoice}
                        onChange={handleChange} />
                     <label>absolute must-do</label>
                  </div>
               </div>
            </div>
            <div className='row'>
               <div className='col col-12 col-lg-4'>
                  <div className='form-floating'>
                     <input
                        name='2'
                        type='text'
                        className='form-control'
                        placeholder='second choice'
                        value={choices.str2}
                        onBlur={validateChoice}
                        onChange={handleChange} />
                     <label>second choice</label>
                  </div>
               </div>
               <div className='col col-12 col-lg-4'>
                  <div className='form-floating'>
                     <input
                        name='3'
                        type='text'
                        className='form-control'
                        placeholder='third choice'
                        value={choices.str3}
                        onBlur={validateChoice}
                        onChange={handleChange} />
                     <label>third choice</label>
                  </div>
               </div>
               <div className='col col-12 col-lg-4'>
                  <div className='form-floating'>
                     <input
                        name='4'
                        type='text'
                        className='form-control'
                        placeholder='fourth choice'
                        value={choices.str4}
                        onBlur={validateChoice}
                        onChange={handleChange} />
                     <label>fourth choice</label>
                  </div>
               </div>
            </div>
            <div className='dropdown-list'>
               {showChoices ? nomCards : null}
            </div>
            <button type='submit' className='btn btn-primary'>submit votes</button>
         </form>
      </div>
   )
}

export default NewActivityVoteForm