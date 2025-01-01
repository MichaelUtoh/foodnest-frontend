import React from 'react'
import SearchBox from './Search'
import PersonalizeBox from './Personal'

const NavBar = () => {
    return (
        <div className='border-b border-gray-300 flex h-[8vh] items-center justify-between px-4'>
            <div className='flex items-center w-1/12'>
                <p className='text-stone-600'>FoodNest</p>
            </div>

            <div className='flex items-center justify-end  w-full'>
                <SearchBox />
                <PersonalizeBox />
            </div>
        </div>
    )
}

export default NavBar