import '../../assets/css/cards.css'

function ProposalCard (props) {
   const { proposal, onClick } = props
   const { destination, user } = proposal

   function handleClick () {
      onClick(destination.id)
   }

   if (!proposal) return <></>
   if (!destination) return <></>
   return (
      <div className='card' onClick={handleClick}>
         <div className='card-body'>
            <h5 className='card-title'>{destination.label}&nbsp;{destination.country.flag}</h5>
            <h6 className='card-subtitle'>proposed by {user.first_name}</h6>
         </div>
      </div>
   )
}

export default ProposalCard