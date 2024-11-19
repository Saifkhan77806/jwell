import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './Api'
import { Helmet } from 'react-helmet-async'
import {
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import Logo from "./Logo";
const VerifyId = () => {

    const [userOtp,setUserOtp] = useState()
    const navigate = useNavigate()
    const params = useParams()

    const verifyotp = (e) =>{
        e.preventDefault()
        api.post(`/verfiy-otp`, {userOtp, email: params?.email}).then((res)=>{
            console.log(res.data)
            if(res.data?.success){
            api.post(`/verified/${params?.email}`).then((res)=>{
                console.log("verification", res.data)
            }).catch((err)=>{
                console.log("verification", err)
            })
                navigate("/login")
            }else{
                alert("invalid otp")
            }

        }).catch((err)=>{
            console.log(err)
        })
    
    }


    


  return (
    <>
    <Helmet>
<title>Verify Your Jeweality Account</title>
<meta name='description' content="Easily verify your Jeweality account password to keep your profile secure. Simply follow a few steps to set a new password and protect your designs. Stay safe and enjoy uninterrupted access to your jewellery creations." />
</Helmet>
    <div className="pt-[140px]"></div>
    <div color="transparent" className="flex items-center justify-center" >
       
       <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
       <div className="flex justify-center items-center -ml-5">
       <Logo />
       </div>
           <Typography variant="h3" className="text-center my-6 luxuria italic">
              Verify OTP  
           </Typography>
           

         <div className="mb-1 flex flex-col gap-6 justify-center items-center">
           <Typography variant="h6" color="blue-gray" className="-mb-3">
             Your OTP
           </Typography>
           <Input type="text" name="" id="" placeholder='enter onter otp here'
              className=" !border-t-blue-gray-200 border border-gray-500 focus:!border-t-gray-900 bg-white shadow-lg" value={userOtp} onChange={(e)=>{
                const filteredValue = e.target.value.replace(/[^0-9]/g, '') ;
                setUserOtp(filteredValue)
                }} />
         <Button className='ac-bg' onClick={(e) => { verifyotp(e) }}>Verify otp</Button>
         </div>
        
       </form>
     </div>
    </>

  )
}

export default VerifyId