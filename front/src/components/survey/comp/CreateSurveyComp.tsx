import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { getTags as getTagsAPI } from '../../../lib/api/survey';
import debounceCreate from '../../common/debounceFunction';
import ErrorSweet from '../../common/modules/ErrorSweet';
import submitOBJ from '../../common/TypeFunction';
import CreateSurvey from '../UI/CreateSurvey';
import LinearMagnificationComp from './LinearMagnificationComp';
import MultipleChoiceComp from './MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';

const CreateSurveyComp = () => {
  const [cookies] = useCookies(['Authorization']);
  const [day, setDay] = useState([new Date(), new Date()]);
  const [Sur_Publish, setSur_Publish] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [question, setQuestion] = useState([]);
  const [question_ans, setQuestion_Ans] = useState({});
  const [delIndex, setDelIndex] = useState();
  const [check, setCheck] = useState({});
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState();
  const open = Boolean(anchorEl);
  const [url, setUrl] = useState(null);
  const count = useRef(0);
  const history = useHistory();

  useEffect(() => {
    if (cookies.Authorization == null) {
      ErrorSweet('info', null, "권한 없음", "로그인이 필요한 페이지입니다.", '로그인 페이지로 이동합니다.')
      history.push('/LoginPage');
    }else{
      getTagsAPI()
        .then((res) => { setTags(res.data); })
        .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
    }
  }, [])

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = (e) => {
    setAnchorEl(null);
    switch (e.target.id) {
      case '객관식':
        setQuestion([...question, <div key={count.current}><MultipleChoiceComp key="Mul" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      case '주관식':
        setQuestion([...question, <div key={count.current}><SubjectiveComp key="Sub" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      case '선형배율':
        setQuestion([...question, <div key={count.current}><LinearMagnificationComp key="Lin" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} realReadState={undefined} /></div>]);
        break;
      default: break;
    }
    count.current += 1;
  };

  useEffect(() => {
    setQuestion_Ans({ ...question_ans, ...check });
  }, [check]);

  useEffect(() => {
    const newQuestionList = question.filter((value) => value.key !== delIndex);
    setQuestion(newQuestionList);
    
    for (const key in question_ans) {
      if (key == delIndex) {
        delete question_ans[key];
      }
    }
  }, [delIndex]);

  const onClick = (e) => {
    e.preventDefault();
    if (question.length == 0) {
      ErrorSweet('info', null, "생성 양식 미충족", "최소 하나의 질문이 필요합니다.", null);
      return;
    }

    const obj = submitOBJ(e, question_ans, question, day, Sur_Publish, url);
    debounceCreate(obj, process.env.REACT_APP_URL, history);
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
        setUrl={setUrl}
        setSur_Publish={setSur_Publish}
      />
    </>
  );
};

export default CreateSurveyComp;