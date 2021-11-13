import React, { useEffect, useRef, useState } from 'react';
import Register from '../UI/Register';
import { register as registerAPI } from '../../../lib/api/auth'; 
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const RegisterComp = () => {

    const [PWNOTMATCH, setPWNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [errorText, setErrorText] = useState();
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("emailResult.current", emailResult.current);
        console.log("pwResult.current", pwResult.current);
        console.log("phoneResult.current", phoneResult.current);
        console.log("checkResult.current", checkResult.current);
        console.log("PWNOTMATCH", PWNOTMATCH);
        
        if(pwResult.current&& emailResult.current&&phoneResult.current&&checkResult.current&&PWNOTMATCH){
        const data = new FormData(event.currentTarget);
        const User_Email = data.get('User_Email');
        const User_Password = data.get('User_Password');
        const User_Name = data.get('User_Name');
        const User_Tel = data.get('User_Tel');
        // console.log("User_Email : ", User_Email, "User_Password : ", User_Password);
        registerAPI({User_Email,User_Password,User_Name,User_Tel})
        .then(()=>{
            console.log("회원가입에 성공(server요청 잘되고 잘받았음)");
            history.push('/LoginPage')
        })
        .catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'server error',
                text: 'error code [500]'
            })
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
    const checkResult = useRef(null)
    const onChange = (e) => {
        switch(e.target.name){
            case 'User_Email' : 
                emailResult.current = regexEmail.test(e.target.value)
                // 서버에 아이디 보내고 있는지 없는지 값 받아와서 처리할 예정
                // axios.get(e.target.value)
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
            />   
        </>
    );
};

export default RegisterComp;