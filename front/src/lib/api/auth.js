import axios from 'axios';

// email 중복 확인
export const email = ({User_Email}) =>
    axios.get('', {User_Email});

// 회원가입
export const register = ({User_Email, User_Password, User_Name, User_Tel}) =>
    axios.post('', {User_Email, User_Password, User_Name, User_Tel});

// 로그인
export const login = ({User_Email, User_Password}) =>
    axios.get('', {User_Email, User_Password});