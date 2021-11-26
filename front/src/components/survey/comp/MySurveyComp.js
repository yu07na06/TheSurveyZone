import React, { useEffect, useState } from 'react';
import MySurvey from '../UI/MySurvey';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {deleteSurvey as deleteSurveyAPI, getMySurveyList as getMySurveyListAPI } from '../../../lib/api/survey';



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

  // const ApiClick = (e,id) => {
  //   switch(e.target.id){
  //     case "mod" : console.log("수정 on");
        // modifySurveyAPI(id)
        // .then(res=>console.log("수정 성공..?",res))
        // .catch(res=>console.log("수정 실패..?",res))
  //       break;
  //     case "del" :  console.log("삭제 on");
  //         deleteSurveyAPI(id)
  //         .then(res=>console.log("삭제 성공..?",res))
  //         // .then(res=>setMysurList(res.data))
  //         .catch(res=>console.log("삭제 실패..?",res))
  //       break;
  //     case "result" :  console.log("결과 on");
  //       break;
  //     default:
  //       break;
  //   }
  // }

  const ApiClick = (e, id) => {
    switch(e.target.id){
      case "mod" : console.log("수정 on");
        history.push(`/UpdatePage/${id}`);
        break;
      case "del" :  console.log("삭제 on");
          deleteSurveyAPI(id)
          .then(res=>console.log("삭제 성공..?",res))
          // .then(res=>setMysurList(res.data))
          .catch(res=>console.log("삭제 실패..?",res))
        break;
      case "result" :  console.log("결과 on");
        break;
      default:
        break;
    }
  }


  return (
      <>
          <MySurvey 
            ApiClick={ApiClick}
            mySurList={mySurList}
            callPaging={callPaging}
          />
      </>
  );
};

export default MySurveyComp;