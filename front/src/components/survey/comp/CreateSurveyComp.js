import React, { useEffect, useRef, useState } from 'react';
import CreateSurvey from '../UI/CreateSurvey';
import MultipleChoiceComp from '../comp/MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';
import LinearMagnificationComp from './LinearMagnificationComp';
import { createSurvey as createSurveyAPI, getTags as getTagsAPI } from '../../../lib/api/survey';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import  ClipboardCopy, { Gongback } from '../../common/Function';
import ErrorSweet from '../../common/UI/ErrorSweet';
import axios from 'axios';
import { Paper } from '@mui/material';

// const Img = ({setUrl}) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileURL, setFileURL] = useState(null);
  
//   // onChange역할 
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);

//     // 업로드한 이미지 미리보기
//     const imgEl = document.querySelector('.img_box');

//     const reader = new FileReader();
//     reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`);

//     reader.readAsDataURL(e.target.files[0]);
    
//     console.log("reader", reader);
//   };
  
//   // formData라는 instance에 담아 보냄
//   const handleFileUpload = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("img", selectedFile);
//     console.log("selectedFile", selectedFile);
  
//     axios.post(`/api/v1/image`,formData)
//     // axios.post(`/api/v1/testS3`,{formData,s1:"hi~"})
//       .then(res => { setUrl(res.data)})
//       .catch(err => { console.log(err);});
//   };

//   return (
//     <div>
//       {/* 이미지만 가능하게 하는려면 accept="image/*" 추가 */}
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={(e)=>handleFileUpload(e)}>업로드</button>
//       <div className="img_box">
//         {/* <img style={{ maxWidth: "100%", height: "auto"}} src="" alt=""/> */}
//         <img   style={{ width:"500px", height:"500px", backgroundRepeat  : 'no-repeat'}} src="" alt=""/>
//       </div>
//     </div>
//   );

// }

const Img = ({setUrl}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  
  // onChange역할 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // 업로드한 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.getElementById('img_box');
      previewImage.src=e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    
    console.log("reader", reader);
    setFileURL(reader.result)
  };
  
  // formData라는 instance에 담아 보냄
  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", selectedFile);
    console.log("selectedFile", selectedFile);
  
    axios.post(`/api/v1/image`,formData)
      .then(res => { setUrl(res.data)})
      .catch(err => { console.log(err);});
  };

  return (
    <>
      <Paper style={{ height:"270px" }} sx={{ bgcolor: '#EFF4E7', my: { xs: 3, md: 6 }, p: { xs: 3, md: 3 } }}>
        {/* 이미지만 가능하게 하는려면 accept="image/*" 추가 */}
        <img id="img_box" height="200px" width="auto" src="" alt=""/><Gongback num={1} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={(e)=>handleFileUpload(e)}>업로드</button>
      </Paper>
    </>
  );

}

