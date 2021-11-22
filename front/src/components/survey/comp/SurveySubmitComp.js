import { Typography } from '@mui/material';
import React from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { getSurvey as getSurveyAPI } from '../../../lib/api/survey';
import { useState } from 'react';

const SurveySubmitComp = ({surveykey}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['데이터 수집', '설문지', '제출 완료'];
    const [surveyReqForm, setSurveyReqForm] = useState(null);

    useEffect(()=>{
        getSurveyAPI(surveykey)
           .then(res =>setSurveyReqForm(res.data))
           .catch(err => console.log(err));
   },[surveykey])

    //const surveyReqFormTest = {"_id":"619b39da46f35902f0cc7757","questionList":[{"SurQue_Content":"웅아 이건 객관식 0번이야, 선택지는 4개고, 중복답변은 3이라구","SurQue_QType":1,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"0"},"selectList":[{"SurSel_Content":"선택지 0-0","SurSel_Order":{"$numberLong":"0"}},{"SurSel_Content":"선택지 0-1","SurSel_Order":{"$numberLong":"1"}},{"SurSel_Content":"선택지 0-2","SurSel_Order":{"$numberLong":"2"}},{"SurSel_Content":"선택지 0-3","SurSel_Order":{"$numberLong":"3"}}],"answerList":[]},{"SurQue_Content":"웅아 이건 객관식 1번이야, 선택지는 3개고, 중복답변은 2이라구","SurQue_QType":1,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"1"},"selectList":[{"SurSel_Content":"선택지 1-0","SurSel_Order":{"$numberLong":"0"}},{"SurSel_Content":"선택지 1-1","SurSel_Order":{"$numberLong":"1"}},{"SurSel_Content":"선택지 1-2","SurSel_Order":{"$numberLong":"2"}}],"answerList":[]},{"SurQue_Content":"주관식 2번이야 난 아무것도 없어","SurQue_QType":0,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"2"},"selectList":[{"SurSel_Content":""}],"answerList":[]},{"SurQue_Content":"주관식 3번이야. 가진게 없어.. ","SurQue_QType":0,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"3"},"selectList":[{"SurSel_Content":""}],"answerList":[]},{"SurQue_Content":"선형배율 4번이야. 시작은 행복이고, 끝은 불행으로 (0~4)","SurQue_QType":2,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"4"},"selectList":[{"SurSel_Content":"행복","SurSel_Order":{"$numberLong":"0"}},{"SurSel_Content":"0","SurSel_Order":{"$numberLong":"1"}},{"SurSel_Content":"불행","SurSel_Order":{"$numberLong":"2"}},{"SurSel_Content":"6","SurSel_Order":{"$numberLong":"3"}}],"answerList":[]},{"SurQue_Content":"선형배율 5번이야. 시작은 커피이고, 끝은 유자차야 (1~5)","SurQue_QType":2,"SurQue_MaxAns":{"$numberLong":"3"},"SurQue_Order":{"$numberLong":"5"},"selectList":[{"SurSel_Content":"커피","SurSel_Order":{"$numberLong":"0"}},{"SurSel_Content":"1","SurSel_Order":{"$numberLong":"1"}},{"SurSel_Content":"유자차","SurSel_Order":{"$numberLong":"2"}},{"SurSel_Content":"5","SurSel_Order":{"$numberLong":"3"}}],"answerList":[]}]}


    const getStepContent = (step) => {
        switch (step) {
        case 0:
            return <BeforeSurveyComp />;
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
            />   
        </>
    );
};

export default SurveySubmitComp;