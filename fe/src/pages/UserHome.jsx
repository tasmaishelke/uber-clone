import React from 'react'
import { Link } from 'react-router-dom'


const UserHome = () => {
  return (
    <div>
      User Home
      <div>
        <Link to='/user/logout'>
            <button 
              className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg '>
                logout
            </button>
        </Link>
      </div>
    </div>
  )
}

export default UserHome