import React, { useEffect, useState } from 'react';
import Register from '../UI/Register';

const RegisterComp = () => {
    const [NOTMATCH, setNOTMATCH] = useState();
    const [User_Password, setUser_Password] = useState();
    const [passWordConfirm, setPassWordConfirm] = useState();
    const onSubmit = () => {

    };

    useEffect(() => {
        if (User_Password === passWordConfirm) {
            // console.log("일치");
            setNOTMATCH();
        } else {
            // console.log("불일치");
            setNOTMATCH("불일치");
        }
    },[User_Password, passWordConfirm]);

    const onChange = (e) => {
        (e.target.name === 'User_Password')?setUser_Password(e.target.value):setPassWordConfirm(e.target.value)
    }
    return (
        <>
            <Register 
            onSubmit={onSubmit}
            NOTMATCH={NOTMATCH}
            onChange={onChange}
            // inputText={inputText}
            />   
        </>
    );
};

export default RegisterComp;