// components/RegisterForm.tsx
import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { RegisterRequest } from "../types/auth";

const RegisterForm: React.FC = () => {
    const roles = ['Buyer', 'Seller', 'Transporter']
    const inputForm = ['First Name', 'Last Name', 'Phone', 'Email', 'Password']
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<{ [key: string]: string | undefined }>({});

    const handleInputChange = (label: string, value: string) => {
        setFormValues((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    const handleRoleClick = (role: string) => {
        setSelectedRole(role);
        setFormValues((prev) => ({ ...prev, role }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (!selectedRole) {
            throw new Error('Please select a role')
        }
        console.log("Form Submitted with Values:", formValues);
        // Perform further actions like API calls

    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-7/12">
            <div>

                <p className='text-[2rem]'>Create Account</p>
                <p className='my-4 text-gray-600 text-[1rem] text-center'>
                    To manage or showcase your products, connect with
                    buyers & sellers all over the globe, create a Foodnest
                    account to continue
                </p>


            </div>
            <div className="flex mx-auto">

                {roles.map((role) => (
                    <div
                        key={role}
                        className={`border-b-2 flex justify-center p-1 my-3 cursor-pointer ${selectedRole === role ? "border-blue-500" : "border-gray-200"
                            }`}
                    >
                        <button
                            className={`p-5 py-3 ${selectedRole === role ? "text-blue-600" : "text-gray-400"
                                } hover:text-gray-800`}
                            onClick={() => handleRoleClick(role)}
                        >
                            {role}
                        </button>
                    </div>
                ))}

            </div>
            &nbsp;

            <form onSubmit={handleSubmit} className="w-11/12">
                {
                    inputForm.map((label) => (
                        <div key={label}>
                            <div className='flex flex-col mt-5 w-full'>
                                <p className='mb-1 text-left'>{label}</p>
                                <input
                                    className={'border border-gray-400 bg-transparent mr-2 outline-none p-2'}
                                    type={label.toLowerCase() === "password" ? "password" : "text"}
                                    value={formValues[label] || ""}
                                    onChange={(e) => handleInputChange(label, e.target.value)}
                                    placeholder={label}
                                />
                            </div>
                        </div>
                    ))
                }
                <p className="mt-2 text-left text-sm text-gray-600">Forgot password?</p>
                <div>
                    <button className="bg-[#212121] hover:bg-[#212121] mt-5 p-3 text-white w-full">Submit</button>
                </div>

            </form>
        </div>
    );
};

export default RegisterForm;
