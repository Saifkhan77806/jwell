import { useAuth } from '../../store/auth'
import React, { useState } from 'react'
import api from './Api'

const Contactus = () => {

  const {user} = useAuth()

  const [data,setData] = useState({
     names: user?.userData?.name,
     email: user?.userData?.email,
     subject: "",
     message: "",
  })

  const submit = () =>{
    if(data.names=="" || data.email=="" || data.subject=="" || data.message==""){
      alert("please fill all the fields")
    }else{
      api.post("/contacus",{names: "saif khan", email: "saifkhan77806@gmail.com", subject: data.subject, message: data.message}).then((res)=>{
        console.log("contact form addedd successfully !")
        alert("contact form addedd successfully !")
      }).catch((err)=>{
        console.log(err)
      })
    }
    console.log(data)
  }



  return (
    <>
    <h1 className='my-10 text-3xl luxuria font-bold text-center' id='contactus'><i>Contact us</i></h1>
    <div className=" my-10 mx-auto rounded-md border-double  flex flex-col gap-6 w-[95%] p-10 bg-light shadow-xl max-[750px]:w-[85%]">   
    <div className="relative h-11 w-full min-w-[200px]">
      <input placeholder=" Enter Your Name"
        value={"saif khan"}
        readOnly
        className="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 poppins" />
      <label
        className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
        Enyer your Name
      </label>
    </div>
    <div className="relative h-11 w-full min-w-[200px]">
      <input placeholder="name@gmail.com"
      value={"saifkhan77806@gmail.com"}
      readOnly
        className="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 poppins" />
      <label
        className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
        Enter your Email
      </label>
    </div>
    <div className="relative h-11 w-full min-w-[200px]">
      <input placeholder="Enter your Subject"
      value={data.subject}
      onChange={(e)=>setData({...data, subject: e.target.value})}
        className="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 poppins" />
      <label
        className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
        Enter Your Subject
      </label>
    </div>
    <div className="relative w-full min-w-[200px]">
    <textarea
     value={data.message}
     onChange={(e)=>setData({...data, message: e.target.value})}
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50  bg-white shadow-lg"
      placeholder=""></textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] text-gray-500  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
      Message
    </label>
  </div>
    <button onClick={()=>submit()} className='ac-bg w-[40%] py-3 rounded-md mx-auto font-bold text-white hover:bg-[#284e1f] transition-all'>Submit</button>
  </div>
  </>

  )
}

export default Contactus