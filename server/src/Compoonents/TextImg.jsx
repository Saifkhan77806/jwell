import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from "react-router-dom"
import { FaDownload } from 'react-icons/fa6';
import { GiNecklaceDisplay, GiEmeraldNecklace, GiEarrings, GiBigDiamondRing, GiTyre, GiTwoCoins } from "react-icons/gi";
import api from './Api';
import { useAuth } from '../../store/auth';
import TulipBtn from './TulipBtn';
import ConfirmModal from './ConfirmModal';
import url from "../assets/proImg"
import ReviewHistory from './ReviewHistory';
import { Helmet } from 'react-helmet-async';


const TextImg = () => {
  const { updateCredits, user, credit } = useAuth()
  const navigate = useNavigate()
  const [isleft, setIsleft] = useState("0")
  const [ai, setAi] = useState("igtx")
  const [prompt, setPrompt] = useState({
    msg: "",
    noImG: 1,
    email: user?.userData?.email

  })
  const [data, setData] = useState()
  const [refresh, setRefresh] = useState(false)

  //    generateImages();
  const [status, setStatus] = useState(true);  // Initialize status as true
  const [message, setMessage] = useState("Generate")
  const [extPrompt, setExtPrompt] = useState("")
  const [enhce, setEnhce] = useState("Enhance Prompt")
  const [disable, setDisable] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category text
  const [activeCategory, setActiveCategory] = useState(""); // State for active category background
  const [selectNum,setSelectedNum] = useState()
  const [userHist,setUserHist] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token")



    if (token != undefined || token) {
         api.post("/verify-token", { token }).then((res) => {
              console.log("user found", res.data)
              api.get(`/userid/${res.data?.user?.id?.type?.email}`).then((res) => {
                   console.log("user founded of innner api from text img", res.data)
                   setUserHist(res.data)
              }).catch((err)=>{
                   console.log("user id err", err)
                  })
         }).catch((err)=>{
              console.log(err)
         })
        }else{
         console.log("user not found")
        }
      },[refresh])



  // if(user?.userData?.credits==10065){
  //   confirm("Do You send review")
  // }

  const storeHistory = (imgurl, prompts, email) => {
    api.post("/history", { imgurl, prompts, email }).then((res) => {
      console.log(res.data)
      setRefresh(!refresh)
    }).catch((err) => {
      console.log(err)
    })
  }

  const downloadImage = async (imageUrl, index) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jeweallity${index}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up after the download
  };

  const generate = async () => {
    try {
      // First axios call to "/text" endpoint
      let finalPrompt = prompt.msg;

      // Append the selected category to the final prompt if it exists
      if (selectedCategory !== "") {
        finalPrompt += " " + selectedCategory;
      }

      if (extPrompt !== "") {
        finalPrompt += " " + extPrompt;
      }

      // if (prompt.noImG > credit) {
      //   alert("Not enought credits to generate images 😟")
      // } else


      if (prompt.msg == "") {
        alert("please enter prompt !")
      } else if (selectedCategory == "") {
        alert("please select category")
      } else {

        console.log(prompt)
        console.log(prompt.noImG)
        updateCredits(user?.userData?.email, prompt.noImG)
        setDisable(true)
        setMessage("Pending ...")

        // prompt?.noImG = 4

        //credits = 2

        //partnerCredits = 3
        let amt

        // if (user?.userData?.credits > user?.userData?.partcredit) {
        //   if (prompt?.noImG > user?.userData?.credits) {
        //     amt = user?.userData?.credits
        //   } else {
        //     amt = prompt?.noImG
        //   }
        // } else {
        //   if (prompt?.noImG > user?.userData?.partcredit) {
        //     amt = user?.userData?.partcredit
        //   } else {
        //     amt = prompt?.noImG
        //   }
        // }



        const response = await api.post("/text", { msg: prompt?.msg, noImG: 1, email: user?.userData?.email });
        console.log(response.data);
        // Start a loop that continues while status is true
        while (status) {
          try {
            // Make the second axios call inside the loop
            setMessage("Generating ...")

            const res = await api.get(`/re/${user?.userData?.email}`);
            console.log(res.data.data.generations_by_pk.status);
            // If status from the response is "COMPLETE", update the status and break the loop
            if (res.data.data.generations_by_pk.status === "COMPLETE") {
              setStatus(false);  // This will cause the loop to stop
              console.log(res.data);
              setData(res.data.data)
              setDisable(false)
              setMessage("Generated !!👍")
              storeHistory(res?.data?.data?.generations_by_pk?.generated_images, res?.data?.data?.generations_by_pk?.prompt, user?.userData?.email)
              setPrompt({ msg: "", noImG: 0 })
              break;  // Exit the while loop
            }
          } catch (err) {
            console.log("Error while generating images:", err);
          }
        }
        setStatus(true)
        setDisable(false)
        setMessage("Generate")
      }


    } catch (err) {
      console.log("Error from storing id:", err);
    }
    setMessage("Generate")
    console.log(prompt)
    // setPrompt({...prompt, msg: ""})
  };

  const enhance = async (prompt) => {
    if (prompt.msg == "") {
      alert("please first enter prompt here")
    } else if (credit < 4) {
      alert("Not enought credits to enhance Prompt 😟")
    } else {
      setDisable(true)
      setEnhce("enhancing ...")
      updateCredits(user?.userData?.email, 4)
      api.post("/enhance", { prompt: prompt.msg }).then((res) => {
        console.log(res.data)
        console.log(res.data.data.promptGeneration.prompt)
        setPrompt({ ...prompt, msg: res.data.data.promptGeneration.prompt })
        setDisable(false)
        setEnhce("Enhance Prompt")
      }).catch((err) => {
        console.log("error is here while enhancing", err)
      })
    }
  }



  const changed = (e) => {
    setPrompt({ ...prompt, msg: e.target.value })
  }

  const nums = (e) => {
    setPrompt({ ...prompt, noImG: e })
    setSelectedNum(e)

  }

  const addCategoryToPrompt = (category) => {
    setSelectedCategory(category); // Store the category text
    setPrompt({ ...prompt, msg: prompt.msg + " " + category })
    setActiveCategory(category); // Set the active category for background change
  };
  const dont = localStorage.getItem("dont")

  return (
    <>
      <Helmet>
        <title>Create Jewelry Designs with Text - Jeweality AI  </title>
        <meta name='description' content="Turn your words into stunning jewelry designs using Jeweality's Text to Image feature. Simply type your ideas, and let our AI transform them into beautiful, unique pieces. Perfect for designers of all levels!" />
      </Helmet>
      <div className='pt-[150px] w-[60%] absolute right-0'></div>
      {/* Sticky and non-scrollable div */}
      {
        dont == null && <ConfirmModal user={user?.userData?.credits} />
      }

      {/* Main container */}
      <div className='cont flex max-md:flex-col w-full h-full bg-light py-5 px-8 my-5'>
        {/* Left screen with fixed position */}
        <div className='left-screen w-[30%] max-md:w-full h-full mr-[5%] sticky max-md:static top-5 pt-[100px]'>
          <div className='profile-photo py-10 flex bg-white shadow-lg rounded-xl flex-col justify-center items-center mb-5'>
            <div className='w-36 h-36 rounded-[50%] overflow-hidden mb-5'>
              <img src={user?.userData?.profile ? user?.userData?.profile : url} className='w-full h-full' alt="" />
            </div>
            <p className='font-semibold poppins tracking-widest text-2xl'>Saif khan</p>
            <div className='poppins flex'>
              <GiTwoCoins className='text-xl' />{user?.userData?.credits}
            </div>
          </div>

          <div className='profile-photo flex bg-white shadow-lg rounded-xl flex-col justify-center mt-5 overflow-hidden'>
            <p className='py-5 text-center font-bold poppins tracking-wide'>AI Creation</p>
            <Link to="/ai/img-text" className='py-5 hover:bg-gray-200 transition-all pl-3 font-medium text-base tracking-wider hover:font-semibold'>AI Creation</Link>
            <Link to="/history" className='py-5 hover:bg-gray-200 transition-all pl-3 font-medium text-base tracking-wider hover:font-semibold'>History</Link>
          </div>
        </div>

        {/* Right screen with scrolling content */}
        <div className="right-screen my-[100px] bg-white rounded-xl shadow-lg w-[60%] max-md:w-full h-full ml-[5%] max-md:m-0 max-md:my-5 py-5 overflow-y-auto">
          {/* generation navbar */}
          <div className="info-nav flex">
            <div className='px-4 ac-color font-semibold cursor-pointer mx-3 relative pb-5 hover:text-[#284e1f] transition-all'>
              Generate with text
              <span className='ac-bg h-[2px] w-full absolute bottom-0 left-0'></span>
            </div>
            <Link to="/ai/img-img" className='px-4 font-semibold text-gray-600 hover:text-gray-400 cursor-pointer mx-3 relative pb-5 transition-all'>
              Generate with Image
            </Link>
          </div>
          <hr className='bg-gray-300' />

          <div className='bg-light p-5 w-[90%] mx-auto mt-5 rounded-lg'>
            <textarea name="" className='w-full p-3 poppins shadow-lg rounded-md' placeholder='Describe what you want to create, including any key features or styles.' id="" value={prompt.msg} rows={7} onChange={(e) => changed(e)}></textarea>
            <Button className="my-4 ac-bg hover:bg-[#5a7a45]" disabled={disable} onClick={(e) => enhance(prompt)}>
              <TulipBtn btn={enhce} msg={"per enhancing prompt 4 credits is deducted"} dis={disable} />
            </Button>

            <p className='text-base font-bold poppins'>Category</p>
            <div className='flex my-5 flex-wrap justify-center'>
              <button
                onClick={() => addCategoryToPrompt("Necklace")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all ${activeCategory === "Necklace" ? 'text-[#44662e]' : 'hover:text-[#44662e]'}`}>
                <GiNecklaceDisplay className='mx-auto text-[60px] transition-all' />
                Necklace
              </button>

              <button
                onClick={() => addCategoryToPrompt("Brooch")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all ${activeCategory === "Brooch" ? 'text-[#44662e]' : 'hover:text-[#44662e]'}`}>
                <GiEmeraldNecklace className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Brooch
              </button>

              <button
                onClick={() => addCategoryToPrompt("Earring")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all ${activeCategory === "Earring" ? 'text-[#44662e]' : 'hover:text-[#44662e]'}`}>
                <GiEarrings className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Earring
              </button>

              <button
                onClick={() => addCategoryToPrompt("Ring")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all ${activeCategory === "Ring" ? 'text-[#44662e]' : 'hover:text-[#44662e]'}`}>
                <GiBigDiamondRing className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Ring
              </button>

              <button
                onClick={() => addCategoryToPrompt("Bracelet")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all ${activeCategory === "Bracelet" ? 'text-[#44662e]' : 'hover:text-[#44662e]'}`}>
                <GiTyre className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Bracelet
              </button>
            </div>

            <p className='text-base font-bold poppins'>No. of images</p>
            <div className='mx-auto flex justify-center flex-wrap py-5'>
              <Button className={`p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3 hover:text-white border border-gray-500 ${selectNum == 1 ? 'bg-[#5a7a45] text-white' : 'hover:bg-[#5a7a45] '}`} onClick={(e) => nums(1)}>1</Button>
              <Button className={`p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3 hover:text-white border border-gray-500 ${selectNum == 2 ? 'bg-[#5a7a45] text-white' : 'hover:bg-[#5a7a45]'}`} onClick={(e) => nums(2)}>2</Button>
              <Button className={`p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3 hover:text-white border border-gray-500 ${selectNum == 3 ? 'bg-[#5a7a45] text-white' : 'hover:bg-[#5a7a45]'}`} onClick={(e) => nums(3)}>3</Button>
              <Button className={`p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3 hover:text-white border border-gray-500 ${selectNum == 4 ? 'bg-[#5a7a45] text-white' : 'hover:bg-[#5a7a45]'}`} onClick={(e) => nums(4)}>4</Button>
            </div>

            <div className='flex justify-center items-center'>
              <Button className="my-10 px-10 w-[40%] mx-auto ac-bg hover:bg-[#5a7a45]" disabled={disable} onClick={generate}>{message}</Button>
            </div>

          </div>

        </div>
      </div>

      <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full m-auto'>
        {data?.generations_by_pk?.generated_images.map((el, index) => (
          <div className='m-3 px-4 rounded-xl imagcont relative' key={index}>
            <img id='testImg' className='w-full h-full rounded-xl' src={el?.url} alt="img" loading="lazy"
      onLoad={(e) => e.target.classList.remove('blur-img')} />
            <Button className="ac-bg hover:bg-[#5a7a45] download text-white py-2 px-4 rounded-lg absolute top-0 mt-1 mr-1 right-4" onClick={(e) => downloadImage(el?.url, index)}><FaDownload /></Button>
          </div>
        ))}
      </div>
      <ReviewHistory />
    </>

  )
}

export default TextImg