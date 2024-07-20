import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`p-2 mx-4 border-2 border-blue-500 ${className}`}
  >
    {children}
  </button>
);

export default ButtonComponent;
