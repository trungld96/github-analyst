import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "content-type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;

