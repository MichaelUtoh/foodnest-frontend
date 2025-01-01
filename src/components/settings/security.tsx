import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { UserType } from '../types/auth';
import { COLOR_CODE_2, COLOR_CODE_4, REACT_APP_BACKEND_API_BASE_URL } from '../../../config';
import useUserStore from '../../../store/userStore';

const Security = () => {
    const userDetails = useUserStore((state) => state.userDetails);
    const [user, setUser] = useState<UserType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [setupKey, setSetupKey] = useState<string | null>(null)
    const [otpCode, setOtpCode] = useState<string | null>(null)
    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const handleToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/auth/users/${userId}/`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error.response.data);
            }
        };

        fetchUserDetails();
    }, []);


    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await axios.post(`${REACT_APP_BACKEND_API_BASE_URL}/auth/users/generate_mfa_secret`, {}, {
                    headers: { Authorization: `Bearer ${authToken}` },
                })
                setQrCode(response.data.qr_code)
                setSetupKey(response.data.setup_key)
            } catch (err) {
                console.error("Error fetching QrCode:", err.response.data || err.message);
            }
        };

        fetchQRCode();
    }, []);

    const verifyOTP = async () => {
        try {
            const res = await axios.post(
                `${REACT_APP_BACKEND_API_BASE_URL}/auth/users/configure_mfa`,
                { otp_code: otpCode },
                { headers: { Authorization: `Bearer ${authToken}` } }
            )
            if (res.status === 200) {
                toast.success("2FA has been successfully configured")
                setIsModalOpen(false)
            }

        } catch (err) {
            toast.error(err.message);
            setIsModalOpen(false)
        }
    }


    return (
        <div className='bg-[#FFF] p-4 w-full'>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='border-b border-gray-200 pb-4 text-left'>
                <h1 className='text-3xl text-[#4B5945]'>Security Settings</h1>
                <p className='font-thin text-gray-600 text-sm'>Personalize your security settings.</p>
            </div>

            {userDetails?.mfa_enabled
                ? <div className='my-6'>
                    <div className='border border-b-2 border-gray-50 border-b-[#4B5945] flex h-20 hover:shadow-lg items-end justify-between p-2 text-left w-4/12' onClick={() => handleToggle()}>
                        <div>
                            <p className='font-bold text-xl'>Disable 2FA</p>
                            <p className='font-thin text-gray-600 text-sm'>Disable 2FA protection for your account</p>
                        </div>
                    </div>
                </div>
                : <div className='my-6'>
                    <div className='border border-b-2 border-gray-50 border-b-[#4B5945] flex h-20 hover:shadow-lg items-end justify-between p-2 text-left w-4/12' onClick={() => handleToggle()}>
                        <div>
                            <p className='font-bold text-xl'>Configure 2FA</p>
                            <p className='font-thin text-gray-600 text-sm'>Setup 2FA protection for your account</p>
                        </div>
                    </div>
                </div>
            }


            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white flex flex-col items-center p-6 rounded-lg shadow-lg w-2/6">
                        <h2 className="text-xl font-bold mb-4">Scan the QR Code to Setup Authentication</h2>
                        <div className='flex flex-col items-center m-6'>
                            <img src={qrCode ? qrCode : ""} alt="" className='h-52' />

                            <p className={`text-[${COLOR_CODE_4}]`}>OR</p>
                            <p className={`font-bold mt-2 text-[${COLOR_CODE_4}]`}>Use Setup Key Below to Generate OTP Codes</p>
                            <p>{setupKey}</p>
                        </div>

                        <input
                            onChange={(e) => setOtpCode(e.target.value)}
                            type="text"
                            name="verify"
                            className={`border border-gray-200 outline-[${COLOR_CODE_2}] p-2 w-8/12`}
                            placeholder='Enter Generated OTP'
                        />
                        <button type='submit' className={`bg-[#4B5945] mt-4 p-2 text-[#D3F1DF] w-8/12`} onClick={() => verifyOTP()}>Verify</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Security;