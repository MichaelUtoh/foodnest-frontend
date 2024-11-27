import React, { useEffect, useState } from 'react'
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import axios from 'axios'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';
import { Product } from '../types/products';
import { IoIosArrowDown } from "react-icons/io";

const DashboardProducts = () => {
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
        <div className="flex flex-col py-4 p-6 w-full">


            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='flex mt-4'>
                <div className='flex flex-wrap mr-2 w-2/12'>
                    <div className='border border-stone-200 h-56 flex flex-col w-full'>
                        <div className='flex items-center justify-between'>
                            <p>Category</p>
                            <p><IoIosArrowDown className='mx-4' /></p>
                        </div>

                        <div className='flex justify-between py-2'>
                            <input type="checkbox" name="category" id="category" />
                            <p>Yaya Toure</p>
                        </div>

                    </div>
                </div>

                <div className='grid grid-cols-4 gap-2 overflow-scroll w-10/12'>
                    {products.map((product) => (
                        <div className='bg-white cursor-pointer flex flex-col justify-end h-72 p-4' key={product.id}>
                            <p className='my-2 text-left'>{product.name}</p>
                            <div className='flex justify-between'>
                                <p className={`${product.status === 'available' ? `bg-green-50 border-green-300 text-green-700` : `bg-gray-200 border-gray-300 text-stone-600`} border p-1 text-xs w-4/12`}>{product.status}</p>
                                <p>₦{product.price_per_unit}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default DashboardProducts