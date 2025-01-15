import React, {useRef, useState} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmVehicle from '../components/ConfirmVehicle'
import LookingDriver from '../components/LookingDriver'
import ConfirmDriver from '../components/ConfirmDriver'

import userLogo from '../assets/user.png'


const UserHome = () => 
  {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [locationPanelOpen, setLocationPanelOpen] = useState(false)
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
    const [confirmVehiclePanelOpen, setConfirmVehiclePanelOpen] = useState(false)
    const [lookingDriverPanelOpen, setLookingDriverPanelOpen] = useState(false)
    const [confirmDriverPanelOpen, setConfirmDriverPanelOpen] = useState(false)

    const locationPanelRef = useRef(null)
    const locationPanelCloseIconRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmVehiclePanelRef = useRef(null)
    const lookingDriverPanelRef = useRef(null)
    const confirmDriverPanelRef = useRef(null)


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

    useGSAP(() =>
      {
        if(confirmVehiclePanelOpen)
          {
            gsap.to(confirmVehiclePanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(confirmVehiclePanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [confirmVehiclePanelOpen])

    useGSAP(() =>
      {
        if(lookingDriverPanelOpen)
          {
            gsap.to(lookingDriverPanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(lookingDriverPanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [lookingDriverPanelOpen])

    useGSAP(() =>
      {
        if(confirmDriverPanelOpen)
          {
            gsap.to(confirmDriverPanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(confirmDriverPanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [confirmDriverPanelOpen])
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
          <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} />
        </div>

        <div ref={confirmVehiclePanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmVehicle setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} setLookingDriverPanelOpen={setLookingDriverPanelOpen} />
        </div>

        <div ref={lookingDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <LookingDriver setLookingDriverPanelOpen={setLookingDriverPanelOpen} setConfirmDriverPanelOpen={setConfirmDriverPanelOpen} />
        </div>

        <div ref={confirmDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmDriver setConfirmDriverPanelOpen={setConfirmDriverPanelOpen}  />
        </div>

      </div>
    )
  }

export default UserHome