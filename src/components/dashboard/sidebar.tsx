import React, { useState } from 'react'
import { RiHomeLine, RiHome6Fill } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import { BsCartDashFill, BsCartDash } from "react-icons/bs";
import useSidebarStore from '../../../store/sidebarStore';
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';


const Sidebar = () => {
    const clearUserDetails = useUserStore((state) => state.clearUserDetails);
    const { selected, setSelected } = useSidebarStore()
    const navigate = useNavigate();
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
        setSelected(name);
    };

    const handleLogout = () => {
        clearUserDetails()
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        navigate('/login')
    }

    return (
        <div className='border-r border-gray-300 flex flex-col items-center justify-between pt-10 p-2 w-1/12'>
            <div>
                {menuItems.map((item) => (
                    <div key={item.name} onClick={() => handleItemClick(item.name)}>
                        <div
                            className={activeItem === item.name ? 'bg-black my-3 p-4 text-[24px] text-white' : 'my-3 p-4 text-[24px]'}
                        >
                            {activeItem === item.name ? item.activeIcon : item.inactiveIcon}
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex-grow'></div>

            {/* LOGOUT */}
            <div className='cursor-pointer'>
                <TbLogout2 onClick={() => handleLogout()} className='text-[24px]' />
            </div>

        </div >
    )
}

export default Sidebar