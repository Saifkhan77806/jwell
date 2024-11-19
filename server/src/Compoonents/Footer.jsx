import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  return (
    <>
    <div className='bg-light w-[100vw] text-black pt-5 border-t -bottom-10 left-0 mt-5 border-gray-300 relative'>

   
        <div className='flex justify-center '>
    <Logo />
        </div>
    <div className='grid grid-cols-4 max-md:grid-cols-2 max-[400px]:grid-cols-1 px-10 pb-14 pt-5'>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl poppins font-bold my-3 text-center tracking-widest max-[475px]:text-2xl max-[415px]:text-xl max-[360px]:text-lg max-[320px]:text-sm'>Jeweality</h1>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>About us</Link>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>Team</Link>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>Our story</Link>
        </div>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl poppins font-bold my-3 text-center tracking-widest max-[475px]:text-2xl max-[415px]:text-xl max-[360px]:text-lg max-[320px]:text-sm'>Our profile</h1>
            <Link to="/login" className='text-gray-400 poppins font-normal tracking-wider linhov'>Login</Link>
            <Link to="/register" className='text-gray-400 poppins font-normal tracking-wider linhov'>Register</Link>
            <Link to="/profile-info" className='text-gray-400 poppins font-normal tracking-wider linhov'>My profile</Link>
            <Link to="/pricing" className='text-gray-400 poppins font-normal tracking-wider linhov'>Subscription</Link>
        </div>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl poppins font-bold my-3 tracking-widest max-[475px]:text-2xl max-[415px]:text-xl max-[360px]:text-lg max-[320px]:text-sm'>Policies</h1>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>Privacy Policy</Link>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>Term & condition</Link>
            <Link to="/maintenenace" className='text-gray-400 poppins font-normal tracking-wider linhov'>Site map</Link>
        </div>
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl poppins font-bold my-3 tracking-widest max-[475px]:text-2xl max-[415px]:text-xl max-[360px]:text-lg max-[320px]:text-sm'>follow us</h1>
            <a href="https://www.instagram.com/jeweality/"  className='text-gray-400 poppins font-normal tracking-wider linhov'>Instagram</a>
            <a href="https://www.linkedin.com/company/jeweality" className='text-gray-400 poppins font-normal tracking-wider linhov'>Linkedin</a>
            <a href="https://www.youtube.com/@Jeweality" className='text-gray-400 poppins font-normal tracking-wider linhov'>you tube</a>
        </div>
    </div>
    <div className='absolute -bottom-10 right-0 left-0 border-t border-gray-300'>
        <p className='poppins text-center items-center pt-5 pb-5 bg-light'>Copyright © 2024 Jeweality | All Rights Reserved</p>
    </div>
    </div>
    </>
  )
}

export default Footer