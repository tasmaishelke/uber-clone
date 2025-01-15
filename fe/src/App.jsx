import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import Start from './pages/Start';

import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserHome from './pages/UserHome';
import UserRiding from './pages/UserRiding';
import UserLogout from './pages/UserLogout';

import CaptainRegister from './pages/CaptainRegister';
import CaptainLogin from './pages/CaptainLogin';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome';
import CaptainLogout from './pages/CaptainLogout';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />

        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user/home' element={<UserProtectWrapper> <UserHome /> </UserProtectWrapper>} />
        <Route path='/user/riding' element={<UserRiding />} />
        <Route path='/user/logout' element={<UserProtectWrapper> <UserLogout /> </UserProtectWrapper>} />

        <Route path='/captain/register' element={<CaptainRegister />} />
        <Route path='/captain/login' element={<CaptainLogin />} />
        <Route path='/captain/home' element={<CaptainProtectWrapper> <CaptainHome /> </CaptainProtectWrapper>} />
        <Route path='/captain/logout' element={<CaptainProtectWrapper> <CaptainLogout /> </CaptainProtectWrapper>} />
      </Routes>
    </div>
  )
}

export default App