import React, { useEffect, useState } from 'react'
import WelcomeBox from '../navigation/Welcome';

const InventoryComponent = () => {

    return (
        <div className="border-l border-gray-300 flex flex-col py-4 p-6 w-full">

            <div className="flex items-end justify-between">
                <WelcomeBox />
            </div>

            <div className='bg-white flex mt-4 h-full'>
                <div className='flex items-center justify-center w-full'>
                    <p>Inventory Page</p>
                </div>
            </div>

        </div>
    )
}

export default InventoryComponent;