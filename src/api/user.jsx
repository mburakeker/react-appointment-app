import {axiosInstance} from './axios.jsx'

export async function Login(value){
    return await axiosInstance.post('/login',value);
}