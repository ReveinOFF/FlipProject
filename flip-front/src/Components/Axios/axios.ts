import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers["Authorization"] && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      if (
        !localStorage.getItem("refreshToken") ||
        !localStorage.getItem("token")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.reload();
      }

      const response = await axios.post(
        "account/refresh-token",
        localStorage.getItem("refreshToken"),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        window.location.reload();

        return axios(error.config);
      } else if (response.status === 400) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.reload();

        return axios(error.config);
      }
    }
    return error;
  }
);
