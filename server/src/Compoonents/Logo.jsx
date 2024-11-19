import React from 'react'
import IMAGES from '../images'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
    <div className='flex -mt-5 relative'>
    <Link to="/" className='flex pr-7'><img src={IMAGES.logo} className='h-14 ' alt="" /><p className='-ml-8 text-3xl pt-5 luxuria font-bold tracking-widest'>EWEALITY</p>
    <br />
    <p className='cursiv absolute -bottom-3 left-9 text-[10px] font-semibold tracking-widest flex w-full'>Where imagination meets reailty</p>
    </Link>
    </div>
    </>
  )
}

export default Logo