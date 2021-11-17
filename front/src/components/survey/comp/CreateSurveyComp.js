import React, { useEffect, useRef, useState } from 'react';
import CreateSurvey from '../UI/CreateSurvey';
import { createTheme } from '@mui/material/styles';
import MultipleChoiceComp from '../comp/MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';
import LinearMagnificationComp from './LinearMagnificationComp';
import { createsurvey as createsurveyAPI } from '../../../lib/api/survey';

const CreateSurveyComp = () => {
  const [day, setDay] = useState([new Date(), new Date()]);
  const [Sur_Publish, setSur_Publish] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [question, setQuestion] = useState([]); // 질문 덩어리(객관식, 주관식, 선형배율)
  const [question_ans, setQuestion_Ans] = useState({}); // 질문에 대한 보기 이름에 대한 배열을 보내기 위해
  const [check, setCheck] = useState({});
  const theme = createTheme();
  const todayDate = new Date();
  const open = Boolean(anchorEl);
  const count = useRef(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const onCheckChange = (e) =>{
    setSur_Publish( e.target.checked);
  }

  const handleClose = (e) => {
    setAnchorEl(null); // 메뉴 닫기
    switch(e.target.id){
      case '객관식':
        setQuestion([...question, <MultipleChoiceComp number={count.current} setCheck={setCheck} />]);
        break;
      case '주관식':
        setQuestion([...question, <SubjectiveComp number={count.current}/>]);
        break;
      case '선형배율':
        setQuestion([...question, <LinearMagnificationComp number={count.current} />]);
        break;
      default : break;
    }
    count.current+=1;
  };

  useEffect(()=>{
    setQuestion_Ans({...question_ans, ...check});
  },[check]);

  useEffect(()=>{
    console.log("부모는 이거 삭제된 것까지 알까?", question_ans);
  },[question_ans]);

  useEffect(()=>{
    console.log(question);
  },[question])
  
  const onClick = (e) => { // node에게 보냄
    e.preventDefault(); // 화면 유지
    const data = new FormData(e.currentTarget);

    const Sur_Title = data.get('Sur_Title'); // 설문 제목
    const Sur_Content = data.get('Sur_Content'); // 설문 본문

    let questionList = question.map((value, index)=>{
      let SurType = null;
      switch(value.type.name){
        case 'SubjectiveComp':
          SurType=0; // 주관식
          break;
        case 'MultipleChoiceComp':
          SurType=1; // 객관식
          break;
        case 'LinearMagnificationComp': 
          SurType=2; // 선형배율
          break;
        default: break;
      }
      return {
        surQue_Content: data.get(`SurQue_Content${index}`),
        surQue_QType: SurType,
        surQue_Essential: data.get(`SurQue_Essential${index}`)==='on'?true:false,
        surQue_MaxAns: 3,
        surQue_Order: index,
        answerList : [],
        selectList: question_ans[index].map((v, idx)=>{ // 객관식만 처리한 상태이므로, 주관식과 선형배율 error(수정 부탁)
          return {
            surSel_Content: data.get(v),
            surSel_Order: idx
          };
        })
      };
    });

    let obj = {
      Form: {
          Sur_Title: Sur_Title, // 설문 제목
          Sur_Content: Sur_Content, // 설문 본문
          Sur_State: todayDate<day[0]?0:1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
          Sur_StartDate: day[0].getFullYear()+"-"+ ('0'+(day[0].getMonth()+1)).slice(-2) +"-"+('0'+(day[0].getDate())).slice(-2), // Date 객체로 던지세요.     ---> comp에서 state로 관리중
          Sur_EndDate: day[1].getFullYear()+"-"+ ('0'+(day[1].getMonth()+1)).slice(-2) +"-"+('0'+(day[1].getDate())).slice(-2),                               // ---> comp에서 state로 관리중
          Sur_Publish: !Sur_Publish, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
          Sur_Img: "image", // 이미지 추후에 현재는 제외
          User_ID:"woong"  // 작성자 ID
      }, 
      questionList,
      // Question: [ // 질문들어가는 배열인데
      //   {
      //     SurQue_Content: "", // 질문 내용
      //     SurQue_QType: "", // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
      //     SurQue_Essential: "", // true:필수, false:옵션
      //     SurQue_MaxAns: '', // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
      //     SurQue_Order: '', // 질문의 순서
      //     Select: [ // 주관식인 경우, 보내지 말것.
      //       {
      //           SurSel_Content: "1번 보기", // 보기 내용
      //           SurSel_Order: 1 // 보기 순서
      //       },
      //       {
      //           SurSel_Content: "2번 보기",
      //           SurSel_Order: 2
      //       }
      //     ]
      //   },
      
    }
    console.log(questionList);
    createsurveyAPI({questionList})
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err));
  };

  return (
      <>
        <CreateSurvey 
          theme={theme}
          onClick={onClick}
          day={day}
          setDay={setDay}
          onCheckChange={onCheckChange}
          question={question}
          open={open}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        />  
      </>
  );
};

export default CreateSurveyComp;