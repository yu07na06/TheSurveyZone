import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { deleteSurvey as deleteSurveyAPI, getMySurveyList as getMySurveyListAPI } from '../../../lib/api/survey';
import ErrorSweet from '../../common/modules/ErrorSweet';
import MySurvey from '../UI/MySurvey';
import { debounce } from "lodash";

const MySurveyComp = () => {
  const [cookies] = useCookies(['Authorization']);
  const [mySurList, setMysurList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  useEffect(()=>{
    if(cookies.Authorization==null){
      ErrorSweet('info', null, "권한 없음", "로그인이 필요한 페이지입니다.", null)
        .then(()=>history.push('/LoginPage'));
    }

    getMySurveyListAPI(currentPage)
      .then(res => setMysurList(res.data))
      .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
  },[])

  useEffect(()=>{
    mySurList&&setCurrentPage(mySurList.paginationInfo.criteria.page_Num);
  },[mySurList]);

  const callPaging = (pageNum) => {
    getMySurveyListAPI(pageNum)
      .then(res => setMysurList(res.data))
      .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
  }

  const ApiClick = debounce((e, id) => {
    switch(e.target.id){
      case "read":
        history.push(`/ReadOnlyPage/${id}`);
        break;
      case "mod" : 
        history.push(`/UpdatePage/${id}`);
        break;
      case "del" :  
        deleteSurveyAPI(id)
          .then(()=>{
                      getMySurveyListAPI(currentPage)
                        .then( res => setMysurList(res.data) )
                        .catch( err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
                    }
                )
          .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
        break;
      case "result" :
        history.push(`/ResultPage/${id}`)
        break;
      default: break;
    }
  },444);

  return (
    <>
        <MySurvey 
            mySurList={mySurList}
            currentPage={currentPage}
            callPaging={callPaging}
            ApiClick={ApiClick}
            surStateMark={surStateMark}
        />
    </>
  );
};

export default MySurveyComp;

const surStateMark = (surState) => {
  let stateText = null;
  let bgcolor = null;
  let clr = null;

  switch(surState){
    case 0:
      stateText = "진행전";
      bgcolor = "#F6D8CE";
      clr = "#FE642E";
      break;
    case 1:
      stateText="진행중";
      bgcolor = "#E0E6F8";
      clr = "#2E64FE";
      break;
    case 2:
      stateText="마감";
      bgcolor = "#E6E6E6";
      clr = "#848484";
      break;
    default: break;
  }

  return(
    <Typography align= 'center'variant="body2" style={{ borderRadius: "5px", backgroundColor : bgcolor , color : clr, fontWeight: 'bold'}}>
      {stateText}
    </Typography>
  );
}