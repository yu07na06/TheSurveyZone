import React from 'react';
import Login from '../UI/Login';
import { createTheme  } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { LoginStateAction, UserEmailAction } from '../../../modules/loginReducer';
import { login as loginAPI } from '../../../lib/api/auth'; 
import { useHistory } from 'react-router-dom';
import ErrorSweet from '../../common/UI/ErrorSweet';
import Swal from 'sweetalert2';

const LoginComp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = createTheme();

    const newPassword = (infoPW) => {
        if(infoPW === "TempPW"){
            Swal.fire({
                title:'비밀번호 변경 페이지로 이동'
            }).then(()=>{
                history.push('/ChangePWPage');
            })
            
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
        const timer = new Date();
        timer.setMinutes(timer.getMinutes()+60);

        console.log({"user_Email": email, "user_Password": password});
        // 로그인 요청
        loginAPI({user_Email: email, user_Password: password})
            .then(res => {
                console.log(res);
                newPassword(res.data.login_Type);})
            .then(res => {

                dispatch(LoginStateAction(true)); // login 상태 유지
                dispatch(UserEmailAction(email)); // user pk 저장
                history.push('/'); // 메인 화면으로 이동
            }).catch((err)=> // DB에 존재하지 않는 데이터로 판정
                ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
    };

    return (
        <>
            <Login
                handleSubmit={handleSubmit}
                theme={theme}
            />   
        </>
    );
};

export default LoginComp;