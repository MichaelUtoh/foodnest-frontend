import React, { useEffect, useState } from 'react'
import { UserType } from '../types/auth';
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import axios from 'axios';
import useSearchStore from '../../../store/searchStore';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';

const UserManagement = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
    const [isChecked, setIsChecked] = useState(false)
    const { searchTerm } = useSearchStore();
    const [error, setError] = useState(false)

    const authToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/auth/users`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                })
                setUsers(response.data.items)
            } catch (err) {
                if (err.response.status === 400) {
                    setError(true);
                }
                console.error("Error fetching users:", err.response.status, err.response.data);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSelectUser = (id: string) => {
        setSelectedUsers(prev =>
            prev.has(id) ? new Set([...prev].filter(userId => userId !== id)) : new Set(prev).add(id)
        );
    };

    const handleDeleteUser = (id: string) => {
        // Add delete logic here
        console.log(`Delete user with ID: ${id}`);
    };

    const handleEditUser = (id: string) => {
        // Add edit logic here
        console.log(`Edit user with ID: ${id}`);
    };

    const handleSelectAll = () => {
        console.log('Archive users:', Array.from(selectedUsers));
        // Add archive logic here
    };

    return (
        <>
            {error ?
                <div className='bg-white flex items-center justify-center p-6 w-full'>
                    <p>This page is not available, Kindly contact admin</p>
                </div> :
                <div className="bg-white p-6 w-full">
                    <div className="border-b border-gray-400 flex justify-start mb-4 pb-4">
                        <div className="flex space-x-4 w-1/12">
                            <p></p>
                        </div>
                        <div className="flex space-x-4 w-3/12">
                            <p>Full Name</p>
                        </div>
                        <div className="flex space-x-4 w-2/12">
                            <p>Email</p>
                        </div>
                        <div className="flex space-x-4">
                            <p>Phone</p>
                        </div>
                        <div className="flex space-x-4">
                            <p>Role</p>
                        </div>
                    </div>

                    <div className="flex flex-col overflow-scroll space-y-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex justify-between items-center p-4 border-b hover:shadow-md"
                            >

                                {/* Checkbox */}
                                <div className='w-1/12'>
                                    <input
                                        className='cursor-pointer h-[20px] w-[20px]'
                                        type="checkbox"
                                        checked={selectedUsers.has(user.id)}
                                        onChange={() => handleSelectUser(user.id)}
                                    />
                                </div>

                                {/* Details */}
                                <div className='flex flex-grow items-center'>
                                    <div className='flex flex-col text-left w-5/12'>
                                        <p className="font-thin text-lg">
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>

                                    <div className='flex flex-col text-left w-4/12'>
                                        <p className="text-lg text-gray-500">{user.email}</p>
                                    </div>

                                    <div className='w-4/12'>
                                        <p className="text-lg text-gray-500">{user.phone}</p>
                                    </div>

                                    <div className='w-4/12'>
                                        <p className="text-lg text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <button className='border border-gray-400 hover:bg-[#5A6C57] hover:border-[#5A6C57] hover:text-white p-2 px-4' onClick={() => handleEditUser(user.id)}>
                                        <BsPencil />
                                    </button>
                                    <button className='border border-gray-400 hover:bg-red-500 hover:border-red-300 hover:text-white p-2 px-4' onClick={() => handleDeleteUser(user.id)}>
                                        <RiDeleteBin3Line />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default UserManagement;