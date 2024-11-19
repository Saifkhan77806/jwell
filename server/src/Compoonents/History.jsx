import React from 'react'
import { useAuth } from '../../store/auth';
import { Button } from '@material-tailwind/react';
import { FaDownload } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const History = () => {

  const { user } = useAuth()

  const downloadImage = async (imageUrl, index) => {
    console.log(imageUrl)
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${index}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up after the download
  };


  return (
    <>
      <Helmet>
        <title>View Your Design History at Jeweality  </title>
        <meta name='description' content="Keep track of all your previous designs with our History page. Easily access your past AI-generated jewelry concepts and stay organized as you explore new creative ideas. Revisit, tweak, and perfect your designs anytime." />
      </Helmet>
      <div className='pt-[150px]'></div>
      <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full m-auto px-5'>
        {
          user?.userData?.history.map((el, index) => {
            const prompt = el?.prompts.slice(0,20)
            return (<>
              <div className='m-3  rounded-xl imagcont relative overflow-hidden historyContainer' key={index}>
            
                <img id='testImg' className='w-full h-full rounded-xl' src={el?.imgurl} key={el?.imgurl} alt="img" />
                <Button className="ac-bg hover:bg-[#5a7a45] text-white py-2 px-4 rounded-lg relative top-[-100%] mt-1 mr-1 right-[-5px]" key={`${el?.imgurl}-${index}`} onClick={(e) => downloadImage(el?.imgurl, `${prompt}-${index}` )}><FaDownload /></Button>
                <span className='w-full h-full historyContent -bottom-[100%] absolute flex justify-center rounded-bl-xl'>{el?.prompts}</span>
              </div>
            </>)
          })
        }
      </div>

    </>
  )
}

export default History