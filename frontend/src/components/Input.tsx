import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: "blue" | "green" | "purple";
}

const Input: React.FC<InputProps> = ({ label, error, className = "", variant = "blue", ...props }) => {
    const ringClasses = error
    ? "input input-error"
    : variant === "green"
    ? "input input-success"
    : variant === "purple"
    ? "input input-secondary"
    : "input input-primary";

    return (
        <div className="flex flex-col space-y-1">
            {label && <label htmlFor={label} className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                {...props}
                id={label}
                className={`w-full p-3 input-md bg-white transition text-gray-700 ${ringClasses} ${className}`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
