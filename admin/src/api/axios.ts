import axios, { AxiosResponse, AxiosError } from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true
});

axiosClient.interceptors.response.use(function (response: AxiosResponse) {
    if (response && response.data) {
        return response.data;
    }
    return response
}, function (error: AxiosError) {
    throw error
});


export default axiosClient;