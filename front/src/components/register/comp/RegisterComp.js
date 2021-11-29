import React, { useEffect, useRef, useState } from 'react';
import Register from '../UI/Register';
import { email as emailAPI, register as registerAPI } from '../../../lib/api/auth'; 
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const RegisterComp = () => {

    const [PWNOTMATCH, setPWNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [errorText, setErrorText] = useState();
    const [emailText, setEmailText] = useState();
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("유효성 검사를 통과하는 이메일 인지의 여부 : ", emailResult.current);
        console.log("이미 존재하는 이메일 인지의 여부 : ", emailText);
        console.log("비밀번호 유효성을 만족하는지의 여부 : ", pwResult.current);
        console.log("전화번호 유효성을 만족하는지의 여부 : ", phoneResult.current);
        console.log("체크박스에 체크를 했는지의 여부 : ", checkResult.current);
        console.log("비밀번호가 서로 일치하는지의 여부 : ", PWNOTMATCH);
        
        if(pwResult.current&& emailResult.current&&phoneResult.current&&checkResult.current&&PWNOTMATCH&&emailText){
        const data = new FormData(event.currentTarget);
        const user_Email = data.get('User_Email');
        const user_Password = data.get('User_Password');
        const user_Name = data.get('User_Name');
        const user_Tel = data.get('User_Tel');
        registerAPI({user_Email,user_Password,user_Name,user_Tel})
        .then(()=>{
            console.log("회원가입에 성공(server요청 잘되고 잘받았음)");
            history.push('/LoginPage')
        })
        .catch((err)=>{
            console.log(err);
        })

        setErrorText()
        return console.log("회원가입 성공!");
        }
        setErrorText("*회원가입 양식에 맞게 작성되지 않았습니다.");
        return console.log("회원가입 실패");;
      };

    useEffect(() => {
        if (User_Password === passWordConfirm) {
            // console.log("일치");
            setPWNOTMATCH(true);
        } else {
            // console.log("불일치");
            setPWNOTMATCH(false);
        }
    },[User_Password, passWordConfirm]);



    const regexPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
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
                emailAPI({user_Email: e.target.value})
                    .then(res=>{ console.log("중복검사 결과값 : ",!res.data);setEmailText(!res.data)})
                    .catch(err=>console.log(err));
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
                phoneResult.current = regexPhone.test(phoneNumber)
                console.log(phoneResult.current);
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