import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import SelectUser from './components/management/mainLog.jsx'
import Donor_login from './components/management/userRegister.jsx'
import Shopkeeper_login from './components/management/shopRegister.jsx'
import Institute_login from './components/management/instituteRegister.jsx'
import Navbar from './components/Header/Header.jsx'
import UserLogin from './components/management/userLogin.jsx'
import InstituteHome from './components/Home/InstituteHome.jsx'
import ShopkeeperHome from './components/Home/ShopkeeperHome.jsx'
import InstituteLogin from './components/management/InstituteLogin.jsx'
import ShopkeeperLogin from './components/management/shopkeeterLogin.jsx'
import UserHome from './components/Home/userHome.jsx'
import OTPVerification from './components/management/OTPVerification.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Navbar />} />
      //register routers
      <Route path='register' element={ <SelectUser/>} />
      <Route path='user-register' element={ <Donor_login/>} />
      <Route path='institute-register' element={ <Institute_login/>} />
      <Route path='shopkeeper-register' element={ <Shopkeeper_login/>} />

      //login router
      <Route path='user-login' element={ <UserLogin/>} />
      <Route path='institute-login' element={ <InstituteLogin/>} />
      <Route path='shopkeeper-login' element={ <ShopkeeperLogin/>} />



      //after login home routers
      <Route path='user-home' element={ <UserHome/>} />
      <Route path='institute-home' element={ <InstituteHome/>} />
      <Route path='shopkeeper-home' element={ <ShopkeeperHome/>} />



      <Route path='otp-verification' element={<OTPVerification/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
