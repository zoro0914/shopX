import React from 'react'
import logo from "../assets/shopX.png"
function Footer() {
  return (
    <div className='w-full min-h-[36vh] lg:h-[36vh] md:h-[40vh] mb-[88px] md:mb-[0px]'>
        <div className='w-full min-h-[30vh] lg:h-[30vh] md:h-[35vh] bg-white flex flex-col md:flex-row items-center justify-center lg:px-[50px] md:px-[30px] px-[20px] py-[20px] md:py-0'>
            <div className='lg:w-[30%] md:w-[35%] w-full h-full flex items-center justify-center flex-col gap-[5px] text-center md:items-start md:text-left md:mb-0 mb-[20px]'>
                <div className='flex items-center justify-center gap-[5px] lg:mt-[40px] md:mt-[30px] mt-[10px] md:justify-start'>
                    <img src={logo} alt="" className='lg:w-[90px] lg:h-[45px] md:w-[60px] md:h-[60px] w-[50px] h-[50px]'/>
                </div>
                <p className='text-[13px] md:text-[14px] lg:text-[15px] text-[#1e2223] hidden md:block'>ShopX is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.</p>
                <p className='text-[13px] text-[#1e2223] flex md:hidden text-center'>Fast. Easy. Reliable. ShopX Shopping</p>
            </div>
            
            <div className='lg:w-[25%] md:w-[30%] w-full h-full flex items-center justify-center flex-col text-center md:mb-0 mb-[15px]'>
                <div className='flex items-center justify-center gap-[5px] lg:mt-[40px] md:mt-[30px] mt-[10px]'>
                    <p className='text-[16px] md:text-[17px] lg:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>
                </div>
                <ul className='flex flex-col md:block gap-[5px] md:gap-0'>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600 transition-colors'>Home</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600 transition-colors'>About us</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600 transition-colors'>Delivery</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600 transition-colors'>Privacy Policy</li>
                </ul>
            </div>

            <div className='lg:w-[25%] md:w-[35%] w-full h-full flex items-center justify-center flex-col text-center'>
                <div className='flex items-center justify-center gap-[5px] lg:mt-[40px] md:mt-[30px] mt-[10px]'>
                    <p className='text-[16px] md:text-[17px] lg:text-[20px] text-[#1e2223] font-sans'>GET IN TOUCH</p>
                </div>
                <ul className='flex flex-col md:block gap-[5px] md:gap-0'>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hover:text-gray-600 transition-colors'>+91-9876543210</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hover:text-gray-600 transition-colors'>contact@onecart.com</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hidden md:block hover:text-gray-600 transition-colors'>+1-123-456-7890</li>
                    <li className='text-[12px] md:text-[13px] lg:text-[15px] text-[#1e2223] hidden md:block hover:text-gray-600 transition-colors'>ShopX@gmail.com</li>
                </ul>
            </div>
        </div>
        <div className='w-full h-[1px] bg-slate-400'></div>
        <div className='w-full h-[5vh] bg-white flex items-center justify-center text-[11px] md:text-[12px] lg:text-[14px] text-center px-[10px]'>Copyright 2026@shopX.com-All Rights Reserved</div>
    </div>
  )
}

export default Footer
