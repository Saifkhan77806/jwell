import React, { useEffect, useState } from 'react';
import url from "../assets/proImg";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import api from './Api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
 
const Review = () => {
    const [filter, setFilter] = useState()

    useEffect(() => {

        

        api.get("/get-review").then((res) => {
            console.log(res.data)

           setFilter(res.data.filter((el) => el?.approve == true))

            console.log("this review page", filter)
        })
    }, [])
    
  return (
    <>
    <h1 className='text-center luxuria font-bold text-3xl my-10'><i>Ours Reviews</i></h1>

    <Carousel className="w-full min-w-[70%] m-auto max-w-sm">
      <CarouselContent className="-ml-1">
        {filter?.map((el, index) => {
          const validRates = Number.isInteger(el.rates) && el.rates >= 0 && el.rates <= 5 ? el.rates : 0; // Ensure 

          return (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 mx-1">
             <div
                                key={index}
                                className='carousel-item min-h-[250px]   rounded-md mx-5 mb-10 flex flex-col bg-light shadow-xl relative'
                            >
                                <div className='flex my-4 mx-3 relative'>
                                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                                        <img src={el?.profile ? el?.profile : url} alt='profile' className='w-full h-full' />
                                    </div>
                                    <p className='poppins font-bold absolute left-12'>{el?.name}</p>
                                    <div className='flex absolute left-12 bottom-0'>
                                        {/* Render full stars */}
                                        {[...Array(validRates)].map((_, i) => (
                                            <FaStar key={`full-${i}`} className='text-yellow-600' />
                                        ))}
                                        {/* Render empty stars */}
                                        {[...Array(5 - validRates)].map((_, i) => (
                                            <CiStar key={`empty-${i}`} className='text-gray-400' />
                                        ))}
                                    </div>
                                </div>
                                <div className='px-5 luxuria font-medium italic my-2'>
                                    {el?.message}
                                </div>
                            </div>
          </CarouselItem>
          )
})}
      </CarouselContent>
      <CarouselPrevious className="max-sm:hidden" />
      <CarouselNext className="max-sm:hidden" />
    </Carousel>

    <button className='w-[30%] py-3 my-6 rounded-md flex justify-center poppins font-semibold ac-bg mx-auto text-white hover:bg-[#284e1f] transition-all'><i>See all</i></button>
    </>
  )
}

export default Review;





 