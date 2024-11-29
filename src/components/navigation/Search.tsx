import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const SearchBox = () => {
    return (
        <div className="bg-white flex h-[50px] items-center w-4/12">
            <div className="cursor-pointer p-2">
                <IoSearchOutline size={26} className="" />
            </div>
            <input type="text" placeholder="Search here" className="outline-none m-1 p-2 w-full" />
        </div>
    )
}

export default SearchBox