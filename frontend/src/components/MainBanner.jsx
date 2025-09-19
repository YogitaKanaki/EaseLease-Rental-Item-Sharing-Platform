import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative w-full max-w-[700px] h-[250px] mx-auto rounded-lg overflow-hidden">
      {/* Background image */}
      <img
        src={assets.banner1}
        alt="banner"
        className="absolute inset-0 w-[110%] h-full object-cover left-1/2 -translate-x-1/2"
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center md:items-start justify-center h-full px-6 md:pl-12 text-white">
        <h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left leading-tight lg:leading-snug drop-shadow-lg"
        >
          "Rent it. Use it. Return it."
        </h1>

        <div className="flex items-center mt-6 gap-4 font-medium">
          

          <Link
            to={'/products'}
            className="group hidden md:flex items-center gap-2 px-8 py-3 bg-white text-black rounded cursor-pointer hover:bg-gray-200"
          >
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow}
              alt="arrow"
            />
          </Link>
        </div>
      </div>

      
    </div>
  )
}

export default MainBanner
