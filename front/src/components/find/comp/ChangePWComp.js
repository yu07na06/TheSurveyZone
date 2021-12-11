import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { changePW as changePWAPI } from '../../../lib/api/auth';
import ErrorSweet from '../../common/modules/ErrorSweet';
import ChangePW from '../UI/ChangePW';

const ChangePWComp = () => {
    const [PWNOTMATCH, setPWNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const [pwResult,setPwResult] = useState();

    const regexPW = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const history = useHistory();

    useEffect(() => {
        if (User_Password === passWordConfirm) {
            setPWNOTMATCH(true);
        } else {
            setPWNOTMATCH(false);
        }
    },[User_Password, passWordConfirm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(PWNOTMATCH&&pwResult){
            changePWAPI({"user_Password":passWordConfirm})
            .then(() =>{ ErrorSweet('info', null, "성공", "비밀번호 변경완료", null); history.push('/LoginPage');})
            .catch(err => { 
                if(err.response.data.errorCode=="400_4") ErrorSweet('error', null, "비밀번호 변경 실패", "기존 비밀번호와 동일합니다", null);
                if(err.response.data.errorCode=="404_1") {ErrorSweet('error', null, "비정상적인 접근", "로그인 후 비밀번호 변경 부탁드립니다", null); history.push('./') }
            });
        }
    }

    const confirm = (e) => { 
        switch(e.target.name){
            case 'User_Password' : 
                setUser_Password(e.target.value)
                setPwResult(regexPW.test(e.target.value))
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