import React from "react";

interface FormWrapperProps {
    title: string;
    children: React.ReactNode;
    bgGradient?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
    title,
    children,
    bgGradient = "from-blue-100 to-blue-300",
}) => {
    return (
        <div className={`min-h-screen flex items-center justify-center bg-linear-to-br ${bgGradient}`}>
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default FormWrapper;
