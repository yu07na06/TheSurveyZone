import React, { useState } from 'react';
import FindID from '../UI/FindID';
import { createTheme  } from '@mui/material/styles';
import { searchID } from '../../../lib/api/auth';
import ErrorSweet from '../../common/UI/ErrorSweet';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const FindIDComp = () => {
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();
    const theme = createTheme();

    const successID = (findId) => {
        Swal.fire({
            icon:'info',
            title:`아이디 찾기`,
            text: findId,
            footer: '로그인 창으로 이동합니다.' 
        })
        history.push('/LoginPage');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });
        const searchIDReq = ({
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });
        searchID(searchIDReq)
            .then(res=>{console.log("성공했다 : ",res); successID(res.data);})
            .catch(err=> ErrorSweet(err.response.status, err.response.statusText, err.response.data.message));
    };
    
    const onChange = (e) => {
        let text = e.target.value;
        let maketext = text.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
        setPhoneNumber(maketext);
    }

    return (
        <>
            <FindID 
                handleSubmit={handleSubmit}
                theme={theme}
                onChange={onChange}
                phoneNumber={phoneNumber}
            />   
        </>
    );
};

export default FindIDComp;