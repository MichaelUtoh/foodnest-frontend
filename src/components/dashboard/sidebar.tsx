import React, { useState } from 'react'
import { RiHomeLine, RiHome6Fill } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import { BsCartDashFill, BsCartDash } from "react-icons/bs";


const Sidebar = () => {
    const menuItems = [
        {
            name: "Home",
            activeIcon: <RiHome6Fill />,
            inactiveIcon: <RiHomeLine />,
        },
        {
            name: "Profile",
            activeIcon: <HiUserCircle />,
            inactiveIcon: <HiOutlineUserCircle />,
        },
        {
            name: "Market",
            activeIcon: <BsCartDashFill />,
            inactiveIcon: <BsCartDash />,
        },
        {
            name: "Settings",
            activeIcon: <IoSettingsSharp />,
            inactiveIcon: <IoSettingsOutline />,
        },
    ];

    const [activeItem, setActiveItem] = useState<string>("Home");

    const handleItemClick = (name: string) => {
        setActiveItem(name);
    };

    return (
        <div className='border-r border-gray-300 h-screen flex flex-col items-center pt-10 p-2 w-1/12'>
            {menuItems.map((item) => (
                <div key={item.name} onClick={() => handleItemClick(item.name)}>
                    <div
                        className={activeItem === item.name ? 'bg-white my-3 p-4 rounded-full text-[24px]' : 'my-3 p-4 text-[24px]'}
                    >
                        {activeItem === item.name ? item.activeIcon : item.inactiveIcon}
                    </div>
                </div>
            ))
            }

        </div >
    )
}

export default Sidebar