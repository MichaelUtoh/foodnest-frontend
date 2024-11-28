import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { getGreeting } from './helpers';
import { FaSackDollar } from 'react-icons/fa6';
import SearchBox from '../navigation/Search';
import WelcomeBox from '../navigation/Welcome';

const DashboardMain = () => {
    const stats = [
        { name: "Total Shipments", count: 250, icon: <FaSackDollar />, color: 'text-orange-700' },
        { name: "Total In Progress", count: 75, icon: <FaSackDollar />, color: 'text-red-400' },
        { name: "Total on Transit", count: 25, icon: <FaSackDollar />, color: 'text-teal-300' },
        { name: "Total Delivered", count: 150, icon: <FaSackDollar />, color: 'text-orange-300' },
    ];

    return (
        <div className="border-l border-gray-300 flex flex-col py-4 p-6 w-full">


            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>


            <div className='flex flex-wrap my-2 w-5/12'>

                {/* Statistics */}
                {stats.map((stat) => (
                    <div key={stat.name} className='bg-white border border-gray-100 grid-cols-2 py-6 w-6/12'>
                        <div className='flex justify-center item-center'>
                            <p className={stat.color}>{stat.icon}</p>
                            <p className={`${stat.color} mx-2 text-sm`}>{stat.name}</p>
                        </div>
                        <p>{stat.count}</p>
                    </div>

                ))}

                {/* Graph */}
                <div></div>

            </div>

            <div className='flex h-[500px] mt-3'>

                {/* Shipping */}
                <div className='bg-[#212121] px-6 w-8/12'>
                    <div className='border-b border-gray-500 py-4 text-left w-full'>
                        <p className='text-white'>Weekly Shipping Status</p>
                    </div>

                </div>
                <div className='bg-gray-200 px-6 w-4/12'>
                    <div className='border-b border-gray-400 bg-gray-200 py-4 text-left w-full'>
                        <p className=''>Weekly Shipping Status</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardMain