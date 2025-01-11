import React from 'react'
import { Link } from 'react-router-dom'


const CaptainHome = () => {
  return (
    <div>
      Captain Home
      <div>
        <Link to='/captain/logout'>
            <button 
              className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg '>
                logout
            </button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainHome