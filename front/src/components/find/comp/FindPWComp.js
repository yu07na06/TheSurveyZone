import React, { useState } from 'react';
import FindPW from '../UI/FindPW';
import { createTheme  } from '@mui/material/styles';
import { searchPW } from '../../../lib/api/auth';
import ErrorSweet from '../../common/modules/ErrorSweet';
import { useHistory } from 'react-router';

const FindPWComp = () => {
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();
    const theme = createTheme();

    const successPW = (findPW) => {
        ErrorSweet('info', null, '비밀번호 찾기', findPW, '로그인 페이지로 이동합니다.')
        history.push('/LoginPage');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const searchPWReq = ({
            user_Email: data.get('user_Email'),
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });

        searchPW(searchPWReq)
            .then( res => successPW(res.data) )
            .catch(err => { 
                if(err.response.data.errorCode=="400_3") ErrorSweet('error', null, "유효한값이 아닙니다", "이메일 형식과 비밀번호를 확인해주세요", null);
            });
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