import axios from "axios";

const apiFrenet = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

apiFrenet.interceptors.request.use(
  (config) => {
    config.headers["token"] = "B361B7C6R2FD1R4410RBE95RF4F455B8AB96";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiFrenet;
