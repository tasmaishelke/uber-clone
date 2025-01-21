import React, { useState } from 'react'

const LocationSearch = (props) => 
  {
    // sample array for location
    const location = 
      [
        "6b, Near taszs cafe, mumbai",
        "5b, Near shelke cafe, mumbai",
        "4b, Near vipra cafe, mumbai",
        "3b, Near vipul cafe, mumbai",
        "2b, Near niteen cafe, mumbai",
        "1b, Near viraj cafe, mumbai",
      ]

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')

    const submitHandler = (e) =>
      {
        e.preventDefault()
        console.log(pickup, destination);
      }

    return (
      <div>
        <div>
          <h5
            onClick={() =>
              {
                props.setLocationSearchPanel(false)
              }}
            className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
          </h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) =>
            {
              submitHandler(e)
            }}>
            <input 
              className='bg-[#eee] w-full px-8 py-2 mt-6 text-base placeholder:text-base rounded-lg' 
              type="text" 
              placeholder='Enter Pickup Location'
              value={pickup}
              onChange={(e) =>
                {
                  setPickup(e.target.value)
                }} />
            <input
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
        {
          location.map((element, index) =>
            {
              return(
                <div onClick={() =>
                  {
                    props.setVehicleSelectPanel(true)
                    props.setLocationSearchPanel(false)
                  }} 
                  key={index}
                  className='flex gap-4 items-center p-2 my-2 justify-start border-2 active:border-black rounded-xl'>
                <h2 className='bg-[#eee] h-6 w-6 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                <h4 className='font-medium text-sm'>{element}</h4>
                </div>)
            })
        }
      </div>
    )
  }

export default LocationSearch