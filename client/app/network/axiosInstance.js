import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://172.30.135.18:5000/",
    timeout: 5000,
});