import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

import profilePhoto from '../assets/profilePhoto.jpg'

const CaptainDetails = () => 
  {
    const { captainContext } = useContext(CaptainDataContext)
    return (
      <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-4'>
              <img className='h-10 w-10 rounded-full' src={profilePhoto} alt="Profile Photo" />
              <h4 className='text-lg font-medium'>{console.log(captainContext)}</h4>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>Rs 250</h4>
              <p className='text-gray-600 text-sm'>Earned</p>
            </div>
          </div>
          <div className='bg-gray-100 rounded-2xl flex items-start justify-center gap-4 p-4 mt-4'>
            <div className='text-center'>
              <i className='ri-timer-2-line text-3xl font-thin'></i>
              <h5 className='text-lg font-medium'>10.5</h5>
              <p className='text-gray-600 text-sm'>Hours online</p>
            </div>
            <div className='text-center'>
              <i className='ri-speed-up-line text-3xl font-thin'></i>
              <h5 className='text-lg font-medium'>10.5</h5>
              <p className='text-gray-600 text-sm'>Hours online</p>
            </div>
            <div className='text-center'>
              <i className='ri-booklet-line text-3xl font-thin'></i>
              <h5 className='text-lg font-medium'>10.5</h5>
              <p className='text-gray-600 text-sm'>Hours online</p>
            </div>
          </div>
      </div>
    )
  }

export default CaptainDetails