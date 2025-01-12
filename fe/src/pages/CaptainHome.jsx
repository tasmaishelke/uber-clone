import React from 'react'
import { Link } from 'react-router-dom'

import captainLogo from '../assets/captain.jpg'

const CaptainHome = () => {
  return (
    <div className='h-screen flex justify-between flex-col w-full'>
      <img className='w-16 ml-5 mt-5' src={captainLogo} alt="Uber Logo" />

      Captain Home
      <div className='p-7'>
        <Link to='/captain/logout'
          className='bg-[#000000] flex items-center justify-center text-white font-semibold rounded px-4 py-2 text-lg'>
            logout
        </Link>
      </div>
    </div>
  )
}

export default CaptainHome



