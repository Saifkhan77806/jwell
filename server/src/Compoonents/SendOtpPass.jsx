import {
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import { Helmet } from "react-helmet-async";
   

const SendOtpPass = () => {

    const [msg,setMsg] = useState()
    const [email,setEmail] = useState()
    const navigate = useNavigate()



    



    const changePass = () =>{
      console.log("this is data that i want to send in the backend" , email)

      
      api.post("/chg-otp", {email}).then((res)=>{
        console.log(res.data)
        if(res.data.success == true){
          alert(res.data.msg)
          navigate(`/verfiy-otp-password/${email}`)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    
    
    return (
        <>
         <Helmet>
        <title>Update Your Jeweality Account Password  </title>
        <meta name='description' content="Easily update your Jeweality account password to keep your profile secure. Simply follow a few steps to set a new password and protect your designs. Stay safe and enjoy uninterrupted access to your jewelry creations." />
      </Helmet>
        <div className="pt-[120px]"></div>
       <div color="transparent" className="flex items-center justify-center" >
       
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
        <div className="flex justify-center items-center -ml-5">
        <Logo />
        </div>
            <Typography variant="h3" className="text-center my-6 luxuria italic">
               Change Password by OTP
            </Typography>
            

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              your email
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="yourmail@gmail.com"
              name="newpass"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              style={{border: msg?.success == false ? "2px solid #b91c1c" : null}}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

          </div>
          <Button className="mt-5 ac-bg" onClick={()=>changePass()} fullWidth>
            Change Password
          </Button>
         
        </form>
      </div>
      </>
    );
}

export default SendOtpPass