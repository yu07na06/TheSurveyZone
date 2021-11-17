import axios from 'axios';

// email 중복 확인
export const email = ({user_Email}) =>
    axios.get('/api/vi/usr/checkEmail', {user_Email});

// 회원가입
export const register = ({user_Email, user_Password, user_Name, user_Tel}) =>
    axios.post('/api/vi/usr/createUser', {user_Email, user_Password, user_Name, user_Tel});

// 로그인
export const login = ({user_Email, user_Password}) =>
    axios.post('/api/v1/user/login', {user_Email, user_Password});