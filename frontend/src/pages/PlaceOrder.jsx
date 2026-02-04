import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
    let [method,setMethod] = useState('cod')
    let navigate = useNavigate()
    const {cartItem , setCartItem , getCartAmount , delivery_fee , products } = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)
    let [loading ,setLoading] = useState(false)

    let [formData,setFormData] = useState({
        firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:''
    })

    const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}))
    }

    const initPay = (order) =>{
        const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
    const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
    if(data.success || data.message){
        navigate("/order")
        setCartItem({})
        toast.success("Payment Successful")
    } else {
        toast.error("Payment Verification Failed")
    }
      }}
    const rzp = new window.Razorpay(options)
    rzp.open()
   }

    
     const onSubmitHandler = async (e) => {
        
    setLoading(true)
        e.preventDefault()
    try {
      let orderItems = []
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
               itemInfo.size = item
               itemInfo.quantity = cartItem[items][item]
               orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
      switch(method){
        case 'cod': 
      
        const result = await axios.post(serverUrl + "/api/order/placeorder" , orderData , {withCredentials:true})
        console.log(result.data)
        if(result.data.success || result.data.message){
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)

        }else{
            console.log(result.data.message)
            toast.error("Order Placed Error")
             setLoading(false)
        }

        break;

        case 'razorpay':
        try {
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay" , orderData , {withCredentials:true})
          if(resultRazorpay.data){
            initPay(resultRazorpay.data)
          } else {
            toast.error("Razorpay initialization failed")
            setLoading(false)
          }
        } catch (error) {
          console.log("Razorpay error:", error)
          toast.error(error.response?.data?.message || "Razorpay initialization failed")
          setLoading(false)
        }

        break;




        default:
        break;

      }
    
      
    } catch (error) {
      console.log("Place order error:", error)
      toast.error(error.response?.data?.message || "Order placement failed")
      setLoading(false)
    }
     }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-white flex items-center justify-center flex-col md:flex-row gap-[20px] md:gap-[50px] p-[10px] md:p-[20px] mb-[50px] relative'>
        <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center  lg:mt-[0px] mt-[60px] md:mt-[80px] '>
            <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] flex flex-col'>
        <div className='py-[10px]'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} color='text-black' color2='text-gray-600'/>
        </div>
        <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>

         <input type="text" placeholder='First name' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-gray-100 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] shadow-sm shadow-gray-300 border border-gray-300'required  onChange={onChangeHandler} name='firstName' value={formData.firstName}/>

          <input type="text" placeholder='Last name' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md shadow-sm shadow-gray-300 bg-gray-100 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
        </div>

        <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>
          <input type="email" placeholder='Email address' className='w-[100%] h-[40px] md:h-[40px] md:h-[50px] rounded-md shadow-sm shadow-gray-300 bg-gray-100 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300'required onChange={onChangeHandler} name='email' value={formData.email} />
         
        </div>
        <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>
          <input type="text" placeholder='Street' className='w-[100%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-gray-100 shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='street' value={formData.street} />
         
        </div>
        <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>
          <input type="text" placeholder='City' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-white shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='city' value={formData.city} />
          <input type="text" placeholder='State' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-white shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='state' value={formData.state} />
        </div>
        <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>
          <input type="text" placeholder='Pincode' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-white shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
          <input type="text" placeholder='Country' className='w-[48%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-white shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='country' value={formData.country} />
        </div>
         <div className='w-[100%] h-[60px] md:h-[70px] flex items-center justify-between px-[5px] md:px-[10px]'>

          <input type="text" placeholder='Phone' className='w-[100%] h-[40px] md:h-[40px] md:h-[50px] rounded-md bg-white shadow-sm shadow-gray-300 placeholder:text-gray-500 text-black text-[14px] md:text-[14px] md:text-[18px] px-[10px] md:px-[10px] md:px-[20px] border border-gray-300' required onChange={onChangeHandler} name='phone' value={formData.phone} />
         
        </div>
        <div className='mt-[30px] md:mt-[30px] mb-[20px] md:mb-0 flex justify-center md:justify-center'>
          <button type='submit' className='w-full md:w-auto text-[16px] md:text-[18px] active:bg-gray-600 cursor-pointer bg-blue-500 py-[12px] px-[20px] rounded-2xl text-white flex items-center justify-center gap-[10px] border-[1px] border-blue-600 hover:bg-blue-600 transition-colors' >{loading? <Loading/> : "PLACE ORDER"}</button>
         </div> 


            </form>

       
        </div>
         <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[20px] md:gap-[30px] '>
            <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%]  flex items-center justify-center gap-[10px] flex-col'>
                <CartTotal/>
                <div className='py-[10px]'>
        <Title text1={'PAYMENT'} text2={'METHOD'} color='text-black' color2='text-gray-600'/>
        </div>
        <div className='w-[100%] h-[25vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[20px] md:gap-[50px] flex-col md:flex-row'>
        <button onClick={()=>setMethod('razorpay')} className={`w-[120px] md:w-[150px] h-[40px] md:h-[40px] md:h-[50px] rounded-sm  ${method === 'razorpay' ? 'border-[3px] md:border-[5px] border-blue-900 rounded-sm' : ''}`}> <img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm ' alt="" /></button>
        <button onClick={()=>setMethod('cod')} className={`w-[160px] md:w-[200px] h-[40px] md:h-[40px] md:h-[50px] bg-gray-200 text-[12px] md:text-[14px] px-[15px] md:px-[10px] md:px-[20px] rounded-sm text-black font-bold border border-gray-400 ${method === 'cod' ? 'border-[2px] md:border-[3px] border-blue-600 rounded-sm' : ''}`}>CASH ON DELIVERY </button>
        </div>
            </div>
        </div>
      
    </div>
  )
}

export default PlaceOrder
