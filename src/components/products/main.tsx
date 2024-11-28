import React, { useEffect, useState } from 'react'
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import axios from 'axios'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';
import { Product } from '../types/products';
import { IoIosArrowDown } from "react-icons/io";
import { getStatusClass, toTitle } from '../dashboard/helpers';

const Products = () => {
    const productCategories = ['beans', 'rice', 'yam', 'flour', 'cassava', 'mango', 'orange', 'watermelon', 'locust beans']
    const productStatus = ['available', 'unavailable']
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/api/v1/products`);
                setProducts(response.data?.items || [])
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <div className="border-l border-gray-300 flex flex-col py-4 p-6 w-full">
            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='flex mt-4'>
                <div className='bg-white flex flex-wrap mr-2 w-2/12'>
                    <div className='h-56 flex flex-col w-full'>
                        <div className='border-b border-gray-300 flex items-center justify-between m-2 pb-3'>
                            <p className='text-sm uppercase'>Category</p>
                            <p><IoIosArrowDown className='mx-4' /></p>
                        </div>

                        {productCategories.map((cat) => (
                            <div className='flex items-center justify-between px-2 py-1'>
                                <div className='flex items-center justify-between'>
                                    <input type="checkbox" name="category" id="category" className='cursor-pointer h-[20px] w-[20px]' />
                                    <p className='font-[300] mx-2'>{toTitle(cat)}</p>
                                </div>
                                <p></p>
                            </div>
                        ))}
                    </div>

                    <div className='h-56 flex flex-col w-full'>
                        <div className='border-b border-gray-300 flex items-center justify-between m-2 pb-3'>
                            <p className='text-sm uppercase'>Status</p>
                            <p><IoIosArrowDown className='mx-4' /></p>
                        </div>

                        {productStatus.map((cat) => (
                            <div className='flex items-center justify-between px-2 py-1'>
                                <div className='flex items-center justify-between'>
                                    <input type="checkbox" name="category" id="category" className='cursor-pointer h-[20px] w-[20px]' />
                                    <p className='font-[300] mx-2'>{toTitle(cat)}</p>
                                </div>
                                <p></p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-2 h-[780px] overflow-scroll w-10/12'>
                    {products.map((product) => (
                        <div className='bg-white cursor-pointer flex flex-col hover:shadow-sm justify-end h-[360px] p-4' key={product.id}>
                            <p className='my-2 text-left text-xl'>{product.name}</p>
                            <div className='flex items-center justify-between'>
                                <p className={`${getStatusClass(product.status)} border p-1 text-xs w-4/12`}>{product.status}</p>
                                <p>₦{product.price_per_unit}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Products