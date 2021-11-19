import React, { useEffect } from 'react';
import MySurvey from '../UI/MySurvey';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const MySurveyComp = () => {
    const [cookies] = useCookies(['user_Token']);
    const history = useHistory();
    
    useEffect(()=>{
        if(cookies.user_Token==null){
          Swal.fire({
            icon:'info',
            title:'로그인이 필요한 페이지입니다.'
          })
          history.push('/LoginPage');
        }
      },[])
    return (
        <>
            <MySurvey />
        </>
    );
};

export default MySurveyComp;