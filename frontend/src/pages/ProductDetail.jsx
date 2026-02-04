import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
    let {productId} = useParams()
    let {products,currency ,addtoCart ,loading} = useContext(shopDataContext)
    let [productData,setProductData] = useState(false)

  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')



   const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        console.log(productData)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)

        return null;
      }

    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  return productData ? (
    <div className="min-h-screen bg-white mt-20">
        <div className="w-full px-4 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Images Section */}
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
                        {/* Thumbnail Images */}
                        <div className="flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible">
                            {[image1, image2, image3, image4].map((img, index) => (
                                <div key={index} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-slate-200 border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-lg" onClick={() => setImage(img)} />
                                </div>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 lg:flex-none lg:w-3/4">
                            <div className="aspect-square lg:aspect-auto lg:h-[500px] bg-slate-200 border border-gray-300 rounded-lg overflow-hidden">
                                <img src={image} alt={productData.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="w-full lg:w-1/2 lg:pl-8">
                    <div className="space-y-4 lg:space-y-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{productData.name.toUpperCase()}</h1>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(4)].map((_, i) => (
                                    <FaStar key={i} className="text-lg lg:text-xl fill-yellow-400 text-yellow-400" />
                                ))}
                                <FaStarHalfAlt className="text-lg lg:text-xl fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-sm lg:text-base font-medium text-gray-600">(124)</p>
                        </div>
                        
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{currency} {productData.price}</p>
                        
                        <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                            {productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
                        </p>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Select Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {productData.sizes.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                                                item === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                                            }`}
                                            onClick={() => setSize(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <button
                                className="w-full sm:w-auto px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => addtoCart(productData._id, size)}
                                disabled={!size || loading}
                            >
                                {loading ? <Loading /> : "Add to Cart"}
                            </button>
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="space-y-2 text-sm lg:text-base text-gray-700">
                                <p>100% Original Product.</p>
                                <p>Cash on delivery is available on this product</p>
                                <p>Easy return and exchange policy within 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Description and Reviews Section */}
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button className="px-6 py-3 text-base font-medium text-black border-b-2 border-black bg-gray-50">
                        Description
                    </button>
                    <button className="px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Reviews (124)
                    </button>
                </div>

                {/* Description Content */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 lg:p-8 mb-12">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                        Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
                    </p>
                </div>

                {/* Related Products */}
                <RelatedProduct 
                    category={productData.category} 
                    subCategory={productData.subCategory} 
                    currentProductId={productData._id}
                />
            </div>
        </div>
      
    </div>
  ) :<div className='opacity-0'></div>
}

export default ProductDetail
