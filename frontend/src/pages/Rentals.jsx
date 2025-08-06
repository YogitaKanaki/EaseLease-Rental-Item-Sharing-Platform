import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyRentals } from '../assets/assets'

const Rentals = () => {

    const [myRentals,setMyRentals]=useState([])
    const {currency}=useAppContext()

    const fetchMyRentals=async()=>{
        setMyRentals(dummyRentals)
    }

    useEffect(()=>{
        fetchMyRentals()
    },[])

  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My Rentals</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {myRentals.map((rental,index)=>(
            <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                <p className='flex justify-between md:items-center text-gray-400
                md:font-medium max-md:flex-col'>
                    <span>RentalId:{rental._id}</span>
                    <span>Payment:{rental.paymentType}</span>
                    <span>Total Amount:{currency}{rental.amount}</span>
                </p>
                {rental.items.map((item,index)=>(
                    <div key={index} className={`relative bg-white text-gray-500/70 ${
                        rental.items.length != index + 1 && "border-b"}
                        border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4
                        py-5 md:gap-6 w-full max-w-4xl`}>

                        <div className='flex items-center mb-4 md:mb-0'>
                            <div className='bg-primary/10 p-4 rounded-lg'>
                                <img src={item.product.image[0]} className='w-16 h-16' />
                            </div>
                            <div className='ml-4'>
                                <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                <p>Category:{item.product.category}</p>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                            <p>Quantity:{item.quantity || "1"}</p>
                            <p>Start Date:{rental.startDate}</p>
                            <p>End Date:{rental.endDate}</p>
                        </div>
                        <p className='text-primary text-lg font-medium'>
                            Amount:{currency}{item.product.pricePerDay}
                        </p>

                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Rentals
