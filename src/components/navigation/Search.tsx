import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom';
import useSearchStore from '../../../store/searchStore';

const SearchBox = () => {
    const { searchTerm, setSearchTerm } = useSearchStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Update global state
    };

    return (
        <div className="bg-white flex h-[50px] items-center w-full md:w-6/12 lg:w-4/12">
            <div className="cursor-pointer p-2">
                <IoSearchOutline size={26} className="" />
            </div>
            <input
                type="text"
                placeholder="Search anything"
                className="outline-none m-1 p-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default SearchBox