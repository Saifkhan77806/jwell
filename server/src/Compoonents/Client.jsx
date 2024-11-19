import React, { useEffect, useLayoutEffect, useState } from 'react'
import Home from './Home'
import Slideshow from './Slideshow'
import Whychooseus from './Whychooseus'
import Trynow from './Trynow'
import Contactus from './Contactus'
import Review from './Review'
import Footer from './Footer'
import axios from 'axios'
import Slide from './Slide'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import api from './Api'
import { Helmet } from 'react-helmet-async';

const Client = () => {

  // axios.get("http://localhost:3000/auth/callback/success").then((res)=>{
  //   console.log(res.data)
  // }).catch((err)=>{
  //   console.log("log",err)
  // })

  const navigate = useNavigate()

  const [user, setUser] = useState()

  const { userData } = useAuth()

  console.log(userData)

  // console.log("userdata", userData)
  if (userData?.logtype == "register") {
    navigate("/register-info")
    console.log(true)
  }

  // if(userData?.logtype=="user already exist"){
  //   window.location.href = 'http://localhost:3000/logout';
  // }

  // console.log("env",process.env.BACKEND_URL)

  return (
    <>
      <Helmet>
        <title>Create Stunning Jewelry Designs with AI </title>
        <meta name='description' content="Welcome to Jeweality! Unleash your creativity and design beautiful jewelry with simple prompts. Whether you're a professional designer or a jewelry enthusiast, our AI-powered platform helps you bring your ideas to life effortlessly. Get started now and explore endless design possibilities." />
      </Helmet>
      <div className='min-w-full w-[100vw] max-w-full'>
        <Home />
        <Slide />
        <Trynow />
        <Whychooseus />
        <Contactus />
        <Review />
      </div>
      <Footer />
    </>
  )
}

export default Client