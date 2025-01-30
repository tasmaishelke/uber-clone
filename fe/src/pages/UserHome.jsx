import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { SocketDataContext } from '../context/SocketContext'

import LocationSearch from '../userComponents/LocationSearch'
import VehicleSelect from '../userComponents/VehicleSelect'
import ConfirmVehicle from '../userComponents/ConfirmVehicle'
import LookingDriver from '../userComponents/LookingDriver'
import ConfirmDriver from '../userComponents/ConfirmDriver'

import userLogo from '../assets/user.png'


const UserHome = () => 
  {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const [locationSearchPanel, setLocationSearchPanel] = useState(false)
    const [vehicleSelectPanel, setVehicleSelectPanel] = useState(false)
    const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false)
    const [lookingDriverPanel, setLookingDriverPanel] = useState(false)
    const [confirmDriverPanel, setConfirmDriverPanel] = useState(false)

    const [originSuggestion, setOriginSuggestion] = useState([])
    const [destinationSuggestion, setDestinationSuggestion] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)

    const locationSearchPanelRef = useRef(null)
    const vehicleSelectPanelRef = useRef(null)
    const confirmVehiclePanelRef = useRef(null)
    const lookingDriverPanelRef = useRef(null)
    const confirmDriverPanelRef = useRef(null)

    const { userContext } = useContext(UserDataContext)
    const { socket } = useContext(SocketDataContext)
    
    useEffect(() =>
      {
        socket.emit('join',
          {
            userType : 'user',
            userId : userContext._id
          })
      }, [userContext])

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
      
    const handleOriginChange = async(e) =>
      {
        setOrigin(e.target.value)
        try 
          {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`,
              {
                params : 
                  {
                    input : e.target.value
                  },
                headers : 
                  {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                  }
              })
            setOriginSuggestion(res.data)
          }
        catch(error)
          {
            console.log(error);            
            // throw new Error("Failed to fetch suggestions. Please try again later.")
          }
      }
  
    const handleDestinationChange = async(e) =>
      {
        setDestination(e.target.value)
        try 
          {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`,
              {
                params : 
                  {
                    input : e.target.value
                  },
                headers : 
                  {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                  }
              })
            setDestinationSuggestion(res.data)
          }
        catch(error)
          {
            console.log(error);            
            // throw new Error("Failed to fetch suggestions. Please try again later.")
          }
      }
      
    const findTrip = async() =>
      {
        setLocationSearchPanel(false)
        setVehicleSelectPanel(true)
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
          {
            params : 
              {
                origin,
                destination
              },
            headers : 
              {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
          })
        setFare(res.data)
      }

    const createRide = async() =>
      {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create-ride`,
          {
            origin,
            destination,
            vehicleType
          },
          {
            headers : 
              {
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
          }) 
        console.log(res.data);
               
      }

    const submitHandler = (e) =>
      {
        e.preventDefault()
      }
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
          <div>
            <h5
              onClick={() =>
                {
                  setLocationSearchPanel(false)
                }}
              className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
            </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e) =>
              {
                submitHandler(e)
              }}>
              <input
                onClick={() =>
                  {
                    setActiveField('origin')
                  }}
                className='bg-[#eee] w-full px-8 py-2 mt-6 text-base placeholder:text-base rounded-lg' 
                type="text" 
                placeholder='Enter Origin'
                value={origin}
                onChange={handleOriginChange} />
              <input
                onClick={() =>
                  {
                    setActiveField('destination')
                  }}
                className='bg-[#eee] w-full px-8 py-2 mt-3 text-base placeholder:text-base rounded-lg' 
                type="text" 
                placeholder='Enter Destination'
                value={destination}
                onChange={handleDestinationChange} />
              <button 
                onClick={findTrip}
                className='bg-green-600 text-white w-full mt-4 font-semibold p-2 rounded-lg'>
                Find Trip
              </button>            
            </form>
          </div>
          <LocationSearch
            suggestion={activeField === 'origin' ? originSuggestion : destinationSuggestion}
            setOrigin={setOrigin}
            setDestination={setDestination}
            activeField={activeField} />
        </div>

        <div ref={vehicleSelectPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <VehicleSelect
            fare={fare}
            setVehicleType={setVehicleType}
            setVehicleSelectPanel={setVehicleSelectPanel}
            setConfirmVehiclePanel={setConfirmVehiclePanel} />
        </div>

        <div ref={confirmVehiclePanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmVehicle
            origin={origin}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
            setConfirmVehiclePanel={setConfirmVehiclePanel}
            setLookingDriverPanel={setLookingDriverPanel} />
        </div>

        <div ref={lookingDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <LookingDriver
            origin={origin}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setLookingDriverPanel={setLookingDriverPanel}
            setConfirmDriverPanel={setConfirmDriverPanel} />
        </div>

        <div ref={confirmDriverPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmDriver setConfirmDriverPanel={setConfirmDriverPanel}  />
        </div>

      </div>
    )
  }

export default UserHome