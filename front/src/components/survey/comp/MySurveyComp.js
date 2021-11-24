import React, { useEffect, useState } from 'react';
import MySurvey from '../UI/MySurvey';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { getMySurveyList as getMySurveyListAPI } from '../../../lib/api/survey';

const MySurveyComp = () => {
  const [cookies] = useCookies(['user_Token']);
  const [mySurList, setMysurList] = useState();
  const history = useHistory();
  
  useEffect(()=>{
    if(cookies.user_Token==null){
      Swal.fire({
        icon:'info', 
        title:'로그인이 필요한 페이지입니다.'
      })
      history.push('/LoginPage');
    }
    getMySurveyListAPI(1)
      .then(res => setMysurList(res.data))
      .catch(err => console.log(err))
  },[])

  const callPaging = (pageNum) => {
    getMySurveyListAPI(pageNum)
      .then(res => setMysurList(res.data))
      .catch(err => console.log(err))
  }

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire('URL 복사 성공');
    } catch (error) {
      Swal.fire('복사 실패..');
    }
  };

  return (
      <>
          <MySurvey 
            mySurList={mySurList}
            callPaging={callPaging}
            handleCopyClipBoard={handleCopyClipBoard}
          />
      </>
  );
};

export default MySurveyComp;