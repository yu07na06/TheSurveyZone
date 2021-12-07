import React, { useState } from 'react';
import FindPW from '../UI/FindPW';
import { createTheme  } from '@mui/material/styles';
import { searchPW } from '../../../lib/api/auth';
import ErrorSweet from '../../common/modules/ErrorSweet';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const FindPWComp = () => {
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();
    const theme = createTheme();

    const successPW = (findPW) => {
        Swal.fire({
            icon:'info',
            title:`비밀번호 찾기`,
            text: findPW,
            footer: '로그인 페이지로 이동합니다.' 
        })
        history.push('/LoginPage');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            user_Email: data.get('user_Email'),
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });

        const searchPWReq = ({
            user_Email: data.get('user_Email'),
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });

        searchPW(searchPWReq)
            .then(res=> {console.log("성공했다 : ",res); successPW(res.data)})
            .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message));
    };

      const onChange = (e) => {
        let text = e.target.value;
        let maketext = text.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
        setPhoneNumber(maketext);
    }

    return (
        <>
            <FindPW 
                handleSubmit={handleSubmit}
                theme={theme}
                onChange={onChange}
                phoneNumber={phoneNumber}
            />   
        </>
    );
};

export default FindPWComp;