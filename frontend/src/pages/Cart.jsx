import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData); 

  }, [cartItem]);
  return (
    <div className='w-[100vw] min-h-[100vh] p-[10px] md:p-[20px] overflow-hidden bg-white '>
      <div className='h-[8%] w-[100%] text-center mt-[60px] md:mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} color='text-black' color2='text-gray-600' />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[10px] md:gap-[20px]'>
        {
         cartData.map((item,index)=>{
             const productData = products.find((product) => product._id === item._id);
            
             if (!productData) {
                 return null; // Skip rendering if product not found
             }
            
             return (
              <div key={index} className='w-[100%] min-h-[120px] md:h-[10%] border-t border-b  '>
                <div className='w-[100%] h-[100%] flex flex-col md:flex-row items-start gap-4 md:gap-6 bg-gray-100  py-[10px] px-[10px] md:px-[20px] rounded-2xl relative '>
                    <img className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-md ' src={productData.image1} alt="" />
                    <div className='flex flex-col md:flex-row items-start justify-between w-full gap-[10px]'>
                    <p className='text-[16px] md:text-[20px] lg:text-[25px] text-black'>{productData.name}</p>
                    <div className='flex items-center   gap-[20px]'>
                      <p className='text-[16px] md:text-[18px] lg:text-[20px] text-black'>{currency} {productData.price}</p>
                      <p className='w-[35px] h-[35px] md:w-[40px] md:h-[40px] text-[14px] md:text-[16px] text-black 
                      bg-white rounded-md mt-[5px] flex items-center justify-center border-[1px] border-gray-300'>{item.size}</p>
                </div>
                </div>
                <input type="number" min={1} defaultValue={item.quantity} className='w-[60px] md:max-w-20 max-w-10 md:px-2 md:py-2 py-[2px] px-[5px] text-black text-[14px] md:text-[18px] font-semibold bg-white absolute md:top-[40%] top-[70%] left-[60%] md:left-[50%] border-[1px] border-gray-300 rounded-md '  onChange={(e)=> (e.target.value === ' ' || e.target.value === '0') ? null  :  updateQuantity(item._id,item.size,Number(e.target.value))} />

                <RiDeleteBin6Line  className='text-black w-[20px] h-[20px] md:w-[25px] md:h-[25px] absolute top-[75%] md:top-[40%] right-[5%] cursor-pointer' onClick={()=>updateQuantity(item._id,item.size,0)}/>
                </div>
 
              </div>
             )
         })
        }
      </div>

      <div className='flex justify-start items-end mb-[80px] my-10 md:my-20'>
        <div className='w-full sm:w-[450px] px-[10px] md:px-0'>
            <CartTotal/>
            <button className='w-full text-[14px] md:text-[18px] hover:bg-gray-300 cursor-pointer bg-gray-200 py-[8px] md:py-[10px] px-[20px] md:px-[50px] rounded-2xl text-black flex items-center justify-center gap-[10px] md:gap-[20px] border-[1px] border-gray-400 ml-0 md:ml-[30px] mt-[20px]' onClick={()=>{
                if (cartData.length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty!");
    }
            }}>
                PROCEED TO CHECKOUT
            </button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
