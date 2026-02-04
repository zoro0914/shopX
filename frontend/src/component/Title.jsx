import React from 'react'

function Title({text1 ,text2, color = 'white', color2 = 'text-black'}) {
  return (
    <div className='inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]'>
        <p className={color}>{text1} <span className={color2}>{text2}</span></p>
      
    </div>
  )
}

export default Title
