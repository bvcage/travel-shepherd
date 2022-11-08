import React from 'react'

function DefaultAddressForm (props) {
   const { place, onChange } = props
   const { street_number, street_name, street_type } = place

   if (!place) return <></>
   return (<>
      <div className='row'>
         <div className='col col-12 col-sm-4 col-md-3 col-lg-2 col-xl-1'>
            <div className='form-floating'>
               <input type='text'
                  name="street_number"
                  className='form-control'
                  placeholder='#'
                  value={street_number}
                  onChange={onChange} />
               <label>#</label>
            </div>
         </div>
         <div className='col col-sm'>
            <div className='form-floating'>
               <input type='text'
                  name="street_name"
                  className='form-control'
                  placeholder='street name'
                  value={street_name}
                  onChange={onChange} />
               <label>street name (e.g. Main)</label>
            </div>
         </div>
         <div className='col col-12 col-sm-4 col-md-3'>
            <div className='form-floating'>
               <input type='text'
                  name="street_type"
                  className='form-control'
                  placeholder='type'
                  value={street_type}
                  onChange={onChange} />
               <label>street type (e.g. Avenue)</label>
            </div>
         </div>
      </div>
   </>)
}

export default DefaultAddressForm