const CreateSurveyComp = () => {
  const [cookies] = useCookies(['Authorization']);
  const [day, setDay] = useState([new Date(), new Date()]);
  const [Sur_Publish, setSur_Publish] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [question, setQuestion] = useState([]); // 질문 덩어리(객관식, 주관식, 선형배율)
  const [question_ans, setQuestion_Ans] = useState({}); // 질문에 대한 보기 이름에 대한 배열을 보내기 위해
  const [delIndex, setDelIndex] = useState();
  const [check, setCheck] = useState({});
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState();
  const open = Boolean(anchorEl);
  const count = useRef(0);
  const history = useHistory();
  const [url,setUrl] = useState(null);


  useEffect(()=>{
    if(cookies.Authorization==null){
      Swal.fire({
        icon:'info',
        title:'로그인이 필요한 페이지입니다.'
      })
      history.push('/LoginPage');
    }
  },[])

  useEffect(()=>{
    getTagsAPI()
    .then((res)=>{ setTags(res.data);})
    .catch(err=> ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
  },[])
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const onCheckChange = (e) => setSur_Publish( e.target.checked);

  const handleClose = (e) => {
    setAnchorEl(null); // 메뉴 닫기
    switch(e.target.id){
      case '객관식':
        setQuestion([...question, <div key={count.current}><MultipleChoiceComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
        break;
      case '주관식':
        setQuestion([...question, <div key={count.current}><SubjectiveComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
        break;
      case '선형배율':
        setQuestion([...question, <div key={count.current}><LinearMagnificationComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
        break;
      default : break;
    }
    count.current+=1;
  };

  useEffect(()=>{
    setQuestion_Ans({...question_ans, ...check}); // 객관식, 주관식, 선형 배율의 보기들을 합치는 곳
  },[check]);

  // 질문 삭제
  useEffect(()=>{
    // 객,주,선 삭제
    const newQuestionList = question.filter((value)=>value.key!==delIndex);
    setQuestion(newQuestionList);

    // 해당 객관식 보기 삭제
    for (const key in question_ans) {
      if(key == delIndex){
        delete question_ans[key];
      } 
    }
  },[delIndex]);

  const onClick = (e) => { // 완료 버튼 클릭 시, node에게 보냄
    e.preventDefault(); // 화면 유지
    if(question.length==0){
      alert('최소 하나의 질문이 필요합니다.')
      return;
    }

    const data = new FormData(e.currentTarget);
    const Sur_Title = data.get('Sur_Title'); // 설문 제목
    const Sur_Content = data.get('Sur_Content'); // 설문 본문

    let newQuestionAnsList = [];

    for (const key in question_ans) {
      newQuestionAnsList.push(question_ans[key]);  
    }
    
    let questionList = question.map((value, index)=>{ // 질문 들어가는 배열
      let SurType = null;
      switch(value.props.children.type.name){
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
        surQue_Content: data.get(`SurQue_Content${value.key}`), // 질문 내용
        surQue_QType: SurType, // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
        surQue_Essential: data.get(`SurQue_Essential${value.key}`)==='on'?true:false, // true:필수, false:옵션
        surQue_MaxAns: data.get(`surQue_MaxAns${value.key}`), // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
        surQue_Order: index, // 질문의 순서
        answerList : [],
        selectList: newQuestionAnsList[index].map((v, idx)=>{ // 객관식만 처리한 상태이므로, 주관식과 선형배율 error(수정 부탁)
          return {
            surSel_Content: v!=null?data.get(v):'', // 보기 내용 --> 주관식의 경우, ''빈값으로 보냄
            surSel_Order: v!=null?idx:'' // 보기 순서 --> 주관식의 경우, ''빈값으로 보냄
          };
        })
      };
    });

    let obj = {
      sur_Type:1, // 오정환 주입! 일단 하라고 하시넹 오키
      sur_Title: Sur_Title, // 설문 제목
      sur_Content: Sur_Content, // 설문 본문
      sur_State: new Date() < day[0]?0:1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
      sur_StartDate: day[0].getFullYear()+"-"+ ('0'+(day[0].getMonth()+1)).slice(-2) +"-"+('0'+(day[0].getDate())).slice(-2), // Date 객체로 던지세요.     ---> comp에서 state로 관리중
      sur_EndDate: day[1].getFullYear()+"-"+ ('0'+(day[1].getMonth()+1)).slice(-2) +"-"+('0'+(day[1].getDate())).slice(-2),                               // ---> comp에서 state로 관리중
      sur_Publish: !Sur_Publish, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
      sur_Image: url,
      sur_Tag: data.get(`sur_Tag`), 
      questionList,
    }

    
    console.log("생성 시, 객체 확인합니다.", obj);
    let shareURL="http://localhost:3000/SurveySubmitPage/";
    console.log(JSON.stringify(obj));



    // 설문지 생성 API
    createSurveyAPI(obj)
      .then((res)=>{
        Swal.fire({
          icon: 'info',
          title: '설문지 생성 완료',
          text: shareURL+res.data,
          showDenyButton: true,
          denyButtonText: '복사',
          confirmButtonText: '확인'
        }).then(async(result)=>{
          if (result.isDenied) {
            await ClipboardCopy("아님~",`http://localhost:3000/SurveySubmitPage/${res.data}`)
            Swal.fire('URL 복사 성공','', 'success');
          }
          history.push('/MySurveyPage'); // test 기간까지 history 사용하지 않겠다.
        })
      })
      .catch((err)=> ErrorSweet(err.response.status, err.response.statusText, err.response.data.message));
  };

  return (
      <>  
        <CreateSurvey 
          onClick={onClick}
          day={day}
          setDay={setDay}
          onCheckChange={onCheckChange}
          question={question}
          open={open}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          tag={tag}
          setTag={setTag}
          tags={tags}
          Img={Img}
          setUrl={setUrl}
        />  
      </>
  );
};

export default CreateSurveyComp;