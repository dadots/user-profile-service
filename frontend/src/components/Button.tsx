import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "success" | "danger";
    size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}) => {
    const variantClasses = {
        primary: "btn btn-primary",
        secondary: "btn btn-neutral",
        success: "btn btn-success",
        danger: "btn btn-error",
    };

    const sizeClasses = {
        sm: "py-2 px-3 text-sm",
        md: "py-3 px-4 text-base",
        lg: "py-4 px-6 text-lg",
    };

    return (
        <button
        {...props}
        className={clsx(
            "rounded-lg transition w-full",
            variantClasses[variant],
            sizeClasses[size],
            className
        )}
        >
        {children}
        </button>
    );
};

export default Button;
