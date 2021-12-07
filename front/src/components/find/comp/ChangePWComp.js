import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { changePW as changePWAPI } from '../../../lib/api/auth';
import ErrorSweet from '../../common/modules/ErrorSweet';
import ChangePW from '../UI/ChangePW';

const ChangePWComp = () => {
    const [PWNOTMATCH, setPWNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const pwResult = useRef(null);
    const regexPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    const history = useHistory();

    useEffect(() => {
        if (User_Password === passWordConfirm) {
            // console.log("일치");
            setPWNOTMATCH(true);
        } else {
            // console.log("불일치");
            setPWNOTMATCH(false);
        }
    },[User_Password, passWordConfirm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("비밀번호가 서로 일치하는지의 여부 : ", PWNOTMATCH);
        console.log("비밀번호 유효성을 만족하는지의 여부 : ", pwResult.current);
        if(PWNOTMATCH&&pwResult.current){
            changePWAPI({"user_Password":passWordConfirm})
            .then(res=>console.log("성공 : ",res))
            .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message))
            console.log("회원가입 완료!");
            history.push('/');
        }
           console.log("비밀번호 변경 양식 실패~");
    }

    const confirm = (e) => { 
        switch(e.target.name){
            case 'User_Password' : 
                setUser_Password(e.target.value)
                pwResult.current = regexPW.test(User_Password);
            break;
            case 'passWordConfirm' : 
                setPassWordConfirm(e.target.value)
            break;
            default : break;
        }
    }

    return (
        <>
            <ChangePW
                confirm={confirm}
                PWNOTMATCH={PWNOTMATCH}
                handleSubmit={handleSubmit}
            />   
        </>
    );
};

export default ChangePWComp;