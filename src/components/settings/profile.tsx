import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPen, FaUser } from 'react-icons/fa6';
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types/auth';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null)
    const userId = localStorage.getItem("id");
    const authToken = localStorage.getItem("token");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/auth/users/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error.response.data);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchUserDetails();
    }, [authToken, navigate, userId]);

    return (
        <div className='bg-[#FFF] p-4 w-full'>
            <div className='border-b border-gray-200 pb-4 text-left'>
                <h1 className='text-3xl'>My Profile</h1>
                <p className='text-gray-400 text-sm'>Manage your personal information here.</p>
            </div>

            <div className='flex items-center justify-start mb-2 p-4 py-6 text-left'>
                <div className='border border-gray-200 h-[80px] flex items-center justify-center overflow-hidden w-[90px]'>
                    {user?.image_url ? <img src={user.image_url} alt='' /> : <FaUser size={40} />}
                </div>
                <div className='flex justify-between mx-4 w-full'>
                    <div>
                        <p className=''>{user?.first_name} {user?.last_name}</p>
                        <p className='font-thin text-[#85A98F]'>{user?.email}</p>
                        <p className='text-sm'>{user?.phone}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col p-4 py-6 text-left'>
                <div className='border-b border-gray-300 flex items-center justify-between py-2'>
                    <div>
                        <h1 className='text-2xl'>Personal Information</h1>
                    </div>
                    <div className='mx-2'>
                        <button className='border border-gray-400 hover:bg-[#5A6C57] hover:border-[#5A6C57] hover:text-white p-2 px-4'>
                            <FaPen />
                        </button>
                    </div>
                </div>

                <div>
                    <div className='flex gap-10 mb-2 py-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="First Name" className='font-[500] text-xs text-[#85A98F] uppercase'>First Name</label>
                            <p className='text-[#335] text-lg'>{user?.first_name || '----- -----'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="First Name" className='font-[500] text-xs text-[#85A98F] uppercase'>Last Name</label>
                            <p className='text-[#335] text-lg'>{user?.last_name || '----- -----'}</p>
                        </div>
                    </div>
                    <div className='flex gap-10 mb-2 py-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="Email" className='font-[500] text-xs text-[#85A98F] uppercase'>Email</label>
                            <p className='text-[#335] text-lg'>{user?.email || '----- ----- ---- ----'}</p>
                        </div>
                    </div>
                    <div className='flex gap-[3rem] mb-2 py-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="Phone" className='font-[500] text-xs text-[#85A98F] uppercase'>Phone</label>
                            <p className='text-[#335] text-lg'>{user?.phone || '----- -----'}</p>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="Address" className='font-[500] text-xs text-[#85A98F] uppercase'>Address</label>
                            <p className='text-[#335] text-lg'>{user?.address || '----- -----'}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;