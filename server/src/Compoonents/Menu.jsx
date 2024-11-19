import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'


const Menu = () => {
  const {user, credit} = useAuth()
  const navigate = useNavigate()

  const isLogin = () =>{
    if(user){
      if(credit>0){
        navigate("/ai/img-text")
      }else{
        navigate("/pricing")
      }
    }else{
      navigate("/login")
    }
  }

  return (
    <NavigationMenu className="shadow-none max-sm:m-0 max-md:hidden">
      <NavigationMenuList className="">


        {/* Home option */}
        <NavigationMenuItem className='shadow-none luxuria cursor-pointer hover:font-bold transition-all'>
          <Link to="/">
          Home
          </Link>
        </NavigationMenuItem>


        {/* Features */}
        {
          credit > 0 && <NavigationMenuItem className='shadow-none'>
          <NavigationMenuTrigger className="bg-transparent hov shadow-none luxuria pl-5 hover:bg-transparent hover:font-bold transition-all">Features</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[50%]">
          <div className='luxuria w-[250px] h-[50px] flex items-center pl-3 hover:bg-gray-200 hover:font-bold transition-all'  onClick={isLogin}>
            <Link to="/ai/text-img">
          <i className='luxuria'>Text to images</i>
            </Link>
          </div>
          <div className='w-[250px] h-[50px] flex items-center pl-3 hover:bg-gray-200 hover:font-bold transition-all luxuria italic' onClick={isLogin}>
            <Link to="/ai/img-img" >
          Images to Images
            </Link>
          </div>
          <div className='w-[250px] h-[50px] flex items-center pl-3 hover:bg-gray-200 hover:font-bold transition-all luxuria italic'  onClick={isLogin}>
          <Link to="/ai/img-text ">
            Images to text
            </Link>
          </div>
      </NavigationMenuContent>
        </NavigationMenuItem> 
        }

        {/* How its works */}

        <NavigationMenuItem className='luxuria cursor-pointer px-3 hover:font-bold transition-all'>
          <Link to="/pricing" >
        Pricing
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className='luxuria cursor-pointer px-3 hover:font-bold transition-all'>
          <Link to="/blog">
        Blogs
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='luxuria cursor-pointer px-3 hover:font-bold transition-all'>
          <a href="#contactus">
        Contact us
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

  )
}

export default Menu