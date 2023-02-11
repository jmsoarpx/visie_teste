import { Routes, Route, Navigate } from "react-router-dom";
import ListProducts from "../pages/list-products";
import ViewProduct from "../pages/view-product";

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/lista-produtos" element={<ListProducts />} />
         <Route path="/visualizar-produtos/:id/:opcao" element={<ViewProduct />} />
         <Route path="/adicionar-produto/:opcao" element={<ViewProduct />} />

         <Route path="*" element={<Navigate to="/lista-produtos" />} />
      </Routes>
   );
};
