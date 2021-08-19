import axios from "axios";

export const BASE_URL_USUARIO = "/usuario/";
export const BASE_URL_TIPO_USUARIO = "/tipo-usuario/";

export default axios.create({
  baseURL: "http://localhost:3002/v1",
  headers: {
    "Content-type": "application/json"
  }
});