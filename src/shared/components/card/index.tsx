import React from "react";
import { Button } from "../button/button";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

import "./_card.scss";

interface ICardProps {
   img?: string;
   name?: string;
   descricao?: String;
   categoria?: string;
   valor?: number;
   onClickView?: () => void;
   onClickEdit?: () => void;
   onClickDelete?: () => void;
}

export const Card: React.FC<ICardProps> = ({ img, descricao, categoria, valor = 0, name, onClickView, onClickDelete, onClickEdit }) => {
   return (
      <div className="card">
         <img src={img} alt="" className="card__img" />
         <div className="cart__name">{name}</div>
         <div className="card__actions">
            <Button className="inherit" onClick={onClickView} texto={<AiFillEye size={20} />} />
            <Button className="info" onClick={onClickEdit} texto={<AiFillEdit size={20} />} />
            <Button className="primary" onClick={onClickDelete} texto={<AiFillDelete size={20} />} />
         </div>
      </div>
   );
};
