import React from "react";

interface IBotaoProps {
   texto?: string;
   className?: string;
}

export const Button: React.FC<IBotaoProps> = ({ texto, className }) => {
   return <button className={`btn ${className}`}>{texto}</button>;
};
