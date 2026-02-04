import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)

    const loadOrderData = async () => {
       try {
      console.log("Loading orders from:", serverUrl + '/api/order/userorder')
      console.log("Cookies available:", document.cookie)
      const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
      console.log("Orders fetched:", result.data)
      console.log("Orders length:", result.data?.length)
      if(result.data && result.data.length > 0){
        let allOrdersItem = []
        result.data.map((order)=>{
          console.log("Processing order:", order)
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        console.log("All orders items:", allOrdersItem)
        setOrderData(allOrdersItem.reverse())
      } else {
        console.log("No orders found")
        setOrderData([])
      }
    } catch (error) {
      console.log("loadOrderData error:", error.response?.data || error.message)
      console.log("Full error:", error)
    }
    }

useEffect(()=>{
 loadOrderData()
},[])


  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px]  overflow-hidden bg-white '>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
      <div className=' w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {
         orderData.map((item,index)=>(
            <div key={index} className='w-[100%] h-[10%] border-t border-b '>
                <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#f8f9fa]  py-[10px] px-[20px] rounded-2xl relative '>
                    <img src={item.image1} alt="" className='w-[130px] h-[130px] rounded-md '/>
                    <div className='flex items-start justify-center flex-col gap-[5px]'>
                    <p className='md:text-[25px] text-[20px] text-[black]'>{item.name}</p>
                    <div className='flex items-center gap-[8px]   md:gap-[20px]'>
                        <p className='md:text-[18px] text-[12px] text-[#666]'>{currency} {item.price}</p>
                      <p className='md:text-[18px] text-[12px] text-[#666]'>Quantity: {item.quantity}</p>
                      <p className='md:text-[18px] text-[12px] text-[#666]'>Size: {item.size}</p>
                    </div>
                    <div className='flex items-center'>
                     <p className='md:text-[18px] text-[12px] text-[#666]'>Date: <span className='text-[black] pl-[10px] md:text-[16px] text-[11px]'>{new Date(item.date).toDateString()}</span></p>
                    </div>
                    <div className='flex items-center'>
                      <p className='md:text-[16px] text-[12px] text-[#666]'>Payment Method :{item.paymentMethod}</p>
                    </div>
                    <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]  '>
                        <div className='flex items-center gap-[5px]'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p> 
                      <p className='md:text-[17px] text-[10px] text-[black]'>{item.status}</p>

                    </div>

                    </div>
                     <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'> 
                    <button className='md:px-[15px] px-[5px] py-[3px] md:py-[7px] rounded-md bg-[#007bff] text-[white] text-[12px] md:text-[16px] cursor-pointer hover:bg-[#0056b3]' onClick={loadOrderData} >Track Order</button>
                  </div>
                    </div>
                </div>
               
            </div>
         ))
        }
      </div>
    </div>
  )
}

export default Order
