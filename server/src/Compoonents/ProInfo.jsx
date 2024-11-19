import { useAuth } from '../../store/auth'
import React from 'react'
import url from "../assets/proImg"
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


const ProInfo = () => {

  const { user } = useAuth()


  return (
    <>
      <Helmet>
        <title>Manage Your Jeweality Profile  </title>
        <meta name='description' content="Update and manage your personal information on Jeweality's Profile page. Keep your details up to date and ensure a smooth experience while designing beautiful jewelry with our AI tools." />
      </Helmet>
      <div className='pt-[120px]'></div>
      <div className='cont flex max-md:flex-col w-full h-full bg-light py-5 px-8'>
        <div className='left-screen w-[30%] max-md:w-full h-full mr-[5%] '>
          <div className='profile-photo py-10 flex bg-white shadow-lg rounded-xl flex-col justify-center items-center mb-5'>
            <div className='w-36 h-36 rounded-[50%] overflow-hidden mb-5'>
              <img src={user?.userData?.profile ? user?.userData?.profile : url} className='w-full h-full' alt="" />
            </div>
            <p className='font-semibold poppins tracking-widest text-2xl'>Saif khan</p>
          </div>

          <div className='profile-photo flex bg-white shadow-lg rounded-xl flex-col justify-center mt-5 overflow-hidden'>
            <p className='py-5 text-center font-bold poppins tracking-wide'>AI Creation</p>
            <Link to="/ai/img-text" className='py-5 hover:bg-gray-200 transition-all pl-3 font-medium text-base tracking-wider hover:font-semibold'>AI Creation</Link>
            <Link to="/history" className='py-5 hover:bg-gray-200 transition-all pl-3 font-medium text-base tracking-wider hover:font-semibold'>History</Link>
            <Link to="/change-password" className='py-5 hover:bg-gray-200 transition-all pl-3 font-medium text-base tracking-wider hover:font-semibold'>Change Password</Link>
          </div>

        </div>

        <div className="right-screen bg-white rounded-xl shadow-lg w-[60%] max-md:w-full h-full ml-[5%] max-md:m-0 max-md:my-5 p-5">
          <div className="info-nav"></div>
          <div className="info-box bg-light rounded-lg">
            <div className='info-head flex py-5 pl-4'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>First Name</div>
              <div className='info-content font-semibold poppins'>{user?.userData?.firstName ? user?.userData?.firstName : ""}</div>
            </div>
            <div className='info-head flex py-5 pl-4 '>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>last Name</div>
              <div className='info-content font-semibold poppins'>{user?.userData?.lastName ? user?.userData?.lastName : ""}</div>
            </div>
            <div className='info-head flex py-5 pl-4'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>Email</div>
              <div className='info-content font-semibold poppins'>{user?.userData?.email ? user?.userData?.email : ""}</div>
            </div>
            <div className='info-head flex py-5 pl-4'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>Phone</div>
              <div className='info-content font-semibold poppins'>{user?.userData?.phone ? user?.userData?.phone : ""}</div>
            </div>
            <div className='info-head flex py-5 pl-4'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>Country</div>
              <div className='info-content font-semibold poppins'>{user?.userData?.country ? user?.userData?.country : ""}</div>
            </div>
            <div className='info-head flex py-5 pl-4 max-sm:flex-col'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>Subscription</div>
              <div className='info-content font-semibold poppins max-sm:my-2'>{user?.userData?.subscription ? user?.userData?.subscription : "No subscription purchased"}</div>
            </div>
            <div className='info-head flex py-5 pl-4 max-sm:flex-col'>
              <div className='info-heading w-[40%] font-medium poppins tracking-wide text-gray-600'>Subscription</div>
              <div className='info-content font-semibold poppins max-sm:my-2'>
                {
                  user?.userData?.member?.map((el) => {
                    return (
                      <div className='border-b border-gray-400'>
                        {el?.email} <br />{el?.type} <br /> {el?.credits}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProInfo