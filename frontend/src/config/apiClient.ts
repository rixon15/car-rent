import axios from "axios";

axios.defaults.withCredentials = true;

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  Credentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;
    return Promise.reject({ status, ...data });
  }
);

export default API;
