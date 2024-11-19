import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import api from "./Api";
import { Helmet } from "react-helmet-async";

function ChangePassword() {

  const { userDatas, storeUser } = useAuth()

  const navigate = useNavigate()

  const { user } = useAuth()


  const [data, setData] = useState({
    email: user?.userData?.email,
    oldpass: "",
    newpass: "",
    confpass: ""
  })

  const [msg, setMsg] = useState()

  console.log(data)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }



  const changePass = () => {
    console.log("this is data that i want to send in the backend", data)

    if (data.confpass == "" || data.oldpass == "" || data.newpass == "") {
      alert("please fill of all the fields !")
      return
    }

    api.post("/change-password", { email: user?.userData?.email, oldpass: data?.oldpass, newpass: data.newpass, confpass: data.confpass }).then((res) => {
      console.log(res.data)
      if (res.data.success == true) {
        alert(res.data.msg)
      }
      setMsg(res.data)
    }).catch((err) => {
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
            Change Password
          </Typography>


          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Old Password
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              name="oldpass"
              value={data?.oldpass}
              onChange={(e) => handleChange(e)}
              style={{ border: msg?.success == false ? "2px solid #b91c1c" : null }}
              type="password"
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
              name="newpass"
              value={data?.newpass}
              onChange={(e) => handleChange(e)}
              style={{ border: msg?.success == false ? "2px solid #b91c1c" : null }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {msg?.success == false && <span className="-my-5 text-red-700 text-sm">{msg?.msg}</span>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="confpass"
              value={data?.confpass}
              onChange={(e) => handleChange(e)}
              style={{ border: msg?.success == false ? "2px solid #b91c1c" : null }}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            {msg?.success == false && <span className="-my-5 text-red-700 text-sm">{msg?.msg}</span>}

          </div>
          <Link to="/send-otp-password">
            <Typography className="mt-4 font-medium text-gray-900">Try another way</Typography>
          </Link>
          <Button className="mt-5 ac-bg" onClick={() => changePass()} fullWidth>
            Change Password
          </Button>

        </form>
      </div>
    </>
  );
}

export default ChangePassword