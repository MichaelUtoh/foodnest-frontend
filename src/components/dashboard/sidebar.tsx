import React, { useState } from 'react'
import { RiHomeLine, RiHome6Fill } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { RiListView } from "react-icons/ri";
import { BsCartDashFill, BsCartDash } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';


const Sidebar = () => {
    const clearUserDetails = useUserStore((state) => state.clearUserDetails);
    const navigate = useNavigate();
    const location = useLocation();
    let locc = location.pathname.split('/')[1];

    const menuItems = [
        {
            name: "dashboard",
            activeIcon: <RiHome6Fill />,
            inactiveIcon: <RiHomeLine />,
        },
        {
            name: "products",
            activeIcon: <BsCartDashFill />,
            inactiveIcon: <BsCartDash />,
        },
        {
            name: "inventory",
            activeIcon: <RiListView />,
            inactiveIcon: <RiListView />,
        },
        {
            name: "settings",
            activeIcon: <IoSettingsSharp />,
            inactiveIcon: <IoSettingsOutline />,
        },
    ];

    // const [activeItem, setActiveItem] = useState<string>("dashboard");

    const handleItemClick = (name: string) => { navigate(`/${name}`) };

    const handleLogout = () => {
        clearUserDetails()
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        navigate('/login')
    }

    return (
        <div className='beast flex flex-col items-center justify-between pt-2 p-2 w-[80px]'>
            <div>
                {menuItems.map((item) => (
                    <div key={item.name} onClick={() => handleItemClick(item.name)}>
                        <div
                            className={locc === item.name ? 'bg-[#D3F1DF] border-b-2 border-[#5A6C57] my-3 p-4 text-[24px] text-[#525B44]' : 'bg-white border-b-2 border-gray-300 my-3 p-4 text-[24px]'}
                        >
                            {locc === item.name ? item.activeIcon : item.inactiveIcon}
                        </div>
                    </div>
                ))}
            </div>

            {/* LOGOUT */}
            <div className='cursor-pointer mb-4'>
                <TbLogout2 onClick={() => handleLogout()} className='text-[24px]' />
            </div>

        </div >
    )
}

export default Sidebar