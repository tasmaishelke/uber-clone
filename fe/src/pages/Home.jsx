import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => 
  {
    return (
      <div>
        <div className='bg-right bg-cover bg-[url(https://raw.githubusercontent.com/nithinsaichoudary/Uberwebclone/refs/heads/main/img/header-dual.webp)] h-screen pt-8 flex justify-between flex-col w-full'>
          <img className='w-16 ml-5 mt-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
          <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get started</h2>
            <Link to='/user/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
          </div>
        </div>
      </div>
    )
  }

export default Home

