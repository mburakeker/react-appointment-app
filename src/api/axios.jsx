import {SessionStorageService} from "../services/sessionStorage";
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");


var apiUrl = (process.env.NODE_ENV !== 'production')?"http://localhost:6666/":"https://localhost:5000/";

const sessionStorageService = SessionStorageService.getService();

export const axiosInstance = axios.create({baseURL: apiUrl, headers: {'Accept':'application/json'} });


axiosInstance.interceptors.request.use(
    config => {
        const token = sessionStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        console.log(JSON.stringify(error));
        Promise.reject(error);
    });
    
axiosInstance.interceptors.response.use((response) => {
    console.log(response);
    if( response.data !=null && response.data.token!=null){
        sessionStorageService.setAccessToken(response.data.token);
    }
    return response;
    }, function (error) {
        return Promise.reject(error);
    });


if(process.env.NODE_ENV !== 'production' || process.env.REACT_APP_CUSTOM_NODE_ENV === true){
    var mock = new MockAdapter(axiosInstance);
    mock.onPost("/login", { username: 'john', password: 'doe' }).reply(200, {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    });
}