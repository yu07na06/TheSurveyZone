import { Typography } from '@mui/material';
import React from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { getSurvey as getSurveyAPI, postSurvey as postSurveyAPI } from '../../../lib/api/survey';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeAction, submitAction } from '../../../modules/submitReducer';

const SurveySubmitComp = ({surveykey}) => {
    const sexAge = useSelector(state=>state.submitReducer.beforeData)
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['데이터 수집', '설문지', '제출 완료'];
    const [surveyReqForm, setSurveyReqForm] = useState(null);
    const dispatch = useDispatch()

    useEffect(()=>{
        getSurveyAPI(surveykey)
        //    .then(res =>console.log("요청 결과: ",res.data))
           .then(res =>setSurveyReqForm(res.data))
           .catch(err => console.log(err));
   },[surveykey])


   const [sex,setSex] = useState();
   const [age,setAge] = useState();
    const getStepContent = (step) => {
        switch (step) {
        case 0:
            return <BeforeSurveyComp setAge={setAge} setSex={setSex}/>;
        case 1:
            return <MainSurveyComp surveyReqForm={surveyReqForm} />;
        case 2:
            return  finalStep();
        default:
            throw new Error('Unknown step');
        }
    }

    const finalStep = () => {
    return(
    <React.Fragment>
        <Typography variant="h5" gutterBottom>
            설문 감사합니다 :)
        </Typography>
    </React.Fragment>);
    }
    const theme = createTheme();
    
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };

    const lastSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        let tempArray = [];
        let temp = '';
        let OrderNumber = 0;
        let tempString = "";




        surAns_Content.map((value, index) =>{
            let splitValue=value.split('_');
            temp = data.get(value);
            switch(splitValue[0]){
                case 'SurQueAnswer': // 주관식
                    if(tempString!=""){
                        tempArray.push(tempString);
                        tempString = "";
                        OrderNumber++;
                    }
                    tempArray.push(temp);
                    OrderNumber++;
                    break;

                case 'SurQueCheck': // 객관식
                    console.log(splitValue, "OrderNumber : ",OrderNumber);
                    if(temp != null){
                        if(splitValue[1] != OrderNumber){
                            tempArray.push(tempString);
                            tempString="";
                            OrderNumber++;
                        }
                        tempString += temp + 'Θ';   
                    }
                    break;

                case 'radio': // 선형배율
                    if(tempString!=""){
                        tempArray.push(tempString);    
                        tempString = "";
                        OrderNumber++;
                    }
                    value = temp.split('_');
                    tempArray.push(value[2]);
                    OrderNumber++;
                    break;
                default: break;
            }
        })
        if(tempString!="")
            tempArray.push(tempString);

        const answerList = tempArray.map((v)=>{
            return {'surAns_Content':v}
        })
        console.log("보낼놈 ",answerList);

        console.log("나이",sexAge.age);
        console.log("성별",sexAge.sex);
        
        postSurveyAPI(surveykey,{"age":sexAge.age, "gender":sexAge.sex, "answerList":answerList})
        .then(res=>console.log("제출 성공..?",res))
        .catch(res=>console.log("제출 실패..?",res))
    }

    const nextPage = () => {
        dispatch(beforeAction({age:age,sex:sex}))
    }
    
    return (
        <>
            <SurveySubmit 
                steps={steps}
                getStepContent={getStepContent}
                finalStep={finalStep}
                theme={theme}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNext={handleNext}
                lastSubmit={lastSubmit}
                nextPage={nextPage}
            />   
        </>
    );
};

export default SurveySubmitComp;