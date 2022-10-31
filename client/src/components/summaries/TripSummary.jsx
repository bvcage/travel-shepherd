import React from 'react'

function TripSummary (props) {
   const { trip } = props
   const { id, name, num_days, start_date, end_date, voting_deadline } = trip
   
   return (
      <div>
         <h6> trip summary </h6>
         <ul>
            <li>name: {name}</li>
            <li>{num_days} { num_days > 1 ? 'days' : 'day' }</li>
            <li>voting closes {voting_deadline}</li>
            <li>depart: {start_date}</li>
            <li>return: {end_date}</li>
         </ul>
      </div>
   )
}

export default TripSummary