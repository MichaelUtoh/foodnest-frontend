import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { getGreeting } from '../dashboard/helpers';
import { FaSackDollar } from 'react-icons/fa6';
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import axios from 'axios'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';

const DashboardProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/api/v1/products`);
                setProducts(response.data)
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
                <div className='bg-red-100 flex flex-wrap w-2/12'>
                    Hello


                </div>

                <div className='bg-blue-100 flex h-[500px] w-10/12'>
                    {/* {products.map((product) => (
                        <div key={product}>
                            {product}
                        </div>
                    ))} */}
                    Hello
                </div>
            </div>

        </div>
    )
}

export default DashboardProducts