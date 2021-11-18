import React from 'react';
import Login from '../UI/Login';
import { createTheme  } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { LoginStateAction, UserEmailAction } from '../../../modules/loginReducer';
import { login as loginAPI } from '../../../lib/api/auth'; 
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const LoginComp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = createTheme();

    // 로그인 버튼 클릭 시,,
    const handleSubmit = (e) => {
        e.preventDefault(); // 화면 유지

        // 기입한 이메일, 비밀번호 가져오기
        const data = new FormData(e.currentTarget);
        const email = data.get('User_Email');
        const password = data.get('User_Password'); 

        // 로그인 요청
        loginAPI({"user_Email": email, "user_Password": password})
            .then((res) => {
                console.log(res);                
                dispatch(LoginStateAction(true)); // login 상태 유지
                dispatch(UserEmailAction(email)); // user pk 저장
                history.push('/'); // 메인 화면으로 이동
            }).catch(()=>{ // DB에 존재하지 않는 데이터로 판정
                Swal.fire({
                    icon: 'error',
                    title: '로그인 오류',
                    text: '해당 데이터가 없습니다.'
                })
            })
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