import axios from "axios";

const api = axios.create({
    baseURL: "http://laravel-api.test/api/v1",
});

export default api;