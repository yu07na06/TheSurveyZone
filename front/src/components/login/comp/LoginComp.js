import React from 'react';
import Login from '../UI/Login';
import { createTheme  } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { LoginStateAction, UserEmailAction } from '../../../modules/loginReducer';
import { login as loginAPI } from '../../../lib/api/auth'; 
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react/cjs/react.development';

const LoginComp = () => {
    const [cookies, setCookie] = useCookies(['user_Token']);
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = createTheme();

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
            .then((res) => {
                console.log(res); 
                setCookie('user_Token', res.data.user_Token,{expires:timer , path:'/'}); // userCookie 저장           
                dispatch(LoginStateAction(true)); // login 상태 유지
                dispatch(UserEmailAction(email)); // user pk 저장
                history.push('/'); // 메인 화면으로 이동
            }).catch((res)=>{ // DB에 존재하지 않는 데이터로 판정
                console.log(res);                
                Swal.fire({
                    icon: 'error',
                    title: '로그인 실패',
                    text: '해당 정보가 일치하지 않습니다.'
                })
            })
    };

    // useEffect(()=>{
    //     console.log("토큰 받아왔는가", cookies.user_Token);
    // },[cookies.user_Token])

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