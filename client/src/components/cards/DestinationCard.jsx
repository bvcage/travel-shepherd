// import './cards.css'

function DestinationCard (props) {
   const { destination, onClick } = props
   const { id, municipality, region, country } = destination

   const title = !!municipality ? municipality : country.name
   const subtitle = (title === municipality) ? (!!region ? region + ', ' : '') + country.name : null
   const imgSrc = "https://picsum.photos/200"

   function capitalize (string) {
      if (!string) return
      let stringAry = string.split(' ')
      stringAry = stringAry.map(word => {
         word = word.toLowerCase()
         let index = 0
         let first_ltr = word.charAt(index)
         while (!first_ltr.match(/[a-z]/i)) {
            index += 1
            first_ltr = word.charAt(index)
         }
         first_ltr = first_ltr.toUpperCase()
         return word.slice(0, index) + first_ltr + word.slice(index + 1)
      })
      return stringAry.join(' ')
   }

   function handleClick () {
      onClick(id)
   }

   return (
      <div className='container p-2'>
         <div className='card' onClick={handleClick}>
            <img className="card-img-top" src={imgSrc} alt={country.name} />
            <div className='card-body'>
               <h5 className='card-title'>{capitalize(title)} {country.flag}</h5>
               <h6 className='card-subtitle'>{capitalize(subtitle)}</h6>
            </div>
         </div>
      </div>
   )
}

export default DestinationCard