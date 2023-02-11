import axios from "axios";
import { responseInterceptor } from "./interceptors/ResponseInterceptor";
import { errorInterceptor } from "./interceptors/ErrorInterceptor";

const Api = axios.create({
   baseURL: "https://dummyjson.com",
   headers: { "Content-Type": "application/json" },
});

Api.interceptors.response.use(
   (response) => responseInterceptor(response),
   (error) => errorInterceptor(error)
);

export { Api };
