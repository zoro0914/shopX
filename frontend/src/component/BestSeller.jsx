import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {products} = useContext(shopDataContext)
    let [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
    let filterProduct = products.filter((item) => item.bestseller)

    setBestSeller(filterProduct.slice(0,4));
    },[products])
  return (
    <div className='bg-white min-h-screen'>
        <div className='w-[100%] text-center mt-8 sm:mt-12 md:mt-[50px] px-4'>
            <Title text1={"BEST"} text2={"SELLER"}/> 
            <p className='w-[100%] m-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-4 text-black'>Tried, Tested, Loved – Discover Our All-Time Best Sellers.</p>
        </div>
        <div className='w-[100%] px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center'>
            {
             bestSeller.map((item,index)=>(
                <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
             ))
            }
        </div>
    </div>
  )
}

export default BestSeller
