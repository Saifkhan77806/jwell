import React, { useCallback, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useDropzone } from 'react-dropzone'
import { IoCloudUpload } from "react-icons/io5";
import { Button } from '../../components/ui/button';
import { FaArrowLeft, FaGear } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import ConfirmModal from './ConfirmModal';
import { GiBigDiamondRing, GiEarrings, GiEmeraldNecklace, GiNecklaceDisplay, GiTwoCoins, GiTyre } from 'react-icons/gi';
import TulipBtn from './TulipBtn';

import url from "../assets/proImg"
import { Helmet } from 'react-helmet-async';


const ImgImg = () => {

  const onDrop = async(acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0])

    const uploadDatasetImage = async (file, response) => {
          const rawFields = response.uploadDatasetImage.fields;
          const fields = JSON.parse(rawFields);
          const url = response.uploadDatasetImage.url;
      
          const formData = new FormData();
      
          Object.entries({ ...fields, file }).forEach(([key, value]) => {
              formData.append(key, value );
          })
      
          const request = new XMLHttpRequest();
          request.open('POST', url);

          // console.log(first)
      
          const result = await request.send(formData);
  
          console.log("result",result)
      }
  
      uploadDatasetImage(acceptedFiles[0], {
        uploadDatasetImage: {
          id: "815c3caf-acae-41e5-b88d-98191fa91737",
          fields: "{\"Content-Type\":\"image/jpeg\",\"bucket\":\"image-flex-213441772509-prod-images\",\"X-Amz-Algorithm\":\"AWS4-HMAC-SHA256\",\"X-Amz-Credential\":\"ASIATDMQ67PORBEQFPKT/20241103/us-east-1/s3/aws4_request\",\"X-Amz-Date\":\"20241103T034842Z\",\"X-Amz-Security-Token\":\"IQoJb3JpZ2luX2VjEFQaCXVzLWVhc3QtMSJHMEUCIFj1t76Kf5FjDYibq3h0GvThFRyhSX1OfLjObN6umDpUAiEAn96H5GReS4LSTOxs4sU803OEq4K7SxCBaI1jc+ppFT0qsgMIzf//////////ARABGgwyMTM0NDE3NzI1MDkiDDn8nonmtRaoYT0nsCqGAxK8Do0xHSs8RW8H5e0MZmWbPt+tBqbeKVhyx1EcDq7ghlyDOdO+DDduk6CECuAf1us5t0yZeiRqzCpOJZaCzUNB+zCwbnwauhrSo0VL/jr5zq4fSGAjUDWmk0ZRQ/qBQOfMAEo69VnxGB4kA2DyVx6Kp9q0joS/B5Lealtt27+fVXm5KkJWsn+lK/Tnv0vAOgM1SmMtcpiyY/JyAzHEwYbM7KeFkkEHXkxx1tp0wq6QbfeLvrhYspmbBiqQJX2R6YtTTCfla5sk4riRWbqo22tpo3CVMJYyF9CPpSbvExl5VR9zNh3++Nv+s+FjfO0BapK5F4Ut8yPu4fZWdoNuXt8qALL7mCZo2+EsmH3TbP4PnkUWxig8hAK5Tpfhs986IhJd3hR4neY4drTO/q0Nsts/9hqNT7y01/cvC6PynqTVU3fIM/V7Z06NB1y3lBVgZRxHpycGLuoqrptTdsUhcmiX5xPefEXgVSiOe0YhWEd66P4/lknqHCcz6SBC5mTQ3Ga/1ttN/zC+5Ju5BjqdAcirrQ6TXfEVLE45DdLNpk5LHEk/mH9vfeqdKJH5cu3PMEZip5OaQ5w3j2VCbm/gB2xY9mWVvpSMdkHaNn+Nqn30ExWVQq/TJpBviGgNHJkHBxZ2yY+08HI5OcHJ14TrNXVMiKQE+CgZVK4vYbbPak6LNNoq3ZCQ/Qm3kVLEQ1FolsK+1lPxiRT3AWaZv1JObOThxLPwRt0MqC1hyjw=\",\"key\":\"users/8a018607-08ca-4ec9-a394-dd9b5eebfcb4/datasets/7d82698c-122f-421d-8ebd-f9127686b48c/images/815c3caf-acae-41e5-b88d-98191fa91737/primary.jpg\",\"Policy\":\"eyJleHBpcmF0aW9uIjoiMjAyNC0xMS0wM1QwMzo1MDo0MloiLCJjb25kaXRpb25zIjpbeyJDb250ZW50LVR5cGUiOiJpbWFnZS9qcGVnIn0seyJidWNrZXQiOiJpbWFnZS1mbGV4LTIxMzQ0MTc3MjUwOS1wcm9kLWltYWdlcyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFTSUFURE1RNjdQT1JCRVFGUEtULzIwMjQxMTAzL3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IlgtQW16LURhdGUiOiIyMDI0MTEwM1QwMzQ4NDJaIn0seyJYLUFtei1TZWN1cml0eS1Ub2tlbiI6IklRb0piM0pwWjJsdVgyVmpFRlFhQ1hWekxXVmhjM1F0TVNKSE1FVUNJRmoxdDc2S2Y1RmpEWWlicTNoMEd2VGhGUnloU1gxT2ZMak9iTjZ1bURwVUFpRUFuOTZINUdSZVM0TFNUT3hzNHNVODAzT0VxNEs3U3hDQmFJMWpjK3BwRlQwcXNnTUl6Zi8vLy8vLy8vLy9BUkFCR2d3eU1UTTBOREUzTnpJMU1Ea2lERG44bm9ubXRSYW9ZVDBuc0NxR0F4SzhEbzB4SFNzOFJXOEg1ZTBNWm1XYlB0K3RCcWJlS1ZoeXgxRWNEcTdnaGx5RE9kTytERGR1azZDRUN1QWYxdXM1dDB5WmVpUnF6Q3BPSlphQ3pVTkIrekN3Ym53YXVoclNvMFZML2pyNXpxNGZTR0FqVURXbWswWlJRL3FCUU9mTUFFbzY5Vm54R0I0a0EyRHlWeDZLcDlxMGpvUy9CNUxlYWx0dDI3K2ZWWG01S2tKV3NuK2xLL1RudjB2QU9nTTFTbU10Y3BpeVkvSnlBekhFd1liTTdLZUZra0VIWGt4eDF0cDB3cTZRYmZlTHZyaFlzcG1iQmlxUUpYMlI2WXRUVENmbGE1c2s0cmlSV2JxbzIydHBvM0NWTUpZeUY5Q1BwU2J2RXhsNVZSOXpOaDMrK052K3MrRmpmTzBCYXBLNUY0VXQ4eVB1NGZaV2RvTnVYdDhxQUxMN21DWm8yK0VzbUgzVGJQNFBua1VXeGlnOGhBSzVUcGZoczk4NkloSmQzaFI0bmVZNGRyVE8vcTBOc3RzLzlocU5UN3kwMS9jdkM2UHlucVRWVTNmSU0vVjdaMDZOQjF5M2xCVmdaUnhIcHljR0x1b3FycHRUZHNVaGNtaVg1eFBlZkVYZ1ZTaU9lMFloV0VkNjZQNC9sa25xSENjejZTQkM1bVRRM0dhLzF0dE4vekMrNUp1NUJqcWRBY2lyclE2VFhmRVZMRTQ1RGRMTnBrNUxIRWsvbUg5dmZlcWRLSkg1Y3UzUE1FWmlwNU9hUTV3M2oyVkNibS9nQjJ4WTltV1Z2cFNNZGtIYU5uK05xbjMwRXhXVlFxL1RKcEJ2aUdnTkhKa0hCeFoyeVkrMDhISTVPY0hKMTRUck5YVk1pS1FFK0NnWlZLNHZZYmJQYWs2TE5Ob3EzWkNRL1FtM2tWTEVRMUZvbHNLKzFsUHhpUlQzQVdhWnYxSk9iT1RoeExQd1J0ME1xQzFoeWp3PSJ9LHsia2V5IjoidXNlcnMvOGEwMTg2MDctMDhjYS00ZWM5LWEzOTQtZGQ5YjVlZWJmY2I0L2RhdGFzZXRzLzdkODI2OThjLTEyMmYtNDIxZC04ZWJkLWY5MTI3Njg2YjQ4Yy9pbWFnZXMvODE1YzNjYWYtYWNhZS00MWU1LWI4OGQtOTgxOTFmYTkxNzM3L3ByaW1hcnkuanBnIn1dfQ==\",\"X-Amz-Signature\":\"1b6985a814239cc478a5a5417d5cce45cfbcf24de0b504152de157cef855f2dd\"}",
          key: "users/8a018607-08ca-4ec9-a394-dd9b5eebfcb4/datasets/7d82698c-122f-421d-8ebd-f9127686b48c/images/815c3caf-acae-41e5-b88d-98191fa91737/primary.jpg",
          url: "https://image-flex-213441772509-prod-images.s3-accelerate.amazonaws.com/"
        }
      });

  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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

  //    generateImages();
  const [status, setStatus] = useState(true);  // Initialize status as true
  const [message, setMessage] = useState("Generate")
  const [extPrompt, setExtPrompt] = useState("")
  const [enhce, setEnhce] = useState("Enhance Prompt")
  const [disable, setDisable] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category text
  const [activeCategory, setActiveCategory] = useState(""); // State for active category background




  const storeHistory = (imgurl, prompts, email) => {
    api.post("/history", { imgurl, prompts, email }).then((res) => {
      console.log(res.data)
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


      if (prompt.msg == "") {
        alert("please enter prompt !")
      } else if (prompt.noImG > credit) {
        alert("Not enought credits to generate images 😟")
      } else if (selectedCategory == "") {
        alert("please select category")
      } else {

        console.log(prompt)
        console.log(prompt.noImG)
        updateCredits(user?.userData?.email, prompt.noImG)
        setDisable(true)
        setMessage("Pending ...")
        const response = await api.post("/text", prompt);
        console.log(response.data);
        // Start a loop that continues while status is true
        while (status) {
          try {
            // Make the second axios call inside the loop
            setMessage("Generating ...")

            const res = await api.get("/re");
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
      updateCredits("saifkhan77806@gmail.com", 4)
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
  }

  const addCategoryToPrompt = (category) => {
    setSelectedCategory(category); // Store the category text
    setPrompt({ ...prompt, msg: prompt.msg + " " + category })
    setActiveCategory(category); // Set the active category for background change
  };

  function getDateWithIncreasedMonth() {
    let today = new Date(); // Get today's date

    // Create a new Date object with the month increased by 1
    let nextMonthDate = new Date(today.setMonth(today.getMonth() + 1));

    return nextMonthDate;
  }

  // Example usage
  console.log(getDateWithIncreasedMonth());


  const dont = localStorage.getItem("dont")


  return (
    <>
      <Helmet>
        <title>Transform Designs with AI - Jeweality Image to Image</title>
        <meta name='description' content="Upload an image and watch Jeweality's AI transform it into a fresh, creative jewelry design. This feature allows you to refine and reimagine your ideas for stunning, one-of-a-kind pieces." />
      </Helmet>
      <div className='pt-[120px]'></div>
      {
        dont == null && <ConfirmModal user={user?.userData?.credits} />
      }

      <div className='cont flex max-md:flex-col w-full h-full bg-light py-5 px-8'>
        <div className='left-screen w-[30%] max-md:w-full h-full mr-[5%] '>
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

        <div className="right-screen bg-white rounded-xl shadow-lg w-[60%] max-md:w-full h-full ml-[5%] max-md:m-0 max-md:my-5 py-5">
          {/* generation navbar */}
          <div className="info-nav flex">
            <Link to="/ai/text-img" className='px-4  font-semibold text-gray-600 hover:text-gray-400 cursor-pointer mx-3 relative pb-5 transition-all'>
              Generate with text
            </Link>
            <div className='px-4 ac-color font-semibold cursor-pointer mx-3 relative pb-5 hover:text-[#284e1f] transition-all'>
              Generate with Image
              <span className='ac-bg h-[2px] w-full  absolute bottom-0 left-0'></span>
            </div>
          </div>
          <hr className='bg-gray-300' />

          <div className='bg-light p-5 w-[90%] mx-auto mt-5 rounded-lg'>
            <textarea name="" className='w-full p-3 poppins shadow-lg rounded-md' placeholder='Describe what you want to create, including any key features or styles.' id="" value={prompt.msg} rows={7} onChange={(e) => changed(e)}></textarea>
            <Button className="my-4 ac-bg hover:bg-[#5a7a45]" disabled={disable} onClick={(e) => enhance(prompt)}>
              <TulipBtn btn={enhce} msg={"per enhacing prompt 4 credits is deducted"} dis={disable} />
            </Button>

            <div className='flex items-center justify-center flex-col w-full'>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <div className='w-full h-[200px] bg-white my-10 mx-auto px-10 rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>
                      <FaGear className='text-[70px] ac-color drop-shadow-md animate-spin' />
                      <p className='poppins italic font-medium'>Drop here files !</p>
                    </div>
                    :
                    <div className='px-10  h-[200px] bg-white my-10 mx-auto rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>
                      <IoCloudUpload className='text-[70px] ac-color drop-shadow-md animate-bounce' />
                      <p className='poppins italic font-medium'>upload here through Drag 'n drop </p>
                    </div>
                }
              </div>
            </div>

            <p className='text-base font-bold poppins'>Category</p>
            <div className='flex my-5 flex-wrap justify-center'>
              <button
                onClick={() => addCategoryToPrompt("Necklace")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all
                      ${activeCategory === "Necklace" ? ' text-[#44662e]' : 'hover:text-[#44662e]'}`}
              >
                <GiNecklaceDisplay className='mx-auto text-[60px] transition-all' />
                Necklace
              </button>

              <button
                onClick={() => addCategoryToPrompt("Brooch")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all
                      ${activeCategory === "Brooch" ? ' text-[#44662e]' : 'hover:text-[#44662e]'}`}
              >
                <GiEmeraldNecklace className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Brooch
              </button>

              <button
                onClick={() => addCategoryToPrompt("Earring")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all
                      ${activeCategory === "Earring" ? ' text-[#44662e]' : 'hover:text-[#44662e]'}`}
              >
                <GiEarrings className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Earring
              </button>

              <button
                onClick={() => addCategoryToPrompt("Ring")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all
                      ${activeCategory === "Ring" ? ' text-[#44662e]' : 'hover:text-[#44662e]'}`}
              >
                <GiBigDiamondRing className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Ring
              </button>
              <button
                onClick={() => addCategoryToPrompt("Bracelet")}
                className={`cursor-pointer my-4 mx-4 text-center poppins font-medium transition-all
                      ${activeCategory === "Bracelet" ? ' text-[#44662e]' : 'hover:text-[#44662e]'}`}
              >
                <GiTyre className='mx-auto text-[60px] hover:text-[#44662e] transition-all' />
                Bracelet
              </button>
            </div>

            <p className='text-base font-bold poppins'>No. of images</p>
            <div className='mx-auto flex justify-center flex-wrap py-5'>
              <Button className='p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3 hover:text-white border border-gray-500' onClick={(e) => nums(1)} >1</Button>
              <Button className='p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3  hover:text-white border border-gray-500' onClick={(e) => nums(2)} >2</Button>
              <Button className='p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3  hover:text-white border border-gray-500' onClick={(e) => nums(3)} >3</Button>
              <Button className='p-5 bg-light mx-5 rounded-lg poppins font-semibold shadow-lg text-gray-600 active:bg-gray-200 hover:bg-[#5a7a45] my-3  hover:text-white border border-gray-500' onClick={(e) => nums(4)} >4</Button>
            </div>

            <div className='flex justify-center items-center'>

              <Button className="my-10 px-10 w-[40%] mx-auto ac-bg hover:bg-[#5a7a45]" disabled={disable} onClick={generate}>{message}</Button>
            </div>


            <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full m-auto'>
              {
                data?.generations_by_pk?.generated_images.map((el, index) => {
                  return <>
                    <div className='m-3 px-4  rounded-xl imagcont relative' key={index}>
                      <img id='testImg' className='w-full h-full rounded-xl' src={el?.url} key={el?.url} alt="img" />
                      <Button className="ac-bg hover:bg-[#5a7a45] download text-white py-2 px-4 rounded-lg absolute top-0 mt-1 mr-1 right-4" key={`${el?.url}${index}`} onClick={(e) => downloadImage(el?.url, index)}><FaDownload /></Button>
                    </div>
                  </>
                })
              }
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default ImgImg