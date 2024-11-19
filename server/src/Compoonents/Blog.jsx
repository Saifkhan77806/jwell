import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from './Api'
import { Helmet } from 'react-helmet-async'

const Blog = () => {

    const [blog,setBlog] = useState()

    useEffect(()=>{
        api.get("/all-blog").then((res)=>{
            console.log(res.data.blog)
            setBlog(res.data.blog)
        })
    },[])

  return (
   <>
   <Helmet>
<title>Jeweality Blog - Jewelry Design Tips and AI Innovations  </title>
<meta name='description' content="Stay updated with the latest trends in jewelry design and AI technology through the Jeweality blog. Explore tips, tutorials, and news that inspire creativity and innovation in the jewelry industry." />
</Helmet>
   <div className="pt-[120px]"></div>
   <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-3'>

    {
        blog?.map((el,index)=>{
   return <div className='bg-light mx-3 rounded-lg py-3 my-5'>
        <div className='pl-3'>
            <h1 className='my-2 luxuria font-bold'>{el?.title}</h1>
            <pre
    className='poppins w-full h-[150px] overflow-hidden' 
    dangerouslySetInnerHTML={{__html: el?.thought}}
    />
            <Link to={`/getblog/${el?._id}`} className='poppins underline font-light my-3'>Read more</Link>
        </div>
    </div>
        })
    }

   </div>
   </>
  )
}

export default Blog