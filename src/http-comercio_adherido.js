import axios from "axios";

export default axios.create({
  baseURL: "https://app-comercio-adherido.herokuapp.com/v1",
  headers: {
    "Content-type": "application/json"
  }
});