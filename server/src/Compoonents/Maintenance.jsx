import React from 'react'
import { FaTools } from "react-icons/fa";

const Maintenance = () => {
  return (
    <>
    <div className="pt-[140px]"></div>
    <div className='flex flex-col justify-center items-center'>
<div className='w-[100px] h-[100px] rounded-full shadow-2xl text-6xl color-light ac-bg flex justify-center items-center'><FaTools /></div>
    <h1 className='text-7xl luxuria max-[825px]:text-5xl max-[550px]:text-4xl max-[420px]:text-3xl max-[347px]:text-2xl'>We're under Maintenance</h1>
    <p className='text-5xl luxuria max-[825px]:text-4xl max-[550px]:text-3xl max-[420px]:text-2xl max-[347px]:text-1xl italic my-4'>Page is under Construction</p>
    </div>

    </>
  )
}

export default Maintenance