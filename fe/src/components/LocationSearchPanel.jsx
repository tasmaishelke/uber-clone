import React from 'react'

const LocationSearchPanel = (props) => 
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
    return (
      <div>
        {
          location.map((element, index) =>
            {
              return(
                <div onClick={() =>
                  {
                    props.setVehiclePanelOpen(true)
                    props.setLocationPanelOpen(false)
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

export default LocationSearchPanel