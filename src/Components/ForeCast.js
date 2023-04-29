import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../swiper.css";
import { FreeMode, Pagination } from "swiper";

export default function ForeCast({data , error , tempunit , handleadd , handledel , favorites}) {



  return (
    <>
     <section className='forecast p-4 text-center'>


     {error === 404 ? <h4 className='text-light m-0'> City Not Found Search Again  </h4> : 

        data ? <>
           
            <div className='text-center text-light fw-bold fs-1 text-capitalize'>{data.name.length > 10 ? data.name.split(" ")[0] : data.name}</div>
 <div className='text-center text-light fw-bold  text-capitalize my-2' style={{ fontSize:"60px"}}>{tempunit ? `${data.main.temp}°K` : `${(data.main.temp - 273.15).toFixed(0)}°C`}</div>
 <div className='text-center text-light fw-bold  text-capitalize  fs-1'>{data.weather[0].main}</div>
 <div className='text-center text-light fw-bold  text-capitalize mb-2 fs-4'>{data.weather[0].description}</div>
 <div className='swiper-div p-2'>
 <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        
        pagination={{
            type: "progressbar",
          }}
      
          modules={[FreeMode , Pagination ]}
        className="mySwiper"
        breakpoints={{
            // when window width is >= 640px
            300: {
              width: 300,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            1000: {
              width: 1000,
              slidesPerView:3,
            },
         
          }}
      >
        <SwiperSlide>
            <span className='fs-3'>{data.wind.speed} m/s</span>
            <span style={{fontSize:"17px"}}>Wind Speed</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'>{data.wind.deg}°</span>
            <span style={{fontSize:"17px"}}>Wind Direction</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'>{data.main.humidity}%</span>
            <span style={{fontSize:"17px"}}>Humidity</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'> {tempunit ? `${data.main.temp_max}°K` : `${(data.main.temp_max - 273.15).toFixed(0)}°C`}</span>
            <span style={{fontSize:"17px"}}>Maximum Temp</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'> {tempunit ? `${data.main.temp_min}°K` : `${(data.main.temp_min - 273.15).toFixed(0)}°C`} </span>
            <span style={{fontSize:"17px"}}>Minimum Temp</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'> {tempunit ? `${data.main.feels_like}°K` : `${(data.main.feels_like - 273.15).toFixed(0)}°C`}</span>
            <span style={{fontSize:"17px"}}>Feels Like</span>
        </SwiperSlide>
        <SwiperSlide>
            <span className='fs-3'>{data.clouds.all}%</span>
            <span style={{fontSize:"17px"}}>Clouds</span>
        </SwiperSlide>
     
      </Swiper>
     <div className='country d-flex gap-2 text-light align-items-center' title="country">
      
      <img src={`https://flagcdn.com/160x120/${data.sys.country.toLowerCase()}.png`} alt='country-flag' className='img-fluid rounded' style={{width:"30px" , height :"20px"}}/>
      <span>{data.sys.country}</span>
     </div>
     {favorites.includes(data.name.split(" ")[0]) ? 

        <div className='fav d-flex text-muted align-items-center justify-content-center fs-1' onClick={()=>{handledel(data.name.split(" ")[0])}} >
        <FontAwesomeIcon icon={faHeart} style={{color: "red" , fontSize : "20px"}}  />
        </div> 
        :
        <div className='fav d-flex text-muted align-items-center justify-content-center fs-1' onClick={()=>{handleadd(data.name.split(" ")[0])}}>
        +
        </div>
     }
     
 </div>

       
        </> :   <h4 className='text-light m-0'> Start Searching to Display The Current Weather </h4>} 
        </section>
        </>
  )
}
