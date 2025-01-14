import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LocationSearchPanel from '../components/LocationSearchPanel'

import userLogo from '../assets/user.png'
import carImg from '../assets/carImg.png'
import bikeImg from '../assets/bikeImg.png'
import autoImg from '../assets/autoImg.png'

const UserHome = () => 
  {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [locationPanelOpen, setLocationPanelOpen] = useState(false)
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

    const locationPanelRef = useRef(null)
    const locationPanelCloseIconRef = useRef(null)
    const vehiclePanelRef = useRef(null)


    const submitHandler = () =>
      {
        e.preventDefault()
      }

    useGSAP(() =>
      {
        if(locationPanelOpen)
          {
            gsap.to(locationPanelRef.current,
              {
                height : '70%',
                padding : 24
              })
            gsap.to(locationPanelCloseIconRef.current,
              {
                opacity : 1
              })
          }
        else
          {
            gsap.to(locationPanelRef.current,
              {
                height : '0%',
                padding : 0
              })
            gsap.to(locationPanelCloseIconRef.current,
              {
                opacity : 0
              })
          }
      }, [locationPanelOpen])

    useGSAP(() =>
      {
        if(vehiclePanelOpen)
          {
            gsap.to(vehiclePanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(vehiclePanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [vehiclePanelOpen])

    return (
      <div className='h-screen relative overflow-hidden'>
        <img className='w-16 ml-5 mt-5 absolute' src={userLogo} alt="Uber Logo" />

        <div className='h-screen w-screen'>
          <img className='h-full w-full object-cover' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />      
        </div> 

        <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
          <div className='bg-white relative p-6 h-[30%] rounded-t'>
            <h5
              ref={locationPanelCloseIconRef}
              onClick={() =>
                {
                  setLocationPanelOpen(false)
                }}
              className='ri-arrow-down-wide-line absolute opacity-0 right-6 text-2xl'>
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
                  setLocationPanelOpen(true)
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
                    setLocationPanelOpen(true)
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
          <div ref={locationPanelRef} className='bg-white h-0'>
            <LocationSearchPanel setLocationPanelOpen={setLocationPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <h5
            onClick={() =>
              {
                setVehiclePanelOpen(false)
              }}
              className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
          </h5>
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

          <div className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
            <img className='h-12' src={carImg} alt="Car Image" />
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberGo <i className='ri-user-3-fill'>4</i></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs 190</h2>
          </div>

          <div className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
            <img className='h-12' src={bikeImg} alt="Bike Image" />
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberMoto <i className='ri-user-3-fill'>1</i></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs 70</h2>
          </div>

          <div className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
            <img className='h-12' src={autoImg} alt="Auto Image" />
            <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberAuto <i className='ri-user-3-fill'>3</i></h4>
              <h5 className='font-medium text-sm'>1 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Rickshaw rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs 100</h2>
          </div>
        </div>

      </div>
    )
  }

export default UserHome