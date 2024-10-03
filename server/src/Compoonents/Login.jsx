import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import api from "./Api";
   
  function Login() {

    const {userDatas, storeUser} = useAuth()

    const navigate = useNavigate()
    const [userEmail,setUserEmail] = useState()
    const [userPassword,setUserPassword] = useState()

    const submit = () => {
      api.post("/manual-login", {
          email: userEmail,
          password: userPassword
      }, {
          withCredentials: true,  // Include credentials (cookies)
          method: "post",
          headers: {
              'Content-Type': 'application/json'   // Ensure correct content type
          }
      }).then((res) => {

        console.log(res);
        if(res.status==200){
          console.log(res.data?.token)
          localStorage.removeItem("token")
          storeUser(res.data?.token)
          navigate("/")
        //   window.location.href = 'https://server-ten-orcin.vercel.app/';  // Redirect to frontend URL
        }
    }).catch((err) => {
        console.error('Error during request:', err);
    });
    };


   useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token || token == undefined){
    fetch('https://back-alpha-amber.vercel.app/data')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    storeUser(data?.token)
  })
  .catch(error => {
      console.error('Login error:', error);
  });

}

   },[])
    
    
    return (
        <>
        <div className="pt-[120px]"></div>
       <div color="transparent" className="flex items-center justify-center" >
       
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
        <div className="flex justify-center items-center -ml-5">
        <Logo />
        </div>
            <Typography variant="h3" className="text-center my-5 luxuria italic">
                Login
            </Typography>
            

          <div className="mb-1 flex flex-col gap-6">
          {/* <a href="https://back-alpha-amber.vercel.app/auth"> */}
          <Button className="mt-6 bg-light rounded-full bg-gray-500" onClick={()=>{
            localStorage.removeItem('token')
            window.location.href = "https://back-alpha-amber.vercel.app/auth"
          }} fullWidth>
            Login with google
          </Button>
          {/* </a> */}
          <span className="text-center -my-4 text-gray-500">or</span>
         <a href="http://localhost:3000/linkedin"><Button className="mt-2 bg-light rounded-full bg-gray-500" fullWidth>
            Login with Linkedin
          </Button></a>
          <span className="text-center -my-4 text-gray-500">or</span>
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={userEmail}
              onChange={(e)=>{setUserEmail(e.target.value)}}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              value={userPassword}
              onChange={(e)=>{setUserPassword(e.target.value)}}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
           <a href="http://localhost:3000/linkedin">linkedin</a>
          <Button className="mt-6 ac-bg" fullWidth onClick={(e)=>submit(e)}>
            sign in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/register" className="font-medium text-gray-900">
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
      </>
    );
  }

  export default Login