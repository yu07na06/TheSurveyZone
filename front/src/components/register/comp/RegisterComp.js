import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { debounceCheck } from '../../common/debounceFunction';
import Register from '../UI/Register';

const RegisterComp = () => {
    const [PWNOTMATCH, setPWNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [errorText, setErrorText] = useState();
    const [emailText, setEmailText] = useState(true);
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user_Email = data.get('User_Email');
        const user_Password = data.get('User_Password');
        const user_Name = data.get('User_Name');
        const user_Tel = data.get('User_Tel');
        const registerData = {user_Email, user_Password, user_Name, user_Tel}

        if(pwResult.current&& emailResult.current&&phoneResult.current&&checkResult.current&&PWNOTMATCH&&emailText){
            setEmailText(debounceCheck(e, registerData, history));
            setErrorText();
            return true;
        }
        setErrorText("*회원가입 양식에 맞게 작성되지 않았습니다.");
        return false;
    };

    useEffect(() => {
        if (User_Password === passWordConfirm) {
            setPWNOTMATCH(true);
        } else {
            setPWNOTMATCH(false);
        }
    },[User_Password, passWordConfirm]);

    const regexPW = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const pwResult = useRef(null);
    const emailResult = useRef(null);
    const phoneResult = useRef(null);
    const checkResult = useRef(null);

    const onChange = (e) => { 
        switch(e.target.name){
            case 'User_Email' : 
                emailResult.current = regexEmail.test(e.target.value)
                debounceCheck(e,null,history,setEmailText);
                break;
            case 'User_Password' : 
                setUser_Password(e.target.value)
                pwResult.current = regexPW.test(User_Password);
                break;
            case 'passWordConfirm' : 
                setPassWordConfirm(e.target.value)
                break;
            case 'User_Tel' :
                let text = e.target.value;
                let maketext = text.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
                setPhoneNumber(maketext);
                phoneResult.current = regexPhone.test(maketext)
                break;
            case 'checkbox' :
                checkResult.current = e.target.checked
                break;
            default : break;
        }
    }

    return (
        <>
            <Register 
            onSubmit={onSubmit}
            PWNOTMATCH={PWNOTMATCH}
            onChange={onChange}
            phoneNumber={phoneNumber}
            errorText={errorText}
            emailText={emailText}
            />   
        </>
    );
};

export default RegisterComp;