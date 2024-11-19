import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries"
import Logo from "./Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import { useAuth } from "../../store/auth";
import { Helmet } from "react-helmet-async";

function RegisterInfo() {
    const navigate = useNavigate()

    const { userData } = useAuth()

    const [userDatas, setUserDatas] = useState({
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        country: ""
    })

    const handlechange = (e) => {
        setUserDatas({ ...userDatas, [e.target.name]: e.target.value })
    }


    // useEffect(()=>{
    //     axios.get("http://localhost:3000/linkedin/success",{ withCredentials: true}).then((res)=>{
    //       setUserDatas(res.data)
    //       console.log(res.data?.logtype)
    //       if(res.data.logtype=="login"){
    //         navigate("/")
    //       }
    //     })
    //   },[])

    console.log(userData?.type.id)

    const submit = (e) => {
        e.preventDefault()
        if (userDatas.country == "", userDatas.firstName == "", userDatas.lastName == "" || userDatas.password == "" || userDatas.phone == "") {
            alert("please fill all the fields")
        } else {
            console.log(userDatas)

            api.post(`/setinfo/${userData?.type.id}`, userDatas).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })

            api.post(`/chg-otp`, { email: userData?.type?.email }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })


            navigate(`/verify-id/${userData?.type?.email}`)
        }

    }

    const countries = useCountries()

    return (
        <>
            <Helmet>
                <title>Join Jeweality - Register information and Design Unique Jewelry</title>
                <meta name='description' content="Register information today to start designing your own jewelry with Jeweality. Our platform makes it easy for everyone to create custom pieces with AI. Whether you're a beginner or expert, join our creative community and bring your designs to life." />
            </Helmet>
            <div className="pt-[120px]"></div>
            <div color="transparent" className="flex items-center justify-center" >

                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-light px-10 py-10 rounded-lg shadow-2xl">
                    <div className="flex justify-center items-center -ml-5">
                        <Logo />
                    </div>
                    <Typography variant="h3" className="text-center my-5 luxuria italic">
                        RegisterInfo
                    </Typography>

                    <div className="mb-1 flex flex-col gap-6">

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
                                    placeholder="First Name"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                                    name="firstName"
                                    value={userDatas?.firstName}
                                    onChange={(e) => { handlechange(e) }}
                                    required
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
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900   bg-white shadow-lg"
                                    name="lastName"
                                    value={userDatas?.lastName}
                                    onChange={(e) => { handlechange(e) }}
                                    required
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                        </div>

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your password
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="******"
                            type="text"
                            min={0}
                            maxLength={10}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                            name="password"
                            value={userDatas?.password}
                            onChange={(e) => { handlechange(e) }}
                            required
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your phone
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="00000 00000"
                            type="number"
                            min={0}
                            maxLength={10}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                            name="phone"
                            value={userDatas?.phone}
                            onChange={(e) => { handlechange(e) }}
                            required
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
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900  bg-white shadow-lg"
                            name="country"
                            value={userDatas?.country}
                            onChange={(e) => { handlechange(e) }}
                            required
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
                        containerProps={{ className: "-ml-2.5" }}
                        required
                    />
                    <Button className="mt-6 ac-bg" fullWidth onClick={(e) => { submit(e) }}>
                        sign up
                    </Button>
                </form>
            </div>
        </>
    );
}

export default RegisterInfo