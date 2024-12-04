import React, { useState } from 'react'
import { RiHomeLine, RiHome6Fill } from "react-icons/ri";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
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
            name: "settings",
            activeIcon: <IoSettingsSharp />,
            inactiveIcon: <IoSettingsOutline />,
        },
    ];

    const [activeItem, setActiveItem] = useState<string>("dashboard");

    const handleItemClick = (name: string) => { navigate(`/${name}`) };

    const handleLogout = () => {
        clearUserDetails()
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        navigate('/login')
    }

    return (
        <div className='flex flex-col items-center h-[850px] justify-between pt-10 p-2 w-[80px]'>
            <div>
                {menuItems.map((item) => (
                    <div key={item.name} onClick={() => handleItemClick(item.name)}>
                        <div
                            className={locc === item.name ? 'bg-[#D3F1DF] border-b-2 border-[#5A6C57] my-3 p-4 text-[24px] text-[#525B44]' : 'my-3 p-4 text-[24px]'}
                        >
                            {locc === item.name ? item.activeIcon : item.inactiveIcon}
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className='flex-grow'></div> */}

            {/* LOGOUT */}
            <div className='cursor-pointer'>
                <TbLogout2 onClick={() => handleLogout()} className='text-[24px]' />
            </div>

        </div >
    )
}

export default Sidebar