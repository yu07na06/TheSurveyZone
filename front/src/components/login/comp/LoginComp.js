import React from 'react';
import { useHistory } from 'react-router-dom';
import { login as loginAPI } from '../../../lib/api/auth';
import ErrorSweet from '../../common/modules/ErrorSweet';
import Login from '../UI/Login';

const LoginComp = () => {
    const history = useHistory();

    const newPassword = (infoPW) => {
        if(infoPW === "TempPW"){
            ErrorSweet('info', null, '일회용 로그인', '임시 비밀번호로 로그인하셨습니다', '비밀번호 변경 페이지로 이동합니다.')
            .then(()=> history.push('/ChangePWPage'));
            return false;
        }
        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const email = data.get("User_Email");
        const password = data.get("User_Password"); 

        loginAPI({user_Email: email, user_Password: password})
            .then(res => {
                localStorage.setItem('user_Name', res.data.user_Name);
                newPassword(res.data.login_Type);}) 
            .then(() => history.push('/') )
            .catch(err => { 
                if(err.response.data.errorCode=="404_1") ErrorSweet('error', null, "실패", "일치하는 회원정보가 없습니다", null);
                if(err.response.data.errorCode=="400_3") ErrorSweet('error', null, "유효한값이 아닙니다", "이메일 형식과 비밀번호를 확인해주세요", null);
            });
    };

    return (
        <>
            <Login
                handleSubmit={handleSubmit}
            />   
        </>
    );
};

export default LoginComp;