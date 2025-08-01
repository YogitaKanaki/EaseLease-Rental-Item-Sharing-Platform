import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.banner1} alt='banner' className='w-full hidden md:block' />
      <img src={assets.banner1} alt='banner' className='w-full md:hidden' />

      <div className='absolute inset-0 flex flex-col items-center md:items-start 
        justify-start px-6 md:pl-20 lg:pl-28 pt-16 md:pt-24'>

        <h1
          className='text-3xl md:text-4xl lg:text-5xl font-bold 
          text-center md:text-left max-w-80 md:max-w-lg 
          leading-tight lg:leading-snug'
        >
          "Rent it. Use it. Return it."
        </h1>

        <div className='flex items-center mt-8 gap-4 font-medium'>
          <Link
            to={'/products'}
            className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary 
              hover:bg-primary-dull transition rounded text-white cursor-pointer'
          >
            Shop Now
            <img
              className='md:hidden transition group-focus:translate-x-1'
              src={assets.arrow}
              alt='arrow'
            />
          </Link>

          <Link
            to={'/products'}
            className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'
          >
            Explore Deals
            <img
              className='transition group-hover:translate-x-1'
              src={assets.black_arrow}
              alt='arrow'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
