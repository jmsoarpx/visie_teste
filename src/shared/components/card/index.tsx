import React from "react";
import "./_card.scss";

export const Card: React.FC = () => {
   const valor = 1500;
   return (
      <div className="card">
         <img
            src="https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80"
            alt=""
            className="card__img"
         />
         <div className="card__description">
            <div className="cart__title">figma UX</div>
            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nam tempore recusandae, odit consequuntur culpa ratione atque numquam
               architecto nesciunt obcaecati nobis aspernatur, repudiandae id velit? Exercitationem odit numquam fuga?
            </p>
         </div>
         <span className="card__category">smartphones</span>
         <span className="card__price">{valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</span>
         <div className="card__actions">
            <button>ver dados</button>
            <button>alterar</button>
            <button>excluir</button>
         </div>
      </div>
   );
};
