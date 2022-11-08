import React from 'react'

function DestinationSummary (props) {
   const { destination } = props
   return (
      <div className='container'>
         <h4>summary</h4>
         <p>{destination.summary}</p>
         <p>{destination.description}</p>
      </div>
   )
}

export default DestinationSummary