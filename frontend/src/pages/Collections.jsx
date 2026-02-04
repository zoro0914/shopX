import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(showSearch && search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)

    }


    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search ,showSearch])






  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] pt-[70px] pb-[110px] overflow-x-hidden'>
      <div className={`w-full md:w-80 lg:w-64 ${showFilter ? "h-auto min-h-[45vh]" : "h-12"} p-4 md:p-6 border-r border-gray-400 text-black lg:fixed lg:h-screen transition-all duration-300`}>
        <p className='text-xl md:text-2xl font-semibold flex gap-2 items-center justify-start cursor-pointer' onClick={()=>setShowFilter(prev=>!prev)}>FILTERS
            {!showFilter && <FaChevronRight className='text-base md:hidden'  />}
           {showFilter && <FaChevronDown className='text-base md:hidden'  />}
        </p>
        

        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-gray-100 ${showFilter ? "block" : "hidden"} md:block`}>
            <p className='text-lg md:text-xl text-black font-medium'>CATEGORIES</p>
            <div className='w-full max-w-xs flex flex-col gap-3 mt-3'>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'Men'} className='w-4 h-4' onChange={toggleCategory} /> Men
                </label>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'Women'} className='w-4 h-4' onChange={toggleCategory} /> Women
                </label>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'Kids'} className='w-4 h-4' onChange={toggleCategory} /> Kids
                </label>
            </div>
        </div>
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-gray-100 ${showFilter ? "block" : "hidden"} md:block`}>
            <p className='text-lg md:text-xl text-black font-medium'>SUB-CATEGORIES</p>
            <div className='w-full max-w-xs flex flex-col gap-3 mt-3'>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'TopWear'} className='w-4 h-4' onChange={toggleSubCategory} /> TopWear
                </label>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'BottomWear'} className='w-4 h-4' onChange={toggleSubCategory} /> BottomWear
                </label>
                <label className='flex items-center gap-3 text-sm md:text-base font-light cursor-pointer hover:text-gray-700 transition-colors'>
                    <input type="checkbox" value={'WinterWear'} className='w-4 h-4' onChange={toggleSubCategory} /> WinterWear
                </label>
            </div>
        </div>
      </div>
      <div className='lg:ml-64 md:ml-80 flex-1 min-h-screen'>
        <div className='px-4 md:px-6 lg:px-12 py-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                <Title text1={"ALL"} text2={"COLLECTIONS"}/>

                <select name="" id="" className='bg-gray-100 w-full sm:w-48 md:w-56 h-12 px-4 text-black rounded-lg hover:border-[#46d1f7] border-2 transition-colors focus:outline-none focus:border-[#46d1f7]' onChange={(e)=>SetSortType(e.target.value)}>
                    <option value="relavent">Sort By: Relavent</option>
                    <option value="low-high">Sort By: Low to High</option>
                    <option value="high-low">Sort By: High to Low</option>
                </select>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8'>
                {
             filterProduct.map((item,index)=>(
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
             ))
            }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Collections