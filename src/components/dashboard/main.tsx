import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { getGreeting } from './helpers';

const DashboardMain = ({ userDetails }) => {
    const stats = [
        { name: "Total Shipments", count: 250 },
        { name: "Total In Progress", count: 75 },
        { name: "Total on Transit", count: 25 },
        { name: "Total Delivered", count: 150 },
    ];

    return (
        <div className="flex flex-col py-4 p-6 w-full">


            <div className="flex items-end justify-between">
                <div className="flex flex-col text-left">
                    <h1 className="text-gray-400">{getGreeting()}, </h1>
                    <p className="text-[28px]">{userDetails.first_name} {userDetails.last_name} </p>
                </div>

                <div className="bg-white flex items-center w-4/12">
                    <div className="cursor-pointer p-2">
                        <IoSearchOutline size={26} className="" />
                    </div>
                    <input type="text" placeholder="Search here" className="outline-none m-1 p-2 w-full" />
                </div>
            </div>


            <div className='flex'>

                {/* Statistics */}
                {stats.map((stat) => (
                    <div key={stat.name} className='border border-red-400 grid-cols-2'>
                        <p>{stat.name}</p>
                        <p>{stat.count}</p>
                    </div>

                ))}

                {/* Graph */}
                <div></div>

            </div>
        </div>
    )
}

export default DashboardMain