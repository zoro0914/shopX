import React from 'react'

function NewLetterBox() {
    const handleSubmit = ()=>{
        e.preventDefault()
    }
  return (
    <div className='w-[100%] h-[40vh]  bg-black flex items-center justify-start gap-[10px] flex-col'>
      <p className='md:text-[30px] text-[20px] text-white font-semibold px-[20px]'>Subscribe now & get 20% off</p>
      <p className='md:text-[18px] text-[14px] text-center text-white font-semibold px-[20px]'>Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.</p>
      <form action="" onSubmit={handleSubmit} className='w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px]'>
        <input type="text" placeholder='Enter Your Email' className='placeholder:text-gray-400 bg-white w-[600px] max-w-[60%] h-[40px]  px-[20px] rounded-lg shadow-lg' required />
        <button type='submit' className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px]  hover:bg-gray-800 cursor-pointer bg-[#007bff] text-white flex items-center justify-center gap-[20px] border-[2px] border-[#007bff] rounded-lg shadow-lg transition-all duration-300'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewLetterBox
