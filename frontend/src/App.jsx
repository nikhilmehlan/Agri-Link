import React, { useState, useContext } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import Scan from './pages/Scan/Scan'
import Insurance from './pages/Insurance/Insurance'

import { StoreContext } from './Context/StoreContext'
import AgriBot from './pages/AgriBot/AgriBot'

const App = () => {
  const {token} = useContext(StoreContext);
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/verify' element={<Verify />}/>

          {token && (
            <>
              <Route path='/scan' element={<Scan />} />
              <Route path='/insurance' element={<Insurance />} />
              <Route path='/agribot' element={<AgriBot/>} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
