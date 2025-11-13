import React from 'react';
import { Link } from "react-router-dom";

interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: "blue" | "green" | "purple";
    to?: string;
    text?: string;
}


const ButtonLink: React.FC<LinkProps> = ({label, variant, to, text}) => {
    return (
        <p className="text-center mt-4 text-sm text-gray-600">
            {label}{" "}
            <Link to={to} className={`text-${variant}-600 hover:underline`}>
                {text}
            </Link>
        </p>
    );
};

export default ButtonLink;