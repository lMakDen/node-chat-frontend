import axios from "axios";

axios.defaults.baseURL = 'http://localhost:9999/';
// axios.defaults.baseURL = window.location.origin;
// axios.defaults.headers.common["token"] = window.localStorage.token;

window.axios = axios;

export default axios;