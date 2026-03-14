/* import { useState } from 'react' */
import {LandingPage}  from './LandingPage'
import { Login } from './auth/Login'
import { SignUp } from './auth/SignUp'
import { DashBoard } from './pages/DashBoard'
import {Route, Routes} from "react-router-dom"
import { NotFound } from './pages/NotFound'
import { Ticket } from './pages/Ticket'
import { SettingPage } from './pages/Settings'
import ProtectedRoutes from './components/ProtectedRoutes'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element = {<LandingPage/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Dashboard' element={
        <ProtectedRoutes>
          <DashBoard/>
        </ProtectedRoutes>
      }/>
      <Route path='/Ticket' element={
        <ProtectedRoutes>
          <Ticket/>
        </ProtectedRoutes>
      }/>
      <Route path='/Settings' element={
        <ProtectedRoutes>
          <SettingPage/>
        </ProtectedRoutes>
      }/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
