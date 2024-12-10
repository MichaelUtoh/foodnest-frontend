import React from 'react'
import SearchBox from './Search'

const NavBar = () => {
    return (
        <div className='border-b border-gray-300 flex h-[8vh] items-center justify-between px-4'>
            <p className='text-stone-600'>FoodNest</p>
            <SearchBox />
        </div>
    )
}

export default NavBar