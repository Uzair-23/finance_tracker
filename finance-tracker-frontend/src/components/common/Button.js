import React from "react";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
  outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
  danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const Button = ({ children, variant = "primary", size = "md", ...props }) => {
  return (
    <button
      className={`rounded-md shadow-sm focus:outline-none focus:ring-2 ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
