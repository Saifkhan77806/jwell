import { Input } from '@material-tailwind/react';
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button';
import { FaGear } from 'react-icons/fa6';
import {useDropzone} from 'react-dropzone'
import { IoCloudUpload } from 'react-icons/io5';
import api from './Api';

const Post = () => {
    const [selectedText, setSelectedText] = useState('');
    const [url, setUrl] = useState('');
    const [isUrlInputVisible, setUrlInputVisible] = useState(false);
    const [input,setInput] = useState(false)
    const [texts,setTexts] = useState()
    const [src,setSrc] = useState()
    const [edit,setEdit] = useState(true)
  

    const para = document.getElementById("para")
    useEffect(()=>{
      console.log(para)
      if(src){
        const imgTag = document.createElement('img');
        imgTag.src = src
        imgTag.className = "w-[70%] h-[300px] mx-auto rounded-xl shadow-xl my-5"
        para.appendChild(imgTag)
      }
    },[src])

    const upload = async() =>{
      const para = document.getElementById('para')

      const content = para.innerHTML

      await api.post("/post-blog", {title: texts,thought: content,thumbnail: "https://back-alpha-amber.vercel.app/public/image_1727639242934.jpg"}).then((res)=>{
        alert("blog posted successfully !")
      })
    }


    const urls = "https://back-alpha-amber.vercel.app/upload"
    const onDrop = async(acceptedFiles) => {

      const datass = new FormData();
      datass.append('image', acceptedFiles[0]);
      
      const opts = {
        method: "POST",
        body: datass,
      }
      
      await fetch(urls, opts)
        .then((response) => {
          console.log('Full response:', response);  // Log full response
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response data:', data);  // Log the parsed response body
          setSrc(data.fileUrl)
        })
        .catch((err) => {
          console.error('Error:', err);  // Log any errors caught
        });
      
      
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  

    const handleTextSelection = () => {
        const text = window.getSelection().toString();
        if (text) {
            setSelectedText(text);
            setUrlInputVisible(true);
        }
    };





    const handleLinkCreation = () => {
        if (url) {
            const newElement = document.createElement('a');
            newElement.href = url;
            newElement.target = '_blank';
            newElement.innerText = selectedText;
            newElement.className = "underline"

            const range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(newElement);
            
            // Reset states
            setSelectedText('');
            setUrl('');
            setUrlInputVisible(false);
        }
    };

  return (
    <>
    <div className='pt-[20px]'></div>
    <Button className="ac-bg hover:bg-[#5a7a45] my-3 mx-5" onClick={()=>setInput(!input)}>Post images</Button>
    {
      input && <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className=' w-[600px] h-[200px] bg-light my-10 mx-auto px-10 rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>
        <FaGear  className='text-[70px] ac-color drop-shadow-md animate-spin'/>
        <p className='poppins italic font-medium'>Drop here files !</p>
        </div>
       :
          <div className='px-10 w-[600px] h-[200px] bg-light my-10 mx-auto rounded-lg shadow-xl flex justify-center items-center flex-col max-md:w-[200px]'>

            <IoCloudUpload  className='text-[70px] ac-color drop-shadow-md animate-bounce'/>
            <p className='poppins italic font-medium'>upload here through Drag 'n drop </p>
          </div>
      }
    </div>
    }


<div className="relative w-full min-w-[200px]">
    <textarea
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent bg-light px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50  bg-white shadow-lg"
      placeholder="" value={texts} onChange={(e)=>setTexts(e.target.value)}></textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] text-gray-500  leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 poppins font-semibold">
      enter your title here !
    </label>
  </div>


    <div style={{ padding: '20px' }}>
      <Button className="ac-bg hover:bg-[#5a7a45] my-3" onClick={()=>setEdit(!edit)}>Edit</Button>
            <h1>Select Text and Create Link</h1>
            <pre onMouseUp={handleTextSelection} style={{background:  edit?"#efefef":"#fff" }} className='shadow-xl' contentEditable={edit} suppressContentEditableWarning id='para'>
            </pre>
            {isUrlInputVisible && (
                <div>
                    <Input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        className='bg-light shadow-lg border-none'
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    
                    <Button className="ac-bg hover:bg-[#5a7a45] my-3" onClick={handleLinkCreation}>Create Link</Button>
                </div>
            )}

        <Button className="ac-bg hover:bg-[#5a7a45] my-3" onClick={()=>upload()}>Post Blog</Button>
        </div>

    </>
  )
}

export default Post


