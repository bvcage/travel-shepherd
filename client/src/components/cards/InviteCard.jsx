// import '../../assets/css/cards.css'

function InviteCard (props) {
   const { invite } = props
   const { invite_status, user } = invite

   return (
      <div className='card'>
         <div className='card-body'>
            <div className='row'>
               <div className='col'>
                  {user.full_name}
               </div>
               <div className='col'>
                  {user.email}
               </div>
               <div className='col-auto'>
                  {invite_status.name}
               </div>
            </div>
         </div>
      </div>
   )
}

export default InviteCard