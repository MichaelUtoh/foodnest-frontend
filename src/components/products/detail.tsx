import React, { useEffect, useState } from 'react'
import WelcomeBox from '../navigation/Welcome'
import SearchBox from '../navigation/Search'
import NavBar from '../navigation/NavBar'
import Sidebar from '../dashboard/sidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config'
import { getStatusClass } from '../dashboard/helpers'
import { FaHeart } from 'react-icons/fa'

const SingleProduct = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any | null>(null);
    const [favoriteProduct, setFavoriteProduct] = useState(false)
    const [itemToCartQuantity, setItemToCartQuantity] = useState(0)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleCartQuantity = (type: string) => {
        if (type === 'decrement' && itemToCartQuantity > 0) {
            setItemToCartQuantity(itemToCartQuantity - 1)
        }
        if (type == 'increment') {
            setItemToCartQuantity(itemToCartQuantity + 1)
        }
    }

    useEffect(() => {
        if (product?.images?.[0]?.url) {
            setSelectedImage(product.images[0].url);
        }
    }, [product]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavBar />
            <div className="flex h-[92vh]">

                <div className='bg-white flex mx-auto w-10/12'>
                    <div className='mt-10 w-6/12'>
                        {/* Default Image */}
                        <div className='flex justify-center h-[400px] m-2' id='custom-img-wrap'>
                            {
                                selectedImage ?
                                    <img
                                        src={selectedImage}
                                        alt={product?.images?.[0].alt_text}
                                        className="custom-product-image"
                                        id='custom-img'
                                    /> : <img src="/src/assets/icons/foodbasket.svg" alt="Product Icon" className="w-40" />
                            }
                        </div>

                        <div className='border-t border-stone-200 flex h-20 justify-center overflow-scroll w-full'>
                            {product?.images?.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    alt={image.alt_text}
                                    className="mx-1 object-contain"
                                    onClick={() => setSelectedImage(image.url)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='w-6/12'>
                        <div className='flex flex-col items-start mt-10 p-4'>
                            <div className='border-b border-stone-200 py-4 text-left w-full'>
                                <p className='font-thin text-2xl'>{product.name}</p>
                                <p className='mt-2'>₦{product.price_per_unit}</p>
                            </div>

                            <div className='py-4 text-left w-full'>
                                <p className='font-[300] py-4 text-left text-stone-500'>{product.description}</p>

                                <div className={`${getStatusClass(product.status)} border flex justify-center mb-2 mt-6 p-2 sm:p-1 text-xs w-2/12`}>
                                    <p>{product.status}</p>
                                </div>

                                <div className='flex justify-between w-full'>
                                    {/* <button>Add to Cart</button> */}
                                    <button className="border border-stone-600 flex items-center justify-center mt-5 p-3 text-white w-1/12" onClick={() => setFavoriteProduct(!favoriteProduct)}>
                                        <FaHeart className={`${favoriteProduct ? 'text-red-600' : 'text-stone-400'} w-[32px]`} />
                                    </button>

                                    <div className='flex mx-4 w-full'>
                                        <button className="border border-stone-500 mt-5 py-2 w-1/12" onClick={() => handleCartQuantity('decrement')}>-</button>
                                        <button className="bg-stone-200 mx-1 mt-5 p-3 text-stone-900 w-3/12">{itemToCartQuantity}</button>
                                        <button className="border border-stone-500 mt-5 p-3 w-1/12" onClick={() => handleCartQuantity('increment')}>+</button>
                                    </div>
                                </div>
                                <button className="bg-[#212121] hover:bg-[#212121] mt-5 p-3 text-white w-6/12">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default SingleProduct;