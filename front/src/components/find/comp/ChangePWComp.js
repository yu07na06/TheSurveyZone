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
            setPWNOTMATCH(true);
        } else {
            setPWNOTMATCH(false);
        }
    },[User_Password, passWordConfirm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(PWNOTMATCH&&pwResult.current){
            changePWAPI({"user_Password":passWordConfirm})
            .catch( err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null) )
            history.push('/');
        }
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