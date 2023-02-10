import React from "react";
import { Button } from "../button/button";
import { AiFillEye } from "react-icons/ai";
import { CiEdit, CiTrash } from "react-icons/ci";
import "./_card.scss";

interface ICardProps {
   img?: string;
   descricao?: string;
   categoria?: string;
   valor?: string;
   onClick?: () => void;
}

export const Card: React.FC<ICardProps> = ({ img, descricao, categoria, valor = 0 }) => {
   return (
      <div className="card">
         <img src={img} alt="" className="card__img" />
         <div className="card__description">
            <div className="cart__title">figma UX</div>
            <p>{descricao}</p>
         </div>
         <span className="card__category">{categoria}</span>
         <span className="card__price">{valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
         <div className="card__actions">
            <Button texto={<AiFillEye size={20} />} className="primary" />
            <Button texto={<CiEdit size={20} />} className="secondary" />
            <Button texto={<CiTrash size={20} />} className="info" />
         </div>
      </div>
   );
};
