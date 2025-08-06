import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import RentNow from './pages/RentNow'
import AddAddress from './pages/AddAddress'
import Rentals from './pages/Rentals'
import Lends from './pages/Lends'
import AddItems from './pages/AddItems'


const App = () => {
  const {showUserLogin}=useAppContext()
  return (
    <div>

      {showUserLogin?<Login/>:null}

      <Toaster/>

      <Navbar/>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 '>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/rentnow' element={<RentNow/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/rentals' element={<Rentals/>} />
          <Route path='/listings' element={<Lends/>} />
          <Route path='/addItem' element={<AddItems/>} />

        </Routes>
      </div>

      <Footer/>

    </div>
  )
}

export default App
