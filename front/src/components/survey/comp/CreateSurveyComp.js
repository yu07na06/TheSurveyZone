import React, { useRef, useState } from 'react';
import CreateSurvey from '../UI/CreateSurvey';
import { createTheme } from '@mui/material/styles';
import MultipleChoiceComp from '../comp/MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';
import LinearMagnificationComp from './LinearMagnificationComp';

const CreateSurveyComp = () => {
  const [startDate, setStartDate] = useState(new Date()); // Sur_StartDate
  const [endDate, setEndDate] = useState(new Date()); // Sur_EndDate
  const [Sur_Publish, setSur_Publish] = useState(false);
  const [question, setQuestion] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = createTheme();
  const todayDate = new Date();
  const open = Boolean(anchorEl);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const count = useRef(0);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const onCheckChange = (e) =>{
    setSur_Publish( e.target.checked)
  }

  const handleClose = (e) => {
    setAnchorEl(null); // 메뉴 닫기
    switch(e.target.id){
      case '객관식':
        setQuestion([...question, <MultipleChoiceComp number={count.current} />]);
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
  
  const onClick = (e) => { // node에게 보냄
    e.preventDefault(); // 화면 유지
    const data = new FormData(e.currentTarget);

    const Sur_Title = data.get('Sur_Title'); // 설문 제목
    const Sur_Content = data.get('Sur_Content'); // 설문 본문
    let Question = question.map((value, index)=>{
      return [{
        SurQue_Content: data.get(`SurQue_Content${index}`),
        SurQue_QType: question[index].key,


        SurQue_Order: index,
      }];
    });

    let obj = {
      Form: {
          Sur_Title: Sur_Title, // 설문 제목
          Sur_Content: Sur_Content, // 설문 본문
          Sur_State: todayDate<startDate?0:1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
          Sur_StartDate: startDate, // Date 객체로 던지세요.     ---> comp에서 state로 관리중
          Sur_EndDate: endDate,                               // ---> comp에서 state로 관리중
          Sur_Publish: !Sur_Publish, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
          Sur_Img: "image", // 이미지 추후에 현재는 제외
          User_ID:"woong"  // 작성자 ID
      },
      Question,
      // Question: [ // 질문들어가는 배열인데
      //   {
      //     SurQue_Content: "", // 질문 내용
      //     SurQue_QType: "", // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
      //     SurQue_Ans: "", // 보기 갯수
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
    obj();
  };

  return (
      <>
        <CreateSurvey 
          theme={theme}
          onClick={onClick}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onCheckChange={onCheckChange}
          question={question}
          open={open}
          anchorEl={anchorEl}
          handleClick={handleClick}
          label={label}
          handleClose={handleClose}
        />  
      </>
  );
};

export default CreateSurveyComp;