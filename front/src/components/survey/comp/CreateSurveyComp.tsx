import Input from '@mui/material/Input';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createSurvey as createSurveyAPI, getTags as getTagsAPI } from '../../../lib/api/survey';
import ClipboardCopy, { Gongback } from '../../common/Function';
import ErrorSweet from '../../common/modules/ErrorSweet';
import submitOBJ from '../../common/TypeFunction';
import CreateSurvey from '../UI/CreateSurvey';
import LinearMagnificationComp from './LinearMagnificationComp';
import MultipleChoiceComp from './MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';



export const Img = ({ setUrl, imageSRC, }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  // onChange역할 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // 업로드한 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.getElementById('img_box');
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);

    console.log("reader", reader);
    setFileURL(reader.result)

    // handleFileUpload(e);
  };

  // formData라는 instance에 담아 보냄

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      console.log("selectedFile", selectedFile);

      axios.post(`/api/v1/image`, formData)
        .then(res => { setUrl(res.data) })
        .catch(err => { console.log(err); });
      console.log("업로드도 되었지롱");
    }
  }, [selectedFile])

  return (
    <>
      {imageSRC
        ? <><img width="100%" height="auto" id="img_box" src={imageSRC} alt="" /><Gongback num={1} /></>
        : <><img width="100%" height="auto" id="img_box" src="" alt="" /><Gongback num={1} /></>
      }

      <Input sx={{ ml: "auto" }} type="file" inputProps={{accept:"image/*"}} onChange={handleFileChange} />
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
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (cookies.Authorization == null) {
      Swal.fire({
        icon: 'info',
        title: '로그인이 필요한 페이지입니다.'
      })
      history.push('/LoginPage');
    }
  }, [])

  useEffect(() => {
    getTagsAPI()
      .then((res) => { setTags(res.data); })
      .catch(err => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
  }, [])

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = (e) => {
    setAnchorEl(null); // 메뉴 닫기
    switch (e.target.id) {
      case '객관식':
        setQuestion([...question, <div key={count.current}><MultipleChoiceComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      case '주관식':
        setQuestion([...question, <div key={count.current}><SubjectiveComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      case '선형배율':
        setQuestion([...question, <div key={count.current}><LinearMagnificationComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      default: break;
    }
    count.current += 1;
  };

  useEffect(() => {
    setQuestion_Ans({ ...question_ans, ...check }); // 객관식, 주관식, 선형 배율의 보기들을 합치는 곳
  }, [check]);

  // 질문 삭제
  useEffect(() => {
    // 객,주,선 삭제
    const newQuestionList = question.filter((value) => value.key !== delIndex);
    setQuestion(newQuestionList);

    // 해당 객관식 보기 삭제
    for (const key in question_ans) {
      if (key == delIndex) {
        delete question_ans[key];
      }
    }
  }, [delIndex]);

  const onClick = (e) => { // 완료 버튼 클릭 시, node에게 보냄
    e.preventDefault(); // 화면 유지
    if (question.length == 0) {
      alert('최소 하나의 질문이 필요합니다.')
      return;
    }
    const obj = submitOBJ(e, question_ans, question, day, Sur_Publish, url);

    let shareURL = "http://localhost:3000/SurveySubmitPage/";
    console.log("생성 시, 객체 확인합니다.", obj);
    console.log(JSON.stringify(obj));


    // 설문지 생성 API
    createSurveyAPI(obj)
      .then((res) => {
        Swal.fire({
          icon: 'info',
          title: '설문지 생성 완료',
          text: shareURL + res.data,
          showDenyButton: true,
          denyButtonText: '복사',
          confirmButtonText: '확인'
        }).then(async (result) => {
          if (result.isDenied) {
            await ClipboardCopy("아님~", `http://localhost:3000/SurveySubmitPage/${res.data}`)
            Swal.fire('URL 복사 성공', '', 'success');
          }
          history.push('/MySurveyPage'); // test 기간까지 history 사용하지 않겠다.
        })
      })
      .catch((err) => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message));
  };

  return (
    <>
      <CreateSurvey
        onClick={onClick}
        day={day}
        setDay={setDay}
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
        setSur_Publish={setSur_Publish}
      />
    </>
  );
};

export default CreateSurveyComp;