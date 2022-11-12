import './users.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'

function UserProfile (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const [refPara, {width: paraWidth}] = useMeasure()
   const [refBtn, {width: btnWidth}] = useMeasure()
   const navigate = useNavigate()
   const params = useParams()
   const user = useSelector(state => state.user)
   const [barcode, setBarcode] = useState()
   const [editable, setEditable] = useState(false)
   const [edits, setEdits] = useState({})

   const barcodeWidth = paraWidth - btnWidth
   const charWidth = 11
   const joinDate = new Date(user.created_at)
   const placeholder = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'


   useEffect(() => {
      let temp = user
      Object.entries(temp).forEach(([key, value]) => {
         if (value === null) value = ''
         temp[key] = value
      })
      setEdits({...temp})
   }, [user])

   const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'
   useEffect(() => {
      let newBarcode = []
      const numChars = Math.floor(barcodeWidth / charWidth)
      const pt1 = 'TS'
      const pt2 = 'WLD'
      const pt3 = user.last_name.toUpperCase()
      const pt4 = user.first_name.toUpperCase()
      const brk2 = pt1.length + 2
      const brk3 = brk2 + pt2.length + 3
      const brk4 = brk3 + pt3.length + 2

      for (let i=0; i < numChars; ++i) {
         switch (i) {
            case 0:
               newBarcode.push(pt1)
               i+=pt1.length- 1
               break
            case brk2:
               newBarcode.push(pt2)
               i+=pt2.length- 1
               break
            case brk3:
               newBarcode.push(pt3)
               i+=pt3.length-1
               break
            case brk4:
               newBarcode.push(pt4)
               i+=pt4.length-1
               break
            default:
               newBarcode.push("<")
         }
      }
      newBarcode.push("\n")
      for (let i=0; i < numChars; ++i) {
         switch (true) {
            case (i > numChars - 3):
               newBarcode.push("TS")
               i+=2
               break
            case (i > numChars / 2):
               newBarcode.push("<")
               break
            default:
               newBarcode.push(characters.charAt(Math.floor(Math.random() * characters.length)))
         }
      }
      setBarcode(newBarcode.join(''))
   }, [barcodeWidth, user])

   function handleChange (e) {
      setEdits({...edits,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      if (!editable) return setEditable(!editable)
      setEditable(!editable)
      const patch = {...edits,
         'middle_name': edits.middle_initial
      }
      // Object.entries(patch).forEach(([key, value]) => {
      //    if (value === '') value = null
      //    patch[key] = value
      // })
      fetch(`/users/${edits.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(patch)
      }).then(r=>{
         if (r.ok) r.json().then(user => {
            dispatch({type: 'user/userUpdated', payload: {...user}})
            localStorage.setItem('user', JSON.stringify(user))
         })
         else console.log(r)
      })
   }

   return (
      <div className='container'>
         <div id='user-profile-container'>
            <div id='user-profile-main'>
               <div className='container'>
                  <div className='row'>
                     <div className='col col-12 col-sm-5'>
                        <div id='user-profile-photo'>
                           {<img src={!!user.photo_url ? user.photo_url : placeholder} alt={`${user.username} avatar`} />}
                        </div>
                     </div>
                     <div className='col col-12 col-sm-7'>
                        <div id='user-profile-info'>
                           <form id='user-passport' onSubmit={handleSubmit}>
                              <div className='container'>
                                 <div className='row'>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             name='last_name'
                                             type='text'
                                             className='form-control'
                                             disabled={!editable}
                                             placeholder='surname'
                                             value={edits.last_name}
                                             onChange={handleChange} />
                                          <label>surname</label>
                                       </div>
                                    </div>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             name='first_name'
                                             type='text'
                                             className='form-control'
                                             disabled={!editable}
                                             placeholder='given name'
                                             value={edits.first_name}
                                             onChange={handleChange} />
                                          <label>given name</label>
                                       </div>
                                    </div>
                                    <div className='col col-2'>
                                       <div className='form-floating'>
                                          <input
                                             name='middle_initial'
                                             type='text'
                                             className='form-control'
                                             disabled={!editable}
                                             placeholder='MI'
                                             value={edits.middle_initial}
                                             onChange={handleChange} />
                                          <label>MI</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className='row'>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             name='email'
                                             type='text'
                                             className='form-control'
                                             disabled={true}
                                             placeholder='email'
                                             value={user.email} />
                                          <label>email</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className='row'>
                                    <div className='col col-5'>
                                       <div className='form-floating'>
                                          <input
                                             name='username'
                                             type='text'
                                             className='form-control'
                                             disabled={true}
                                             placeholder='username'
                                             value={user.username} />
                                          <label>username</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className='row'>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             type={editable ? 'date' : 'text'}
                                             name='date_of_birth'
                                             className='form-control'
                                             disabled={!editable}
                                             placeholder='date of birth'
                                             value={editable ? edits.date_of_birth : (new Date(edits.date_of_birth)).toDateString()}
                                             onChange={handleChange} />
                                          <label>date of birth</label>
                                       </div>
                                    </div>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             type='text'
                                             className='form-control'
                                             disabled={true}
                                             placeholder='date of issue'
                                             value={joinDate.toDateString()} />
                                          <label>date of issue</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div className='row'>
                                    <div className='col'>
                                       <div className='form-floating'>
                                          <input
                                             name='last_destination_visited'
                                             type='text'
                                             className='form-control'
                                             disabled={!editable}
                                             placeholder='last visited'
                                             value={!!edits.last_destination_visited 
                                                ? edits.last_destination_visited 
                                                : editable ? null : 'location unknown'}
                                             onChange={handleChange} />
                                          <label>last visited</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id='user-profile-barcode'>
               <p ref={refPara}>
                  <button
                     ref={refBtn}
                     type='submit'
                     className={editable ? 'btn btn-secondary edit-btn' : 'btn btn-outline-secondary edit-btn'}
                     form='user-passport'
                     >{editable ? 'save' : 'edit'}</button>
                  {barcode}
               </p>
            </div>
            {/* <div className='container'>
               <div className='row'>
                  <div className='col col-12 col-md-5'>
                     {!!user.photo_url ? <img src={user.photo_url} alt={`${user.username} avatar`} /> : null}
                     <h2>{user.username}</h2>
                     <button type='button'
                        className='btn btn-secondary'
                        onClick={() => navigate('edit')}
                        >edit</button>
                  </div>
                  <div className='col col-12 col-md-7'>
                     <h3>{user.first_name} {user.last_name}</h3>
                     <h4>birthday: {user.date_of_birth}</h4>
                     <h4>email: {user.email}</h4>
                  </div>
               </div>
               <div className='row'>
                  <div className='col'>
                     <div id='user-profile-barcode'>
                        <p>&lt;</p>
                     </div>
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   )
}

export default UserProfile