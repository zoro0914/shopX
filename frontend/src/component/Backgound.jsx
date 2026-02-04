import React from 'react'
import back1 from "../assets/1.jpg"
import back2 from "../assets/7.jpg"
import back3 from "../assets/3.jpeg"
import back4 from "../assets/6.jpeg"
import back5 from "../assets/5.jpg"

function Backgound({heroCount}) {
  
    if(heroCount === 0){
        return  <img src={back2} alt="" className='w-[100%] h-[80%]  float-left overflow-auto   opacity-100'/>
    }else if(heroCount === 1){
       return  <img src={back1} alt="" className='w-[100%] h-[80%] float-left overflow-auto   opacity-100'/>

    }else if(heroCount === 2){
       return  <img src={back3} alt="" className='w-[100%]  h-[80%] float-left overflow-auto   opacity-100'/>

    }else if(heroCount === 3){
       return  <img src={back4} alt="" className='w-[100%] h-[80%] float-left overflow-auto   opacity-100'/>

    }
    else if(heroCount === 4){
       return  <img src={back5} alt="" className='w-[100%] h-[80%] float-left overflow-auto   opacity-100'/>
    }
    
  
}

export default Backgound
