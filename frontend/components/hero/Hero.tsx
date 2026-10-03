'use client'
import { useEffect, useState } from "react";
import { IBannerDetail } from "./BannerListComponent";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper,SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/autoplay";
import axiosClient from "@/lib/services/apiclient";
export default function HeroSection (){
    const [heroData, setHeroData] = useState<Array<IBannerDetail>>();

    const getBannerData = async() => {
      try {
        const response = await axiosClient.get("/banners/home")
        console.log(response.data)
        setHeroData(response.data)
      } catch(exception) {
          console.log (exception)
        // 
      }
    }
    
    useEffect(()=> {
        getBannerData()
    
      // return () => {
      //   console.log("I am herer")
      //   getBannerData()
      // }
    }, [])

    return (
        <section className="w-full overflow-hidden">
         <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay:3000
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay,Navigation]}
            speed={300}
            className="h-[700px"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
        {
            heroData && heroData.map((row:IBannerDetail, index:number)=>(
              
              
            <SwiperSlide key={index}>
                <div className="relative" >
                  
                <img src={row.image.url} 
               crossOrigin="anonymous"
                     alt={row.title}
                     className="w-full h-175 object-cover "
                     loading="lazy"/>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white px-4 animate-fadeInUp">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{row.title}</h1>
                        <p className="text-xl mb-6">{row?.subTitle}</p>
                       <div className="flex gap-5 items-center justify-center">
                       {/* <button className=" hover:bg-blue-700 bg-red-500 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
                       {row.links &&
                    row.links.map((link, inx) => (
                      <a href={link.link} key={inx} className="bg-primary hover:bg-red-500 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
                        {link.label}
                      </a>
                    ))}
                        </button> */}
                         {row.links?.map((link, index) => (
                          
                           <a
                           key={index}
                          href={link.link}
                          className="bg-red-500 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 inline-block"
                          >
                           {link.label}
                           </a>
                           ))}
                            
                       </div>
                    </div>
                </div>
            </div>
              </SwiperSlide>
            ))
        }
        </Swiper>
       </section>
    )
}