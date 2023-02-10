import React from "react";
import "./_button.scss";

interface IBotaoProps {
   texto?: any;
   className?: string;
}

export const Button: React.FC<IBotaoProps> = ({ texto, className }) => {
   return <button className={`btn ${className}`}>{texto}</button>;
};
