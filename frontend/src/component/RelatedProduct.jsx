import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId }) {

    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
     if(products.length > 0){

        let productsCopy = products.slice()
        productsCopy = productsCopy.filter((item) => category === item.category)
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
        productsCopy = productsCopy.filter((item) => currentProductId  !== item._id)
        setRelated(productsCopy.slice(0,4))

     }
    },[products,category,subCategory,currentProductId])
  return (
    <div className="my-8 sm:my-12 md:my-16 lg:my-20 px-3 sm:px-4 md:px-6 lg:px-8 mb-20">
        <div className="mb-6 sm:mb-8">
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {
                related.map((item,index)=>(
                    <Card key={index} id={item._id} name={item.name } price={item.price} image={item.image1} />
                ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProduct
