import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
    
    const [locationSearchPanel, setLocationSearchPanel] = useState(false)
    const [vehicleSelectPanel, setVehicleSelectPanel] = useState(false)
    const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false)
    const [lookingDriverPanel, setLookingDriverPanel] = useState(false)
    const [confirmDriverPanel, setConfirmDriverPanel] = useState(false)

    const locationSearchPanelRef = useRef(null)
    const vehicleSelectPanelRef = useRef(null)
    const confirmVehiclePanelRef = useRef(null)
    const lookingDriverPanelRef = useRef(null)
    const confirmDriverPanelRef = useRef(null)



    useGSAP(() =>
      {
        if(locationSearchPanel)
          {
            gsap.to(locationSearchPanelRef.current,
              {
                transform : 'translateY(0)',
              })
          }
        else
          {
            gsap.to(locationSearchPanelRef.current,
              {
                transform : 'translateY(100%)',
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
      <div className='h-screen'>
        <div>
          <img className='absolute w-16 ml-5 mt-5' src={userLogo} alt="Uber Logo" />
          <Link to='/user/logout' className='bg-white fixed flex items-center justify-center right-2 top-2 h-10 w-10 rounded-full'>
            <i className='ri-logout-box-r-line text-lg'></i>
          </Link>
        </div>

        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />      
        </div> 

        <div className='h-2/5 p-6 flex'>
            <button
              onClick={() =>
              {
                setLocationSearchPanel(true)
              }}
              className='bg-green-600 text-white w-full font-semibold p-10 rounded-lg'>
              Find a Ride
            </button>
        </div>
        <div ref={locationSearchPanelRef} className='bg-white h-screen w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <LocationSearch setLocationSearchPanel={setLocationSearchPanel} setVehicleSelectPanel={setVehicleSelectPanel} />
        </div>

        <div ref={vehicleSelectPanelRef} className='bg-white h-3/5 w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <VehicleSelect setVehicleSelectPanel={setVehicleSelectPanel} setConfirmVehiclePanel={setConfirmVehiclePanel} />
        </div>

        <div ref={confirmVehiclePanelRef} className='bg-white h-3/5 w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmVehicle setConfirmVehiclePanel={setConfirmVehiclePanel} setLookingDriverPanel={setLookingDriverPanel} />
        </div>

        <div ref={lookingDriverPanelRef} className='bg-white h-3/5 w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <LookingDriver setLookingDriverPanel={setLookingDriverPanel} setConfirmDriverPanel={setConfirmDriverPanel} />
        </div>

        <div ref={confirmDriverPanelRef} className='bg-white h-screen w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmDriver setConfirmDriverPanel={setConfirmDriverPanel}  />
        </div>

      </div>
    )
  }

export default UserHome