import React, { useState } from "react";
import { REACT_APP_BACKEND_API_BASE_URL } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const roles = ['Buyer', 'Seller', 'Transporter']
    const inputForm = ['First Name', 'Last Name', 'Phone', 'Email', 'Password']
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>('Buyer');
    const [formValues, setFormValues] = useState<{ [key: string]: string | undefined }>({});
    const roles_data = { Buyer: "retailer", Seller: "wholesaler", Transporter: "dispatch" }

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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!selectedRole) {
            throw new Error('Please select a role')
        }

        const payload = {
            email: formValues['Email'],
            password: formValues['Password'],
            first_name: formValues['First Name'],
            middle_name: '',
            last_name: formValues['Last Name'],
            address: '',
            phone: formValues['Phone'],
            is_active: true,
            is_admin: false,
            role: roles_data[selectedRole],
        };

        try {
            const response = await axios.post(
                `${REACT_APP_BACKEND_API_BASE_URL}/auth/users/register`,
                payload, { headers: { 'Content-Type': 'application/json' } }
            );
            const { id, access_token, refresh_token, email } = response.data;
            localStorage.setItem("id", id);
            localStorage.setItem("token", access_token);
            localStorage.setItem("user_id", id);
            toast.success("Login Successful!");
            setFormValues({});
            navigate("/dashboard");
        } catch (err: any) {
            if (err.response?.data) {
                console.error("Validation Errors:", err.response.data);
                toast.error(err.response.data.message || "Validation Failed.");
            } else {
                console.error("Unknown Error:", err);
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-4/12">
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
                        className={`border-b-2 flex justify-center p-1 my-3 cursor-pointer ${selectedRole === role ? "border-stone-700" : "border-stone-200"
                            }`}
                    >
                        <button
                            className={`p-5 py-3 ${selectedRole === role ? "text-stone-700" : "text-stone-400"
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
                    <button className="bg-[#525B44] hover:bg-[#5A6C57] mt-5 p-3 text-white w-full">Submit</button>
                </div>

            </form>
        </div>
    );
};

export default RegisterForm;
