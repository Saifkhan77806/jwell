import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUpload } from "react-icons/io5";
import { Button } from '../../components/ui/button';
import { FaGear } from "react-icons/fa6";

import { FaArrowRight } from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ImgText = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <>
      <Helmet>
        <title>Convert Designs to Descriptions - Jeweality AI  </title>
        <meta name='description' content="Use Jeweality's Image to Text feature to generate detailed descriptions of your jewelry designs. Perfect for documenting ideas, sharing with clients, or keeping track of your creative work." />
      </Helmet>
      <div className='pt-[140px]'></div>
      <div className='absolute left-5 flex items-center'><FaArrowLeft /><Link to="/ai/img-img">Images to Images</Link></div>
      <div className='absolute right-5 flex items-center'><Link to="/ai/text-img">Text to Images</Link><FaArrowRight /></div>
      <h1 className='text-center luxuria font-bold text-lg my-10'>
        Images to text
      </h1>
      <div className='flex items-center justify-center flex-col '>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <div className=' w-[770px] h-[200px] bg-light my-10 mx-auto px-10 rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>
                <FaGear className='text-[70px] ac-color drop-shadow-md animate-spin' />
                <p className='poppins italic font-medium'>Drop here files !</p>
              </div>
              :
              <div className='px-10 w-[770px] h-[200px] bg-light my-10 mx-auto rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>
                <IoCloudUpload className='text-[70px] ac-color drop-shadow-md animate-bounce' />
                <p className='poppins italic font-medium'>upload here through Drag 'n drop </p>
              </div>
          }
        </div>
        <Button className="my-10 px-10 ac-bg hover:bg-[#5a7a45] ">Generate</Button>
        <textarea name="" id="" value={"Preview text !"} readOnly className='bg-light shadow-2xl w-[70%] h-[100px] rounded-lg'></textarea>
      </div>
    </>
  )
}
export default ImgText