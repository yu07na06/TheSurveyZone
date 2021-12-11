import { Typography } from '@mui/material';
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
    const [day, setDay] = useState([new Date(), new Date()]);
    const [tag, setTag] = useState(null);
    const [tags, setTags] = useState(null);
    const [question, setQuestion] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [check, setCheck] = useState({});
    const [delIndex, setDelIndex] = useState(null);
    const [question_ans, setQuestion_Ans] = useState({});
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

    useEffect(()=>{
        if(UpdateKey){ 
            surveyModifyCheckAPI(surveykey)
                .catch(err=>{ ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null).then(() => history.push('/')) })
            
            submitCheck.current = true
            setActiveStep(1);
            getTagsAPI()
                .then(res=> setTags(res.data))
                .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
        }
    },[])

    useEffect(()=>{
        setCheckboxlistState(surAns_Content)
    },[surAns_Content])

    useEffect(() => { 
        if(!UpdateKey&&ReadOnlyState){
            setActiveStep(1);
        }
        getSurveyAPI(surveykey)
           .then( res => { setSurveyReqForm(res.data); setSur_Publish(!res.data.sur_Publish) })
   },[surveykey])

   useEffect(()=>{
       if(surveyReqForm){
           setDay([new Date(surveyReqForm.sur_StartDate), new Date(surveyReqForm.sur_EndDate)]);
           count.current = surveyReqForm.questionList.length;

           let newOrderQuestion = surveyReqForm.questionList.map((value, index) => {
                switch(value.surQue_QType){
                    case 0:
                        return <div key={index}><SubjectiveComp key="Sub" ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} realReadState={realReadState}/></div>;    
                    case 1:
                        return <div key={index}><MultipleChoiceComp key="Mul" ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} checkboxlistState={checkboxlistState} realReadState={realReadState} /></div>;
                    case 2:
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
                break;
        }
    }
    
    useEffect(()=>{
        setQuestion_Ans({...question_ans, ...check});
    },[check]);

    useEffect(()=>{
        const newQuestionList = question.filter((value)=> {
            return value.key!==delIndex
        } );
        setQuestion(newQuestionList);

        for (const key in question_ans) {
            if(key == delIndex)
                delete question_ans[key];
        }
    },[delIndex]);


    const handleClose = (e) => {
        setAnchorEl(null);
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
                    case 'SurQueAnswer':
                        if(tempString!="" || splitValue[1] != OrderNumber){
                            tempArray.push(tempString);
                            tempString = "";
                            OrderNumber++;
                        }
                        tempArray.push(temp);
                        OrderNumber++;
                        break;

                    case 'SurQueCheck':
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
                    case 'radio':
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

            if(UpdateKey){
                const obj = submitOBJ(e, question_ans, question, day, Sur_Publish, url);
                modifySurveyAPI(surveykey, obj)
                    .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));

                wayBackMySurvey();
            }else{
                postSurveyAPI(surveykey,{"age":sexAge.age, "gender":sexAge.sex, "answerList":[...answerList]})
                    .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
            }
            
            submitCheck.current = false;
        }
        setActiveStep(activeStep + 1);
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