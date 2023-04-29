import React from 'react'
import { nanoid } from 'nanoid'

export default function Recent({recent , setCity}) {
  return (
    <section className='recent-section my-2 pb-1 pt-2 px-4'>
        <h4 className='m-0 p-0 mx-2'>Recent Search:</h4>
        <div className='d-flex flex-wrap gap-lg-0 gap-sm-2'>
            {recent.length > 0 ? recent.map(item=>{
                return <span className='recent-item px-3 my-1 text-light  mx-1 p-1' onClick={()=>{setCity(item)}} key={nanoid()}>{item}</span>
            }) : <span className='text-center mx-3'>No Recent Search</span>}
        </div>


    </section>
  )
}
