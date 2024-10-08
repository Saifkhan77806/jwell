import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Button, Typography } from "@material-tailwind/react";
import api from "./Api";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

function PostReview() {
  const [rating,setRating] = useState(1)
  const navigate = useNavigate()

  const {user} = useAuth()

  const [data,setData] = useState({
    rates: 1, 
    text: ""
  })
  const changeRating = (num) =>{
    setRating(num)
    setData({...data, rates: num})
  }

  const postrev = () =>{
    // setData({...data, rates: rating})
    console.log("review data",data)

    api.post('/post-review',{email: user?.userData?.email, name: user?.userData?.name, rates: data.rates, message: data.text}).then((res)=>{
      alert("Review upload successfully !")
      console.log(res.data)
      setData({...data, text: ""})
      
      navigate("/ai/text-img")

    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="pt-[140px]"></div>
      <div className="flex items-center justify-center">
<div className="mt-8 mb-2 max-w-screen-lg sm:w-96 bg-light px-7 py-5 rounded-lg shadow-2xl flex flex-col justify-center items-center gap-5">
<Typography variant="h3" className="text-center luxuria italic">
                Login
            </Typography>
            

      <div className="flex items-center gap-5">
        <p>{rating}.7</p>
        <div className="flex gap-1">
          <span onClick={()=>changeRating(1)}>{rating<=0 ? <CiStar className="cursor-pointer  text-yellow-500 " /> : <FaStar className="cursor-pointer  text-yellow-500" /> }</span>
          <span onClick={()=>changeRating(2)}>{rating<=1 ? <CiStar className="cursor-pointer  text-yellow-500" /> : <FaStar className="cursor-pointer  text-yellow-500"  /> }</span>
          <span onClick={()=>changeRating(3)}>{rating<=2 ? <CiStar className="cursor-pointer  text-yellow-500" /> : <FaStar className="cursor-pointer  text-yellow-500" /> }</span>
          <span onClick={()=>changeRating(4)}>{rating<=3 ? <CiStar className="cursor-pointer  text-yellow-500" /> : <FaStar className="cursor-pointer  text-yellow-500" /> }</span>
          <span onClick={()=>changeRating(5)}>{rating<=4 ? <CiStar className="cursor-pointer  text-yellow-500" /> : <FaStar className="cursor-pointer  text-yellow-500" /> }</span>
        </div>
      </div>

      <div className="relative w-[60%] mx-auto my-2 min-w-[200px] flex flex-col">
        <textarea
          className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-950 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 poppins bg-light shadow-2xl"
          placeholder="" value={data.text} onChange={(e)=>setData({...data, text: e.target.value})}></textarea>
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] text-gray-500  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-950 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-950 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
          Message
        </label>
      <Button className="my-4 ac-bg hover:bg-[#5a7a45] mx-auto" onClick={()=>{postrev()}} >
        Post Review
      </Button>
      
      </div>
</div>
</div>

    </>
  );
}

export default PostReview