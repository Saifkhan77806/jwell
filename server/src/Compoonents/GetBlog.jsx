import React, { useEffect, useState } from 'react'
import api from './Api'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const GetBlog = () => {
  const [blog, setBlog] = useState()

  const { id } = useParams()

  console.log({ id })

  useEffect(() => {
    api.get(`/get-blog/${id}`).then((res) => {
      console.log(res.data.blog)
      setBlog(res.data.blog)
    })
  }, [])
  return (
    <>
      <Helmet>
        <title>Jeweality Blog - {blog?.title? blog?.title : "Jewelry Design Tips and AI Innovations"}</title>
        <meta name='description' content="Stay updated with the latest trends in jewelry design and AI technology through the Jeweality blog. Explore tips, tutorials, and news that inspire creativity and innovation in the jewelry industry." />
      </Helmet>
      <div className='pt-[140px]'></div>
      <h1 className='text-2xl text-center font-bold'>
        {blog?.title}
      </h1>
      <pre
        className='poppins'
        dangerouslySetInnerHTML={{ __html: blog?.thought }}
      />
    </>
  )
}

export default GetBlog