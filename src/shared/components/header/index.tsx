import React from "react";
import "./_header.scss";
import { SiTypescript } from "react-icons/si";

export const Header: React.FC = () => {
   return (
      <header className="header">
         <h2>Teste React com Typescript</h2>
         <SiTypescript size={30} color="white" />
      </header>
   );
};
