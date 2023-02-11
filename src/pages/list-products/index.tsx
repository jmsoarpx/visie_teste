import React, { useEffect, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { Card } from "../../shared/components/card";
import { Pagination } from "../../shared/components/pagination";
import { Toast } from "../../shared/components/toast";
import { ProdutosServices, IProdutos } from "../../shared/services/api";
import "./_list-products.scss";
import { Button } from "./../../shared/components/button/button";

import "sweetalert2/src/sweetalert2.scss";

const ListProducts: React.FC = () => {
   const [page, setPage] = useState<number>(10);
   const [pagesCount, setPagesCount] = useState(0);
   const [limit, setLimit] = useState<number>(10);
   const [rows, setRows] = useState<IProdutos[]>([]);
   const [currentPage, setCurrentPage] = useState(0);
   const navigate = useNavigate();

   useEffect(() => {
      ProdutosServices.getAll(page, limit).then((result) => {
         if (result instanceof Error) {
            toast.error(result.message, {
               position: "top-right",
               closeOnClick: true,
               pauseOnHover: true,
            });
            return;
         } else {
            const pagesQtd = Math.max(Math.ceil(result.total / limit) - 1);
            setPagesCount(pagesQtd);
            setRows(result.products);
         }
      });
   }, [currentPage]);

   const getProductData = ({ selected }) => {
      setPage((selected + 1) * 10);
      setCurrentPage(selected + 1);
   };

   const handleDeleteProduct = (id: number) => {
      Swal.fire({
         text: "Tem certeza que deseja excluir o produto?",
         title: "Exclusão de produto",
         icon: "question",
         iconColor: "red",
         timer: 10000,
         timerProgressBar: true,
         showDenyButton: true,
         denyButtonColor: "green",
         confirmButtonColor: "red",
         denyButtonText: "Não",
         confirmButtonText: "Sim",
         showCloseButton: true,
         preConfirm: () => {
            ProdutosServices.deleteByID(id).then((result) => {
               if (result instanceof Error) {
                  !Swal.isLoading();
                  toast.error(result.message, {
                     position: "top-right",
                     closeOnClick: true,
                     pauseOnHover: true,
                  });
                  return;
               } else {
                  Swal.fire({
                     title: "Produtor deletado",
                     icon: "success",
                  });
               }
            });
         },
      });
   };

   return (
      <>
         <Toast />
         <div className="table">
            <Button texto="Adicionar Novo Item" onClick={() => navigate("/adicionar-produto/adiconar")} />
            {rows.map((row) => (
               <Card
                  key={row.title}
                  categoria={row.category}
                  img={row.thumbnail}
                  name={row.title}
                  descricao={row.description}
                  valor={row.price}
                  onClickView={() => navigate(`/visualizar-produtos/${row.id}/visualizar`)}
                  onClickEdit={() => navigate(`/visualizar-produtos/${row.id}/editar`)}
                  onClickDelete={() => handleDeleteProduct(row.id as number)}
               />
            ))}
         </div>
         <Pagination initialPage={currentPage} pageCount={pagesCount} onChange={getProductData} />
      </>
   );
};

export default memo(ListProducts);
