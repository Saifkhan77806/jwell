import {
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import api from "./Api";
import { Helmet } from "react-helmet-async";
   
  function ChangePassword() {

    const {userDatas, storeUser} = useAuth()
    const {email} = useParams()

    const navigate = useNavigate()

    const {user} = useAuth()

   
    const [data,setData] = useState({
      email: email,
      password: "",
      cofpassword: "",
      otp: ""
    })

    const [msg,setMsg] = useState()

    console.log(data)

    const handleChange = (e) =>{
      if(e.target.name == "otp"){
        const filteredValue = e.target.value.replace(/[^0-9]/g, '') ;
        setData({...data, [e.target.name]: filteredValue})
      }else{
        setData({...data, [e.target.name]: e.target.value})
      }
    }



    const changePass = () =>{
      console.log("this is data that i want to send in the backend" , data)

      if(data.cofpassword == "" || data.password == "" || data.otp == ""){
        alert("please fill of all the fields !")
        return
      }

      api.post("/chg-verify", {otp: data.otp, email, password: data.password, cofpassword: data.cofpassword}).then((res)=>{
        console.log(res.data)
        if(res.data.success == true){
          alert(res.data.msg)
          navigate("/login")
        }
        setMsg(res.data)
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
               Verify OTP  & Change Change Password
            </Typography>
            

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your OTP
            </Typography>
            <Input
              size="lg"
              placeholder="123456"
              name="otp"
              value={data?.otp}
              onChange={(e)=>handleChange(e)}
              style={{border: msg?.success == false ? "2px solid #b91c1c" : null}}
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {!msg?.success && <span className="-my-5 text-red-700 text-sm">{msg?.msg}</span>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              New Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={data?.password}
              onChange={(e)=>handleChange(e)}
              style={{border: msg?.success == false ? "2px solid #b91c1c" : null}}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {!msg?.success && <span className="-my-5 text-red-700 text-sm">{msg?.msg}</span>}

             <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="cofpassword"
              value={data?.cofpassword}
              onChange={(e)=>handleChange(e)}
              style={{border: msg?.success == false ? "2px solid #b91c1c" : null}}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {!msg?.success && <span className="-my-5 text-red-700 text-sm">{msg?.msg}</span>}

          </div>
          <Button className="mt-5 ac-bg" onClick={()=>changePass()} fullWidth>
            Change Password
          </Button>
         
        </form>
      </div>
      </>
    );
  }

  export default ChangePassword