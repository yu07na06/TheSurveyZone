import React, { useEffect, useState } from 'react';
import MySurvey from '../UI/MySurvey';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {deleteSurvey as deleteSurveyAPI, getMySurveyList as getMySurveyListAPI } from '../../../lib/api/survey';
import ErrorSweet from '../../common/modules/ErrorSweet';

const MySurveyComp = () => {
  const [cookies] = useCookies(['Authorization']);
  const [mySurList, setMysurList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  
  useEffect(()=>{
    if(cookies.Authorization==null){
      Swal.fire({
        icon:'info', 
        title:'로그인이 필요한 페이지입니다.'
      })
      history.push('/LoginPage');
    }
    getMySurveyListAPI(currentPage)
      .then(res => setMysurList(res.data))
      .catch(err => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
  },[])

  useEffect(()=>{
    mySurList&&setCurrentPage(mySurList.paginationInfo.criteria.page_Num);
  },[mySurList]);

  const callPaging = (pageNum) => {
    getMySurveyListAPI(pageNum)
      .then(res => setMysurList(res.data))
      .catch(err => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
  }

  const ApiClick = (e, id) => {
    console.log(e.target);
    switch(e.target.id){
      case "mod" : console.log("수정 on");
        history.push(`/UpdatePage/${id}`);
        break;
      case "del" :  console.log("삭제 on");
          deleteSurveyAPI(id)
            .then(res=>console.log("삭제 성공..?",res))
            .then(()=>{
                        // setMysurList(null); // 억울해 진짜 안되었는데,,,, 원래 사용한 이유는 아래에서 바뀐 데이터를 넣어도 state가 변경이 안되었다고 했었는데...
                        getMySurveyListAPI(currentPage)
                          .then(res => { console.log("리스트 재요청"); setMysurList(res.data); })
                          .catch(err => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
                      }
                  )
            .catch(err=> ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
        break;
      case "result" :  console.log("결과 on")
                      history.push(`/ResultPage/${id}`)
        break;
      default: break;
    }
  }

  return (
    <>
        <MySurvey 
            ApiClick={ApiClick}
            mySurList={mySurList}
            callPaging={callPaging}
            currentPage={currentPage}
        />
    </>
  );
};

export default MySurveyComp;