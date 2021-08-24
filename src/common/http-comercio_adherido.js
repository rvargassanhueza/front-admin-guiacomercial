import axios from "axios";

export const baseUrl='/comercioAdherido/';
export const baseUrlLocalidad='/mainData/localidad/';
export const baseUrlCliente='/mainData/cliente/';
export const baseUrlCategoria='/mainData/categoria/';

export default axios.create({
  baseURL: "http://localhost:3001/v1",
  headers: {
    "Content-type": "application/json"
  }
});