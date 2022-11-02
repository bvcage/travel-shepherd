import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginBtn (props) {
   const navigate = useNavigate()
   return (
      <button className='btn btn-primary' onClick={() => navigate('login')}>login</button>
   )
}

export default LoginBtn