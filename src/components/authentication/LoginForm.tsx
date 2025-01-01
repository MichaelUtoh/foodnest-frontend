import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserStore from "../../../store/userStore";

const LoginForm: React.FC = () => {
    const setUserDetails = useUserStore((state) => state.setUserDetails);
    const inputForm = ['Email', 'Password']
    const [formValues, setFormValues] = useState<{ [key: string]: string | undefined }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (label: string, value: string) => {
        setFormValues((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);

        try {
            const response = await axios.post(`${REACT_APP_BACKEND_API_BASE_URL}/auth/users/login`, {
                email: formValues["Email"],
                password: formValues["Password"],
            }, { headers: { 'Content-Type': 'application/json' } });

            const userData = {
                id: response.data.id,
                first_name: response.data.first_name,
                middle_name: response.data?.middle_name,
                last_name: response.data.last_name,
                email: response.data.email,
                phone: response.data.phone,
                address: response.data.address,
                role: response.data.role,
                image_url: response.data.image_url,
                mfa_enabled: response.data.mfa_enabled,
            };

            const { id, access_token, refresh_token, email } = response.data;
            localStorage.setItem("id", id);
            localStorage.setItem("token", access_token);
            localStorage.setItem("user_id", id);
            setUserDetails(userData);
            toast.success("Login Successful!");
            setFormValues({});
            navigate("/dashboard");

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Invalid credentials";
            toast.error(errorMessage);
            console.error("Error submitting form:", errorMessage);
        } finally {
            setLoading(false);
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="flex overflow-hidden">
                <div className="bg-green-200 bg-cover h-screen w-6/12">
                    <img
                        src="https://images.pexels.com/photos/6152391/pexels-photo-6152391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="grocery@foodnest"
                    />
                </div>

                <div className="flex flex-col items-center justify-center mx-auto h-screen w-4/12">
                    <div>
                        <p className='text-[2rem]'>Login</p>
                    </div>
                    <hr className="border-t-2 border-red-600 bg-red-400" />
                    &nbsp;

                    <form onSubmit={handleSubmit} className="w-11/12">
                        {
                            inputForm.map((label) => (
                                <div className="" key={label}>
                                    <div className='flex flex-col mt-5 w-full'>
                                        <p className='mb-1 text-left text-xs uppercase'>{label}</p>

                                        <div className="border border-gray-400 flex items-center justify-between">

                                            <input
                                                className={label.toLowerCase() === "password" ? ` bg-transparent outline-none p-2 w-10/12` : ` bg-transparent outline-none p-2 w-full`}
                                                type={label.toLowerCase() === "password" && !showPassword ? "password" : "text"}
                                                value={formValues[label] || ""}
                                                onChange={(e) => handleInputChange(label, e.target.value)}
                                                placeholder={label}
                                            />

                                            {label.toLowerCase() === "password" && <p className="mx-4 text-left text-sm text-gray-600" onClick={togglePasswordVisibility}>{showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="flex justify-between w-full">
                            <p className="cursor-pointer hover:text-[#91AC8F] mt-2 text-xs text-gray-600" onClick={() => navigate('/forgot-password')}>Forgot password?</p>
                            <p className="cursor-pointer hover:text-[#4B5945] mt-2 text-xs text-gray-600" onClick={() => navigate('/register')}>Create new Account</p>
                        </div>

                        <div>
                            <button
                                className="bg-[#525B44] hover:bg-[#5A6C57] mt-5 p-3 text-white w-full"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                    </form>

                    <Toaster position="top-right" reverseOrder={false} />
                </div>
            </div>
        </>
    );
};

export default LoginForm;
