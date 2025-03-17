import React from "react";

// Simple utility function to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const Button = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        "px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};