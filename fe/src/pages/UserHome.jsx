import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LocationSearchPanel from '../components/LocationSearchPanel'

import userLogo from '../assets/user.png'

const UserHome = () => 
  {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)

    const panelRef = useRef(null)
    const panelCloseIconRef = useRef(null)

    const submitHandler = () =>
      {
        e.preventDefault()
      }

    useGSAP(() =>
      {
        if(panelOpen)
          {
            gsap.to(panelRef.current,
              {
                height : '70%',
                padding : 24
              })
            gsap.to(panelCloseIconRef.current,
              {
                opacity : 1
              })
          }
        else
          {
            gsap.to(panelRef.current,
              {
                height : '0%',
                padding : 0
              })
            gsap.to(panelCloseIconRef.current,
              {
                opacity : 0
              })
          }
      }, [panelOpen])

    return (
      <div className='h-screen relative overflow-hidden'>
        <img className='w-16 ml-5 mt-5 absolute' src={userLogo} alt="Uber Logo" />

        <div className='h-screen w-screen'>
          <img className='h-full w-full object-cover' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />      
        </div> 

        <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
          <div className='bg-white relative p-6 h-[30%] rounded-t'>
            <h5
              ref={panelCloseIconRef}
              onClick={() =>
                {
                  setPanelOpen(false)
                }}
              className='ri-arrow-down-wide-line absolute opacity-0 right-6 text-3xl'>
            </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <div className='bg-gray-600 absolute h-16 w-1 top-24 left-10 rounded-full'></div>
            <form onSubmit={(e) =>
              {
                submitHandler(e)
              }}>
              <input 
                onClick={() =>
                {
                  setPanelOpen(true)
                }}
                className='bg-[#eee] w-full px-8 py-2 mt-6 text-base placeholder:text-base rounded-lg' 
                type="text" 
                placeholder='Enter Pickup Location'
                value={pickup}
                onChange={(e) =>
                  {
                    setPickup(e.target.value)
                  }} />
              <input
                onClick={() =>
                  {
                    setPanelOpen(true)
                  }}
                className='bg-[#eee] w-full px-8 py-2 mt-3 text-base placeholder:text-base rounded-lg' 
                type="text" 
                placeholder='Enter Destination'
                value={destination}
                onChange={(e) =>
                  {
                    setDestination(e.target.value)
                  }} />
            </form>
          </div>
          <div ref={panelRef} className='bg-white h-0'>
            <LocationSearchPanel />
          </div>
        </div>

        <div>
          <Link to='/user/logout'
            className='bg-[#000000] flex items-center justify-center text-white font-semibold rounded px-4 py-2 text-lg'>
              logout
          </Link>
        </div>
      </div>
    )
  }

export default UserHome