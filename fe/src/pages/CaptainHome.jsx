import React from 'react'
import { Link } from 'react-router-dom'

import captainLogo from '../assets/captain.jpg'

const CaptainHome = () => {
  return (
    <div className='h-screen flex justify-between flex-col w-full'>
      <img className='w-16 ml-5 mt-5' src={captainLogo} alt="Uber Logo" />

      Captain Home
      
    </div>
  )
}

export default CaptainHome



