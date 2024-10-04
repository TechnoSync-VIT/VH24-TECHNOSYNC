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



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Navbar />} />
      {/* <Route path='about' element={<About />} /> */}
      {/* <Route path='contact' element={<Contact />} /> */}
      <Route path='register' element={ <SelectUser/>} />
      <Route path='user-register' element={ <Donor_login/>} />
      <Route path='institute-register' element={ <Institute_login/>} />
      <Route path='shop-register' element={ <Shopkeeper_login/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
