import axios from "axios";

const axiosGit = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_BE_URL}`,
  headers: {
    "content-type": "application/json",
  },
  timeout: 10000,
});

export default axiosGit;

