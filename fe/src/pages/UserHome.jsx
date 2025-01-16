import React, {useRef, useState} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LocationSearch from '../userComponents/LocationSearch'
import VehicleSelect from '../userComponents/VehicleSelect'
import ConfirmVehicle from '../userComponents/ConfirmVehicle'
import LookingDriver from '../userComponents/LookingDriver'
import ConfirmDriver from '../userComponents/ConfirmDriver'

import userLogo from '../assets/user.png'


const UserHome = () => 
  {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [locationSearchPanel, setLocationSearchPanel] = useState(false)
    const [vehicleSelectPanel, setVehicleSelectPanel] = useState(false)
    const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false)
    const [lookingDriverPanel, setLookingDriverPanel] = useState(false)
    const [confirmDriverPanel, setConfirmDriverPanel] = useState(false)

    const locationSearchPanelRef = useRef(null)
    const locationSearchIconRef = useRef(null)
    const vehicleSelectPanelRef = useRef(null)
    const confirmVehiclePanelRef = useRef(null)
    const lookingDriverPanelRef = useRef(null)
    const confirmDriverPanelRef = useRef(null)


    const submitHandler = () =>
      {
        e.preventDefault()
      }

    useGSAP(() =>
      {
        if(locationSearchPanel)
          {
            gsap.to(locationSearchPanelRef.current,
              {
                height : '70%',
                padding : 24
              })
            gsap.to(locationSearchIconRef.current,
              {
                opacity : 1
              })
          }
        else
          {
            gsap.to(locationSearchPanelRef.current,
              {
                height : '0%',
                padding : 0
              })
            gsap.to(locationSearchIconRef.current,
              {
                opacity : 0
              })
          }
      }, [locationSearchPanel])

    useGSAP(() =>
      {
        if(vehicleSelectPanel)
          {
            gsap.to(vehicleSelectPanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(vehicleSelectPanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [vehicleSelectPanel])

    useGSAP(() =>
      {
        if(confirmVehiclePanel)
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
      }, [confirmVehiclePanel])

    useGSAP(() =>
      {
        if(lookingDriverPanel)
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
      }, [lookingDriverPanel])

    useGSAP(() =>
      {
        if(confirmDriverPanel)
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
      }, [confirmDriverPanel])
      
    return (
      <div className='h-screen relative overflow-hidden'>
        <img className='absolute w-16 ml-5 mt-5' src={userLogo} alt="Uber Logo" />

        <div className='h-screen w-screen'>
          <img className='h-full w-full object-cover' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />      
        </div> 

        <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
          <div className='bg-white relative p-6 h-[30%] rounded-t'>
            <h5
              ref={locationSearchIconRef}
              onClick={() =>
                {
                  setLocationSearchPanel(false)
                }}
              className='ri-arrow-down-wide-line absolute opacity-0 right-6 text-2xl'>
            </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <div className='bg-black absolute h-16 w-1 top-24 right-10 rounded-full'>
            </div>
            <form onSubmit={(e) =>
              {
                submitHandler(e)
              }}>
              <input 
                onClick={() =>
                {
                  setLocationSearchPanel(true)
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
                    setLocationSearchPanel(true)
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

          <div ref={locationSearchPanelRef} className='bg-white h-0'>
            <LocationSearch setLocationSearchPanel={setLocationSearchPanel} setVehicleSelectPanel={setVehicleSelectPanel} />
          </div>
        </div>

        <div ref={vehicleSelectPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <VehicleSelect setVehicleSelectPanel={setVehicleSelectPanel} setConfirmVehiclePanel={setConfirmVehiclePanel} />
        </div>

        <div ref={confirmVehiclePanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmVehicle setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingDriverPanel={setLookingDriverPanel} />
        </div>

        <div ref={lookingDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <LookingDriver setLookingDriverPanel={setLookingDriverPanel} setConfirmDriverPanel={setConfirmDriverPanel} />
        </div>

        <div ref={confirmDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmDriver setConfirmDriverPanel={setConfirmDriverPanel}  />
        </div>

      </div>
    )
  }

export default UserHome