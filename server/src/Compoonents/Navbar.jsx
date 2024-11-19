import React, { useEffect, useLayoutEffect, useState } from 'react'
import Menu from './Menu'
import { Link, useNavigate } from 'react-router-dom'
import Sheet from './Sheet';
import Logo from './Logo';
import Profile from "./Profile"
import { Button } from '@material-tailwind/react';
import { useAuth } from '../../store/auth';

const Navbar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scroll, setScroll] = useState()

  const navigate = useNavigate()


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScroll("down")
        // console.log('down');
      } else if (currentScrollTop < lastScrollTop) {
        setScroll("up")
        // console.log('up');
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);


  const { user } = useAuth()

  return (
    <>
      <nav className='fixed w-full z-30 top-0'>
        <div className='flex justify-center py-6 relative z-20'>
          <div className='absolute left-0 h-full flex justify-center items-center pt-5 px-5 -top-2'>
            <Sheet />
          </div>
          {/* logo */}
          <Logo />

          {/* profile */}
          <div className='absolute right-7'>
            {
              !user ? (
                <>
                  <Button size='sm' className='mr-3 max-sm:hidden ac-bg rounded-full' onClick={() => navigate("/login")}>Login</Button>
                  <Button size='sm' className='max-sm:hidden ac-bg rounded-full' onClick={() => navigate("/register")}>Register</Button>
                </>
              ) : (
                <Profile />
              )
            }
          </div>
        </div>
        <div className='flex justify-center my-auto py-1 relative' style={{ top: scroll == "down" ? "-112px" : "0px", display: scroll == "down" ? "none" : "flex" }}>
          <Menu />
        </div>
      </nav>
    </>
  )
}

export default Navbar