import { Routes, Route, Navigate } from "react-router-dom";
import { ListProducts } from "../pages/list-products/list-products";

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/lista-produtos" element={<ListProducts />} />

         <Route path="*" element={<Navigate to="/lista-produtos" />} />
      </Routes>
   );
};
