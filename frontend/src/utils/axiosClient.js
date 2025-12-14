import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://mediease-ai-prescription-records-app.onrender.com/",
  withCredentials: true, // send & receive cookies
});

export default axiosClient;
