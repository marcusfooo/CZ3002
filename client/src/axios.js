import axios from "axios";
let development = process.env.NODE_ENV !== "production";

const instance = axios.create({
  baseURL: development ? "http://www.rentsg.software:5000" : process.env.PRODUCTION_URL,
  // baseURL: development ? "http://localhost:5000" : process.env.PRODUCTION_URL,
});

export default instance;
