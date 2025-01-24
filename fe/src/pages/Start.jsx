import React from 'react'
import { Link } from 'react-router-dom'

import userLogo from '../assets/user.png'

const Start = () => 
  {
    return (
        <div className='bg-right bg-cover bg-[url(https://raw.githubusercontent.com/nithinsaichoudary/Uberwebclone/refs/heads/main/img/header-dual.webp)] h-screen flex flex-col justify-between w-full'>
          <img className='w-16 ml-5 mt-5' src={userLogo} alt="Uber Logo" />
          <div className='bg-white p-7'>
            <h2 className='text-3xl mb-7 font-bold '>Get started</h2>
            <Link to='/user/login' 
              className='bg-[#000000] flex items-center justify-center text-white font-semibold rounded px-4 py-2 text-lg '>
                Continue
            </Link>
          </div>
        </div>
      //tnjjqbs619@itmy.org
    )
  }

export default Start

