import React, { useState } from "react";
import { ToggleButtonProps } from "../types/button";

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        onToggle(newState);
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
        >
            <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isEnabled ? 'translate-x-6' : ''
                    }`}
            />
        </button>
    );
};

export default ToggleButton;