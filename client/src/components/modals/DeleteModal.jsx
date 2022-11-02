import React from 'react'

function DeleteModal (props) {
   const { record, recordType, onConfirm } = props
   return (
      <div id='deleteModal'
            className='modal fade'
            role='dialog'
            tabIndex='-1'
            aria-labelledby=''
            aria-hidden='true' >
         <div className='modal-dialog' role='document'>
            <div className='modal-content'>
               <div className='modal-heaer'>
                  <h1 className='modal-title'>delete {recordType}</h1>
               </div>
               <div className='modal-body'>
                  <p>
                     Are you sure that you want to permanently delete your {recordType}?
                     <br />
                     You cannot undo this later.
                  </p>
               </div>
               <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>cancel</button>
                  <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={onConfirm}>delete {record.name}</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DeleteModal