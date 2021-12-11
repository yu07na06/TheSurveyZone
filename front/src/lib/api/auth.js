import axios from 'axios';

export const email = ({user_Email}) => 
    axios.post(`/api/v1/user/checkEmail`, {user_Email});

export const register = ({user_Email, user_Password, user_Name, user_Tel}) =>
    axios.post(`/api/v1/user/signup`, {user_Email, user_Password, user_Name, user_Tel});
    
export const login = ({user_Email, user_Password}) =>
    axios.post(`/api/v1/user/signin`, {user_Email, user_Password});

export const logout = () =>
    axios.post(`/api/v1/user/signout`);

export const searchID = (searchIDReq) =>
    axios.post(`/api/v1/user/searchID`,searchIDReq);

export const searchPW = (searchPWReq ) =>
    axios.post(`/api/v1/user/searchPW`,searchPWReq );

export const changePW = (chagePWReq) =>
    axios.put(`/api/v1/user/changePW`,chagePWReq);