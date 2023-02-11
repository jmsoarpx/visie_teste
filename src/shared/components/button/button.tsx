import React, { ButtonHTMLAttributes } from "react";
import "./_button.scss";

interface IBotaoProps extends ButtonHTMLAttributes<any> {
   texto?: any;
}

export const Button: React.FC<IBotaoProps> = ({ className, texto, ...props }) => {
   return (
      <button {...props} className={`btn ${className}`}>
         {texto}
      </button>
   );
};
