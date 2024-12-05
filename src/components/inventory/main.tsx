import React, { useEffect, useState } from 'react'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';

const InventoryComponent = () => {

    return (
        <div className="border-l border-gray-300 flex flex-col py-4 p-6 w-full">

            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='bg-green-50 flex mt-4'>
                <div className='flex w-full'>
                    <p>Inventory Page</p>
                </div>
            </div>

        </div>
    )
}

export default InventoryComponent;