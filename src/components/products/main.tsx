import React, { useEffect, useState } from 'react'
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import axios from 'axios'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';
import { Product } from '../types/products';
import { getStatusClass, toTitle } from '../dashboard/helpers';
import { ProductCard } from './cards';

const Products = () => {
    const productCategories = ['beans', 'rice', 'yam', 'flour', 'cassava', 'mango', 'orange', 'watermelon', 'locust beans']
    const productStatus = ['available', 'unavailable']
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const handleCheckboxChange = (type: "category" | "status", value: string) => {
        if (type === "category") {
            setSelectedCategories((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
            );
        } else if (type === "status") {
            setSelectedStatuses((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
            );
        }
    };

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
            <div className="custom-header">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='flex mt-4'>

                {/* Filters */}
                <div className='bg-white custom-filter-wrap sm:hidden md:flex flex-wrap mr-2 max-w-2/12 min-w-2/12'>
                    <div className='h-56 flex flex-col w-full'>
                        <div className='border-b border-gray-300 flex items-center justify-between m-2 pb-3'>
                            <p className='text-sm uppercase'>Category</p>
                            {/* <p><IoIosArrowDown className='mx-4' /></p> */}
                        </div>

                        {productCategories.map((cat) => (
                            <div key={cat} className='flex items-center justify-between px-2 py-1'>
                                <div className='flex items-center justify-between'>
                                    <input
                                        type="checkbox"
                                        name="category"
                                        id={`category-${cat}`}
                                        checked={selectedCategories.includes(cat)}
                                        className='cursor-pointer h-[20px] w-[20px]'
                                        onChange={() => handleCheckboxChange("category", cat)}
                                    />
                                    <p className='font-[300] mx-2'>{toTitle(cat)}</p>
                                </div>
                                <p></p>
                            </div>
                        ))}
                    </div>

                    <div className='h-56 flex flex-col w-full'>
                        <div className='border-b border-gray-300 flex items-center justify-between m-2 pb-3'>
                            <p className='text-sm uppercase'>Status</p>
                            {/* <p><IoIosArrowDown className='mx-4' /></p> */}
                        </div>

                        {productStatus.map((stt) => (
                            <div key={stt} className='flex items-center justify-between px-2 py-1'>
                                <div className='flex items-center justify-between'>
                                    <input
                                        type="checkbox"
                                        name="status"
                                        id={`status-${stt}`}
                                        checked={selectedStatuses.includes(stt)}
                                        className='cursor-pointer h-[20px] w-[20px]'
                                        onChange={() => handleCheckboxChange("status", stt)}
                                    />
                                    <p className='font-[300] mx-2'>{toTitle(stt)}</p>
                                </div>
                                <p></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? <div className='custom-card-wrap h-[780px] overflow-scroll w-10/12'>
                    {products.map((product) => (
                        <ProductCard key={product?.id} product={product} getStatusClass={getStatusClass} />
                    ))}
                </div> : <div className='bg-white flex flex-col h-[780px] items-center justify-center w-10/12'>
                    <img src="/src/assets/icons/foodbasket.svg" alt="Product Icon" className="w-40" />
                    <p className='font-[300] text-xl'>No products found</p>
                </div>}
            </div>

        </div>
    )
}

export default Products