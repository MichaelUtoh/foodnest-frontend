import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { getGreeting } from '../dashboard/helpers';
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';

const DashboardProfile = () => {

    return (
        <div className="flex flex-col py-4 p-6 w-full">


            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='flex mt-4'>
                <div className='bg-red-100 flex flex-wrap w-2/12'>
                    Hello Profile


                </div>

                <div className='bg-blue-100 flex h-[500px] w-10/12'>
                    Hello
                </div>
            </div>

        </div>
    )
}

export default DashboardProfile;