import React from 'react'

function ErrorAlert (props) {
   const { errors, onClickClose } = props

   return (
      <div
         className="alert alert-warning"
         role="alert"
         style={{
            position: 'fixed',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '2rem',
            marginTop: '2rem',
            padding: '2rem',
            paddingTop: '3rem',
            textAlign: 'left',
            zIndex: '9999'
         }}>
            <button
               type='button'
               className='btn btn-close'
               onClick={onClickClose}
               style={{
                  position: 'fixed',
                  top: '1rem',
                  right: '1rem'
               }}/>
            {errors.map(err => <p key={err} className='mb-0'>{err}</p>)}
      </div>
   )
}

export default ErrorAlert