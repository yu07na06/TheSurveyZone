import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSurvey as getSurveyAPI, getTags as getTagsAPI, modifySurvey as modifySurveyAPI, postSurvey as postSurveyAPI, surveyCheck as surveyCheckAPI, surveyModifyCheck as surveyModifyCheckAPI } from '../../../lib/api/survey';
import { beforeAction } from '../../../modules/submitReducer';
import ErrorSweet from '../../common/modules/ErrorSweet';
import submitOBJ from '../../common/TypeFunction';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from './BeforeSurveyComp';
import LinearMagnificationComp from './LinearMagnificationComp';
import MainSurveyComp from './MainSurveyComp';
import MultipleChoiceComp from './MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';

const SurveySubmitComp = ({surveykey, UpdateKey, ReadOnlyState, realReadState}) => {
    const sexAge = useSelector(state=>state.submitReducer.beforeData)
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [ checkboxlistState, setCheckboxlistState ] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [surveyReqForm, setSurveyReqForm] = useState(null);
    const [day, setDay] = useState([new Date(), new Date()]); // 수정일때 사용
    const [tag, setTag] = useState(null); // 수정일때 사용
    const [tags, setTags] = useState(null); // 수정일때 사용
    const [question, setQuestion] = useState([]); // 질문 덩어리(객관식, 주관식, 선형배율)
    const [anchorEl, setAnchorEl] = useState(null);
    const [check, setCheck] = useState({});
    const [delIndex, setDelIndex] = useState(null);
    const [question_ans, setQuestion_Ans] = useState({}); // 질문에 대한 보기 이름에 대한 배열을 보내기 위해
    const [sex,setSex] = useState();
    const [age,setAge] = useState();
    const submitCheck = useRef(false);
    const open = Boolean(anchorEl);
    const count = useRef(0);
    const history = useHistory();
    const dispatch = useDispatch()
    const steps = ['데이터 수집', '설문지', '제출 완료'];
    const [url,setUrl] = useState(null);
    const [Sur_Publish, setSur_Publish] = useState(false);

    const surveyCheckFunc = (overlapIP, surState) => {
        // 참여한 IP=false / 참여안한 IP=true
        if(!overlapIP && !realReadState){
            ErrorSweet('error', null, "중복 참여", "이미 참여한 설문입니다", "설문 보기 페이지로 이동합니다")
                .then(() => history.push(`/ReadOnlyPage/${surveykey}`));
        }else if(surState===0 && !realReadState && !UpdateKey){
            ErrorSweet('error', null, "참여 불가", "진행 전 설문입니다", "설문 보기 페이지로 이동합니다")
                .then(() => history.push(`/ReadOnlyPage/${surveykey}`));
        }
    }

    useEffect(()=>{
        surveyCheckAPI(surveykey)
            .then(res => surveyCheckFunc(res.data.check_IP, res.data.check_State))
            .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null))
    },[])

    useEffect(()=>{ // 수정 시, mainSurvey 출력 및 태그 목록 불러오기
        if(UpdateKey){ 
            surveyModifyCheckAPI(surveykey) // 수정 시, 권한 여부 확인
                .then(res=>console.log("수정 권한 있음", res))
                .catch(err=>{ ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null).then(() => history.push('/')) }) // 403 오류
            
            submitCheck.current = true
            setActiveStep(1); // mainSurveyComp 바로 이동
            getTagsAPI() // 태그 목록 불러오기
                .then(res=> setTags(res.data))
                .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
        }
    },[])

    useEffect(()=>{ // 이거 삭제해도 되는데, 확인 바람
        setCheckboxlistState(surAns_Content)
    },[surAns_Content])

    useEffect(() => { // 설문 조회/수정 시 데이터 들고오는거 알지?
        if(!UpdateKey&&ReadOnlyState){
            setActiveStep(1); // mainSurveyComp 바로 이동
        }
        getSurveyAPI(surveykey)
           .then(res =>{ console.log("요청 결과: ",res.data); setSurveyReqForm(res.data); })
           .catch(err => console.log("요청 오류", err)); // 설문 참여한 사람이라면, 서버쪽에서 알려주어서 튕구는 걸로 함 403
   },[surveykey])

   useEffect(()=>{ // 수정/응답시 뿌려주는 용도
       if(surveyReqForm){ // 수정할때도 쓰고~ 응답할때도 쓰는~ 그저 뿌려주는 용도의 useEffect입니다.
           setDay([new Date(surveyReqForm.sur_StartDate), new Date(surveyReqForm.sur_EndDate)]);
           count.current = surveyReqForm.questionList.length;
           let newOrderQuestion = surveyReqForm.questionList.map((value, index)=>{
                switch(value.surQue_QType){
                    case 0: // 주관식
                        return <div key={index}><SubjectiveComp key="Sub" ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} realReadState={realReadState}/></div>;    
                    case 1: // 객관식
                        return <div key={index}><MultipleChoiceComp key="Mul" ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} checkboxlistState={checkboxlistState} realReadState={realReadState} /></div>;
                    case 2: // 선형배율
                        return <div key={index}><LinearMagnificationComp key="Lin" ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} realReadState={realReadState} /></div>;
                    default: break;
                }
            });
            setQuestion(newOrderQuestion);
       }
   },[surveyReqForm])

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <BeforeSurveyComp setAge={setAge} setSex={setSex}/>;
            case 1:
                return <MainSurveyComp 
                            surveyReqForm={surveyReqForm} 
                            UpdateKey={UpdateKey} 
                            day={day} 
                            setDay={setDay} 
                            tag={tag} 
                            setTag={setTag} 
                            tags={tags} 
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            open={open}
                            handleClose={handleClose}
                            question={question}
                            ReadOnlyState={true}
                            setUrl={setUrl}
                            setSur_Publish={setSur_Publish}
                        /> ;
            case 2:
                return  <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                설문 감사합니다 :)
                            </Typography>
                        </React.Fragment>;
            default:
                break; // 여기로 올때, 해결해야하는데,
        }
    }
    
    useEffect(()=>{
        setQuestion_Ans({...question_ans, ...check}); // 객관식, 주관식, 선형 배율의 보기들을 합치는 곳
    },[check]);

    useEffect(()=>{
        // 객,주,선 삭제
        
        
        const newQuestionList = question.filter((value)=> {
            console.log("value", value);
            return value.key!==delIndex
        } );
        setQuestion(newQuestionList);

        // 해당 객관식 보기 삭제
        for (const key in question_ans) {
            if(key == delIndex)
                delete question_ans[key];
        }
    },[delIndex]);


    const handleClose = (e) => {
        setAnchorEl(null); // 메뉴 닫기
        switch(e.target.id){
            case '객관식':
                setQuestion([...question, <div key={count.current}><MultipleChoiceComp key="Mul" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} /></div>  ]);
                break;
            case '주관식':
                setQuestion([...question, <div key={count.current}><SubjectiveComp key="Sub" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
                break;
            case '선형배율':
                setQuestion([...question, <div key={count.current}><LinearMagnificationComp key="Lin" ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
                break;
            default : break;
        }
        count.current+=1;
    };

    useEffect(()=>{
        surveyReqForm&&setUrl(surveyReqForm.sur_Image);
    },[surveyReqForm])

    const lastSubmit = (e) => {
        e.preventDefault();
        if (submitCheck.current === false){
            submitCheck.current = true
            if(realReadState) ErrorSweet('success', null, "확인", "메인 페이지로 이동합니다.", null).then(() => history.push('/'));

        }else{
            const data = new FormData(e.currentTarget);
            
            let tempArray = [];
            let temp = '';
            let OrderNumber = 0;
            let tempString = "";
            
            for (const key in surAns_Content) {
                let splitValue=surAns_Content[key].split('_');
                
                temp = data.get(surAns_Content[key]);
                
                switch(splitValue[0]){
                    case 'SurQueAnswer': // 주관식
                        if(tempString!="" || splitValue[1] != OrderNumber){
                            tempArray.push(tempString);
                            tempString = "";
                            OrderNumber++;
                        }
                        tempArray.push(temp);
                        OrderNumber++;
                        break;

                    case 'SurQueCheck': // 객관식
                        for(let i=0; i<=Number(splitValue[2]); i++){
                            temp = data.get(`SurQueCheck_${splitValue[1]}_${i}`);
                            
                            if(temp != null){
                                if(splitValue[1] != OrderNumber){
                                    tempArray.push(tempString);
                                    tempString="";
                                    OrderNumber++;
                                }
                                tempString += temp + 'Θ';   
                            }
                        }
                        break;
                    case 'radio': // 선형배율
                        if(tempString!="" || splitValue[1] != OrderNumber){
                            tempArray.push(tempString);    
                            tempString = "";
                            OrderNumber++;
                        }
                        if(temp == null){
                            tempArray.push('');
                        }
                        else{
                            let value2 = temp.split('_');
                            tempArray.push(value2[2]);
                            OrderNumber++;
                        }
                        break;
                    default: break;
                }

            }
            if(tempString!='')
                tempArray.push(tempString);

            const answerList = tempArray.map((v)=>{
                return {'surAns_Content':v}
            })

            if(UpdateKey){ // 수정 버튼 클릭 ----------------------------------------------------------------------------
                const obj = submitOBJ(e, question_ans, question, day, Sur_Publish, url);
                console.log("수정 데이터", obj);

                modifySurveyAPI(surveykey, obj)
                    .then(res=>console.log("수정 성공..?", res))
                    .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
                wayBackMySurvey();
            }else{ // 질문 응답 버튼 클릭 시 ---------------------------------------------------------------------------------------------------------------------------
                postSurveyAPI(surveykey,{"age":sexAge.age, "gender":sexAge.sex, "answerList":[...answerList]})
                    .then(res => console.log("제출 성공..?",res))
                    .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
            }
            
            submitCheck.current = false;
        }
        setActiveStep(activeStep + 1); // 다음 페이지로 이동
    }

    const nextPage = () => dispatch(beforeAction({age:age,sex:sex}));

    const wayBackHome = () =>{
        ErrorSweet('success', null, "참여 완료", "메인 페이지로 이동합니다.", null)
        .then(() => history.push('/'));
    }

    const wayBackMySurvey = () => {
        ErrorSweet('success', null, "완료", "내 설문지로 이동합니다.", null)
        .then(() => history.goBack());
    }

    return (
        <>
            <SurveySubmit 
                steps={steps}
                getStepContent={getStepContent}
                activeStep={activeStep}
                lastSubmit={lastSubmit}
                nextPage={nextPage}
                wayBackHome={wayBackHome}
                UpdateKey={UpdateKey}
                ReadOnlyState={ReadOnlyState}
                realReadState={realReadState}
            />   
        </>
    );
};

export default SurveySubmitComp;