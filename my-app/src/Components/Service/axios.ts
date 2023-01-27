import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5170/api/';

axios.interceptors.request.use((config) => {
    if(!config.headers['Authorization'] && localStorage.getItem("token")) {
        config.headers = {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401) {
        const response = await axios.post('account/refresh-token', localStorage.getItem("refreshToken"));

        if (response.status === 200) {
            axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            return axios(error.config);
        }
        else if(response.status === 401) {
            const renewResponse = await axios.post('account/renew-token', localStorage.getItem("refreshToken"));

            if (renewResponse.status === 200) {
                axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
    
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refreshToken", response.data.refreshToken);
    
                return axios(error.config);
            }
        }
    }
    return error;
});