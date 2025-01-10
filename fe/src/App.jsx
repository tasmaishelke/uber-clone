import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import UserLogout from './pages/UserLogout';
import CaptainRegister from './pages/CaptainRegister';
import CaptainLogin from './pages/CaptainLogin';
import ProtectWrapper from './pages/ProtectWrapper'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/captain/register' element={<CaptainRegister />} />
        <Route path='/captain/login' element={<CaptainLogin />} />
        <Route path='/home' element={<ProtectWrapper> <Home /> </ProtectWrapper>} />
        <Route path='/user/logout' element={<ProtectWrapper> <UserLogout /> </ProtectWrapper>} />
        <Route path='/captain/logout' element={<ProtectWrapper> <Home /> </ProtectWrapper>} />
      </Routes>
    </div>
  )
}

export default App