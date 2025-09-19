import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
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
//import AddItems from './pages/AddItems'
import AdminLayout from './pages/admin/AdminLayout'

import Dashboard from './pages/admin/Dashboard'
import UserManagement from './pages/admin/UserManagement'
import ItemManagement from './pages/admin/ItemManagement'
import RentalsManagement from './pages/admin/RentalsMangement'
import DisputeReports from './pages/admin/DisputeReports'
import Update from './pages/Update'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import AdminLogin from './components/AdminLogin'
import AddItems from './pages/AddItems'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Help from './pages/Help'


const App = () => {

  const isAdminPath=useLocation().pathname.includes("admin");
  const {showUserLogin,isAdmin}=useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'> 

      {showUserLogin ? <Login/>:null}

      <Toaster/>

      {isAdminPath ? null : <Navbar/>}

      
      <div className={`${isAdminPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/rentnow' element={<RentNow/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/rentals' element={<Rentals/>} />
          <Route path='/listings' element={<Lends/>} />
          <Route path='/update' element={<Update/>} />
          <Route path='/addItem' element={<AddItems/>} />
          <Route path='/report' element={<Reports/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/help' element={<Help/>} />
          <Route path='/notifications' element={<Notifications/>} />
          <Route path='/admin' element={isAdmin ? <AdminLayout/> : <AdminLogin/>} >
            <Route index element={isAdmin ? <Dashboard/> : null}/>
        
            <Route path='user-management' element={<UserManagement/>}/>
            <Route path='item-management' element={<ItemManagement/>}/>
            <Route path='rentals-management' element={<RentalsManagement/>}/>
            <Route path='reports' element={<DisputeReports/>}/>
          </Route>

        </Routes>
      </div>

      {!isAdminPath && <Footer/>}

    </div>
  )
}

export default App
