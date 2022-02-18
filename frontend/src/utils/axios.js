import axios from "axios";
import { getData } from "./localStorage";

const axiosConfigurations = () => {
    const token = getData('token');
        axios.create({
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
      
          axios.interceptors.request.use(
            (config) => {
              if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${token}`;
              }
              return config;
            },
            (error) => Promise.reject(error)
          );
}

export default axiosConfigurations;