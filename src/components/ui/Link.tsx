import React from 'react';

interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ 
  active = false, 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`font-medium focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};