import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
    const inputForm = ['Verification Code']
    const [formValues, setFormValues] = useState<{ [key: string]: string | undefined }>({});

    const handleInputChange = (label: string, value: string) => {
        setFormValues((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("Form Submitted with Values:", formValues);
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-7/12">
            <div>
                <p className='text-[2rem]'>Verify Your Account</p>
            </div>
            <hr className="border-t-2 border-red-600 bg-red-400" />
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

                <div className="mt-2">
                    <button className="bg-[#212121] hover:bg-[#212121] mt-5 p-3 text-white w-full">Submit</button>
                </div>

            </form>
        </div>
    );
};

export default ForgotPassword;
