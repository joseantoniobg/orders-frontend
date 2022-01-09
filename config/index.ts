import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/";

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/";

// export const requestApi = async (config: AxiosRequestConfig): Promise<any> => {
//   const api = axios.create({
//     baseURL: API_URL,
//   });

//   const resp = await api.request(config).catch((e) => {
//     return Promise.reject(e);
//   });

//   return resp;
// };

export const api = axios.create({
  baseURL: API_URL,
});

export const nextApi = axios.create({
  baseURL: NEXT_URL,
});
