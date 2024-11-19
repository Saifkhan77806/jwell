import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useCountries } from "use-react-countries"
import Logo from "./Logo";
import { useState } from "react";
import api from "./Api";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../store/auth";

function Register() {

  const countries = useCountries()
  const navigate = useNavigate()

  
  const { userDatas, storeUser } = useAuth()


  const [userData, setUserData] = useState({
    email: "",
    profile: "",
    country: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    agrred: ""

  })

  const submit = (e) => {
    if (userData.email == "" || userData.country == "" || userData.firstName == "" || userData.lastName == "" || userData.password == "" || userData.phone == "" || userData.agrred == "") {
      alert("Please fill all the fields")
    } else {
      e.preventDefault()
      console.log(userData)
      api.post("/register", userData).then((res)=>{
        console.log(res.data)
        if(res.status==404){
          alert("user already exist")
        }
      if(res.status==200){
        console.log(res.data?.token)
        localStorage.removeItem("token")
        storeUser(res.data?.token)
        api.post(`/send-otp`, {email: userData?.email}).then((res)=>{
          console.log(res.data)
      }).catch((err)=>{
          console.log(err)
      })
        navigate(`/verify-id/${userData?.email}`)
      }

      }).catch((err)=>{
        console.log("from err", err)
      })
    }

  }

  const handlechange = (e) => {

    if(e.target.name == "phone"){
      const filteredValue = e.target.value.replace(/[^0-9]/g, '') ;
    
      setUserData({ ...userData, [e.target.name]: filteredValue });
    }else{

      setUserData({ ...userData, [e.target.name]: e.target.value })
    }

  // If the field is "password," remove non-numeric characters

  }



  return (
    <>
      <Helmet>
        <title>Join Jeweality - Create and Design Unique Jewelry </title>
        <meta name='description' content="Register today to start designing your own jewelry with Jeweality. Our platform makes it easy for everyone to create custom pieces with AI. Whether you're a beginner or expert, join our creative community and bring your designs to life." />
      </Helmet>
      <div className="pt-[120px]"></div>
      <div color="transparent" className="flex items-center justify-center" >

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
          <div className="flex justify-center items-center -ml-5">
            <Logo />
          </div>
          <Typography variant="h3" className="text-center my-5 luxuria italic">
            Register
          </Typography>

          <div className="mb-1 flex flex-col gap-6">
            <Button className="mt-6 bg-light rounded-full bg-gray-500" onClick={() => {
              localStorage.removeItem('token')
              window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth`
            }} fullWidth>
              Login with google
            </Button>
            <span className="text-center -my-4 text-gray-500">or</span>
            <Button className="mt-6 bg-light rounded-full bg-gray-500" onClick={() => {
              localStorage.removeItem('token')
              window.location.href = `${import.meta.env.VITE_BACKEND_URL}/linkedin`
            }} fullWidth>
              Login with Linkedin
            </Button>

            <div className="my-4 flex items-center gap-4">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  First Name
                </Typography>
                <Input
                  containerProps={{ className: "min-w-[72px]" }}
                  placeholder="first Name"
                  name="firstName"
                  value={userData?.firstName}
                  onChange={(e) => { handlechange(e) }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Last Name
                </Typography>
                <Input
                  containerProps={{ className: "min-w-[72px]" }}
                  placeholder="Last name"
                  name="lastName"
                  value={userData?.lastName}
                  onChange={(e) => { handlechange(e) }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900   bg-white shadow-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your phone
            </Typography>
            <Input
              size="lg"
              placeholder="00000 00000"
              type="text"
              name="phone"
              value={userData?.phone}
              onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={userData?.email}
              onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              value={userData?.password}
              onChange={(e) => { handlechange(e) }}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Country
            </Typography>
            <Input
              list="browsers"
              size="lg"
              placeholder="Country"
              name="country"
              value={userData?.country}
              onChange={(e) => { handlechange(e) }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <datalist id="browsers">
              {
                countries.countries.map((el) => {
                  return (
                    <option value={el.name} key={el.name}>{el.name}</option>
                  )
                })
              }
            </datalist>


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
            value={"true"}
            name="agrred"
            onChange={(e) => handlechange(e)}
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6 ac-bg" fullWidth onClick={(e) => submit(e)}>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </>
  );
}

export default Register