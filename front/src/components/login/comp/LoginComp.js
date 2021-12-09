import React from 'react';
import Login from '../UI/Login';
import { login as loginAPI } from '../../../lib/api/auth'; 
import { useHistory } from 'react-router-dom';
import ErrorSweet from '../../common/modules/ErrorSweet';

const LoginComp = () => {
    const history = useHistory();

    // 임시 비밀번호로 로그인한 경우
    const newPassword = (infoPW) => {
        if(infoPW === "TempPW"){
            ErrorSweet('info', null, '일회용 로그인', '임시 비밀번호로 로그인하셨습니다', '비밀번호 변경 페이지로 이동합니다.')
            .then(()=> history.push('/ChangePWPage'));
            return false;
        }
        return true;
    }


    // 로그인 버튼 클릭 시,,
    const handleSubmit = (e) => {
        e.preventDefault(); // 화면 유지

        // 기입한 이메일, 비밀번호 가져오기
        const data = new FormData(e.currentTarget);
        const email = data.get("User_Email");
        const password = data.get("User_Password"); 

        // 로그인 요청
        loginAPI({user_Email: email, user_Password: password})
            .then(res => {
                localStorage.setItem('user_Name', res.data.user_Name);
                newPassword(res.data.login_Type);}) 
            .then(() => history.push('/') ) // 메인 화면으로 이동
            .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null)) // DB에 존재하지 않는 데이터로 판정
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