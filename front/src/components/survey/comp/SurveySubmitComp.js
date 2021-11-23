import { Typography } from '@mui/material';
import React from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { getSurvey as getSurveyAPI } from '../../../lib/api/survey';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeAction, submitAction } from '../../../modules/submitReducer';

const SurveySubmitComp = ({surveykey}) => {

    const sss = useSelector(state=>state.submitReducer.beforeData)
    useEffect(()=>{
        console.log("제발 제발 제발 제발 ㅅㅂ 제발",sss);
    },[sss])
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['데이터 수집', '설문지', '제출 완료'];
    const [surveyReqForm, setSurveyReqForm] = useState(null);
    const dispatch = useDispatch()
    useEffect(()=>{
        getSurveyAPI(surveykey)
           .then(res =>setSurveyReqForm(res.data))
           .catch(err => console.log(err));
   },[surveykey])


   const [sex,setSex] = useState();
   const [age,setAge] = useState();
    const getStepContent = (step, setAge, setSex) => {
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
        const aa = data.get('answer')
        const bb = data.get('연령대')
        const cc = data.get("gender")
        console.log("주관식 답변 : ", aa);
        console.log("나이대를 보여다오!! : ", bb);
        console.log("너의 성별을 보여다오!! : ", cc);
        
    }
    const nextPage = () => {
        console.log("나를 눌렀느냐? 나는 다음이란다!");
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