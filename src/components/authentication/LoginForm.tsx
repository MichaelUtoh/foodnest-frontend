import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm: React.FC = () => {
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

            const { id, access_token, refresh_token, email } = response.data;
            localStorage.setItem("id", id);
            localStorage.setItem("token", access_token);
            localStorage.setItem("user_id", id);
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
                                <p className='mb-1 text-left'>{label}</p>

                                <input
                                    className={'border border-gray-400 bg-transparent outline-none p-2'}
                                    type={label.toLowerCase() === "password" && !showPassword ? "password" : "text"}
                                    value={formValues[label] || ""}
                                    onChange={(e) => handleInputChange(label, e.target.value)}
                                    placeholder={label}
                                />
                            </div>
                        </div>
                    ))
                }

                <div className="flex justify-between">
                    <p className="mt-2 text-left text-sm text-gray-600">Forgot password?</p>
                    <p className="mt-2 text-left text-sm text-gray-600" onClick={togglePasswordVisibility}>{showPassword ? <FaEye /> : <FaEyeSlash />}</p>
                </div>

                <div>
                    <button className="bg-[#525B44] hover:bg-[#5A6C57] mt-5 p-3 text-white w-full                                                                                                                                                                                                    " disabled={loading} type="submit">
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

            </form>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default LoginForm;
