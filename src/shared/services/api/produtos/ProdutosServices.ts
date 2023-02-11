import { Api } from "../axios-config";

export interface IProdutos {
   id?: number;
   title: string;
   description: String;
   price: number;
   discountPercentage: number;
   rating: number;
   stock: number;
   brand: string;
   category: string;
   thumbnail: string;
   images: string[];
}

export type TProdutos = {
   products: IProdutos[];
   total: number;
   skip: number;
   limit: number;
};

const getAll = async (skip = 10, limit = 10): Promise<TProdutos | Error> => {
   try {
      const urlRelative = `/products?limit=${limit}&skip=${skip}`;
      const { data } = await Api.get(urlRelative);
      if (data) {
         return data;
      }
      return new Error("Erro ao Retornar os produtos");
   } catch (error) {
      return new Error((error as { message: string }).message || "Erro ao Retornar os produtos");
   }
};

const getByID = async (id: number): Promise<IProdutos | Error> => {
   try {
      const { data } = await Api.get(`/products/${id}`);
      if (data) {
         return data;
      }
      return new Error("Erro ao Retornar produto");
   } catch (error) {
      return new Error((error as { message: string }).message || "Erro ao Retornar produto");
   }
};

const search = async (): Promise<any> => {};

const getLimit = async (): Promise<any> => {};

const getByCategory = async (): Promise<any> => {};

const create = async (newProduct: IProdutos): Promise<IProdutos | Error> => {
   try {
      const { data } = await Api.post("products/add", newProduct);
      if (data) {
         return data;
      }
      return new Error("Erro ao incluir Produto");
   } catch (error) {
      return new Error((error as { message: string }).message || "Erro ao incluir Produto");
   }
};

const updateByID = async (id: number, dataUpdate: IProdutos): Promise<IProdutos | Error> => {
   try {
      const { data } = await Api.put(`/products/${id}`, dataUpdate);
      if (data) {
         return data;
      }
      return new Error("Erro ao atualizar produto");
   } catch (error) {
      return new Error((error as { message: string }).message || "Erro ao atualizar produto");
   }
};

const deleteByID = async (id: number): Promise<IProdutos | Error> => {
   try {
      const { data } = await Api.delete(`/products/${id}`);
      if (data) {
         return data;
      }
      return new Error("Erro ao deletar produto");
   } catch (error) {
      return new Error((error as { message: string }).message || "Erro ao deletar produto");
   }
};

export const ProdutosServices = {
   getAll,
   getByID,
   search,
   getLimit,
   getByCategory,
   create,
   updateByID,
   deleteByID,
};
