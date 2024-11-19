import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Logo from './Logo';
import { useAuth } from '../../store/auth';

const Sheets = () => {
    const [open,setOpen] = useState(true)
    const navigate = useNavigate()

    const {userData, logout, user, credit} = useAuth()


  const isLogin = () =>{
    if(user){
      if(credit>0){
        console.log("you are elgible")
      }else{
        navigate("/pricing")
      }
    }else{
      navigate("/login")
    }
  }


    return (
        <>
            <Sheet>
                <SheetTrigger className='hidden max-md:block'><FiMenu /></SheetTrigger>
                <SheetContent className="">
                    <SheetHeader>
                        <SheetTitle className=' flex items-center justify-center  max-md:ml-[-50px] max-sm:ml-[-53px] mb-5'>
                       <Logo />
                        </SheetTitle>
                        <h1 className='font-bold poppins py-2 text-center  hover:bg-gray-200'>
                            <Link to="/">
                            Home
                            </Link>
                        </h1>
                        <h1 className='font-bold poppins py-2 text-center  hover:bg-gray-200 flex justify-center' onClick={()=>{setOpen(!open)}}>Features {open? <IoIosArrowDown className='ml-3' /> :<IoIosArrowUp className='ml-3' />}</h1>
                    <ul className='transition-all' style={{display: open ? "none" : "block"}}>
                        <li className='py-3 hover:bg-gray-200 text-center transition-all luxuria hover:font-bold' onClick={isLogin}> <Link to="/ai/text-img">
                            Text to images
                            </Link></li>
                        <li className='py-3 hover:bg-gray-200 text-center  transition-all luxuria hover:font-bold' onClick={isLogin}>
                        <Link to="/ai/img-img">
                            Images to images
                            </Link>
                        </li>
                        <li className='py-3 hover:bg-gray-200 transition-all text-center  luxuria hover:font-bold' onClick={isLogin}>
                        <Link to="/ai/img-text">
                         Images to text
                            </Link>
                        </li>
                     </ul>
                     <h1 className='font-bold poppins py-2 text-center hover:bg-gray-200'>
                     <Link to="/pricing">
                            Pricing
                    </Link>
                     </h1>
                     <h1 className='font-bold poppins py-2 text-center  hover:bg-gray-200'>
                     <Link to="/blog">
                        Blogs
                            </Link>
                     </h1>
                     <h1 className='font-bold poppins py-2 text-center  hover:bg-gray-200'>
                     <a href="#contactus">
                        Contact us
                            </a>
                     </h1>
                     
                     


                    </SheetHeader>
                    {
                        userData ? (
                            <>
                            <Button className="absolute bottom-4 hover:bg-[#284e1f] transition-all ac-bg" onClick={()=>{navigate("/profile-info")}}>Profile</Button>
                            <Button className='mx-3 ac-bg px-5 py-4 font-semibold hover:bg-[#284e1f] absolute right-4 bottom-4 transition-all text-white' onClick={()=>{
                                logout()
                                window.location.href = "https://jewellerydekho.in/login"
                                }}>Logout</Button>
                            </>
                        ): (
                            <>
                            <Button className="absolute bottom-4 hover:bg-[#284e1f] transition-all ac-bg" onClick={()=>{navigate("/login")}}>Login</Button>
                            <Button className="absolute bottom-4 right-4 hover:bg-[#284e1f] transition-all ac-bg" onClick={()=>{navigate("/register")}}>Sign up</Button>
                            </>
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Sheets