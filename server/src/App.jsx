import React from 'react'
import './App.css'
import Navbar from './Compoonents/Navbar'
import Subcription from './Compoonents/Subcription'
import { Route, Routes } from 'react-router-dom'
import Client from './Compoonents/Client'
import Login from './Compoonents/Login'
import Register from './Compoonents/Register'
import Blog from './Compoonents/Blog'
import ImgText from './Compoonents/ImgText'
import ImgImg from './Compoonents/ImgImg'
import TextImg from './Compoonents/TextImg'
import ProInfo from './Compoonents/ProInfo'
import RegisterInfo from './Compoonents/RegisterInfo'
import VerifyId from './Compoonents/VerifyId'
import History from './Compoonents/History'
import GetBlog from './Compoonents/GetBlog'
import PostReview from './Compoonents/PostReview'
import Partner from './Compoonents/Partner'
import ChangePassword from './Compoonents/ChangePassword'
import SendOtpPass from './Compoonents/SendOtpPass'
import VerfiyPassword from './Compoonents/VerfiyPassword'
import { HelmetProvider } from 'react-helmet-async';
import Maintenance from './Compoonents/Maintenance'
import Test from "./Compoonents/Test"
import { Toaster } from "../components/ui/toaster"


function App() {
  const helmetContext = {};

  return (
    <>
    <HelmetProvider context={helmetContext}>
    <div className='parent w-[100vw] relative flex flex-col'>
    <Navbar />
    <div className='h-auto mb-14'>
    <Routes>
      <Route path='/' element={<Client />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/pricing' element={<Subcription />}/>
      <Route path='/blog' element={<Blog />}/>
      <Route path='/history' element={<History />}/>
      <Route path='/ai/img-text' element={<ImgText />}/>
      <Route path='/ai/img-img' element={<ImgImg />}/>
      <Route path='/ai/text-img' element={<TextImg />}/>
      <Route path='/profile-info' element={<ProInfo />}/>
      <Route path='/register-info' element={<RegisterInfo />}/>
      <Route path='/verify-id/:email' element={<VerifyId />} />
      <Route path="/getblog/:id" element={<GetBlog />}/>
      <Route path='/post-review' element={<PostReview />}/>
      <Route path='/partner/:amt' element={<Partner />}/>
      <Route path='/change-password' element={<ChangePassword />}/>
      <Route path='/send-otp-password' element={<SendOtpPass />}/>
      <Route path='/verfiy-otp-password/:email' element={<VerfiyPassword />}/>
      <Route path='/maintenenace' element={<Maintenance />}/>
      <Route path='/test' element={<Test />}/>
    </Routes>
    </div>
    <Toaster />
    </div>
    </HelmetProvider>
    </>
  )
}

export default App
