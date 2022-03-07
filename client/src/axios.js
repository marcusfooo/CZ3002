import axios from "axios";
let development = process.env.NODE_ENV !== "production";

const instance = axios.create({
  baseURL: "http://www.rentsg.software:5000" ,
  // baseURL: development ? "http://localhost:5000" : process.env.PRODUCTION_URL,
});

export default instance;
