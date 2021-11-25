import { Typography } from '@mui/material';
import React, { useRef } from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { getSurvey as getSurveyAPI, postSurvey as postSurveyAPI } from '../../../lib/api/survey';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeAction } from '../../../modules/submitReducer';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const SurveySubmitComp = ({surveykey}) => {
    const sexAge = useSelector(state=>state.submitReducer.beforeData)
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['데이터 수집', '설문지', '제출 완료'];
    const [surveyReqForm, setSurveyReqForm] = useState(null);
    const submitCheck = useRef(false);
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        getSurveyAPI(surveykey)
           .then(res =>{ console.log("요청 결과: ",res.data); setSurveyReqForm(res.data); })
           .catch(err => console.log(err));
   },[surveykey])

   const [sex,setSex] = useState();
   const [age,setAge] = useState();

    const getStepContent = (step) => {
        switch (step) {
        case 0:
            return <BeforeSurveyComp setAge={setAge} setSex={setSex}/>;
        case 1:
            return <MainSurveyComp surveyReqForm={surveyReqForm} /> ;
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
        if (submitCheck.current === false){
            console.log("왔나");
            submitCheck.current = true
        }else{
            const data = new FormData(e.currentTarget);
                
            let tempArray = [];
            let temp = '';
            let OrderNumber = 0;
            let tempString = "";
            
            console.log("surAns_Content", surAns_Content);
            surAns_Content.map((value, index) =>{
                let splitValue=value.split('_');
                temp = data.get(value);

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
                            console.log(value2);
                            tempArray.push(value2[2]);
                            OrderNumber++;
                        }
                        break;
                    default: break;
                }
            })
            if(tempString!="")
                tempArray.push(tempString);

            const answerList = tempArray.map((v)=>{
                return {'surAns_Content':v}
            })
            console.log("tempArray:",tempArray);
            console.log("잘 있나", sexAge.age, sexAge.sex);
            postSurveyAPI(surveykey,{"age":sexAge.age, "gender":sexAge.sex, "answerList":answerList})
                .then(res=>console.log("제출 성공..?",res))
                .catch(res=>console.log("제출 실패..?",res))
            
            submitCheck.current = false;
        }
        handleNext();
    }

    const nextPage = () => {
        dispatch(beforeAction({age:age,sex:sex}))
    }

    const wayBackHome = () =>{
        Swal.fire('Way Back Home ~');
        history.push('/');
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
                lastSubmit={lastSubmit}
                nextPage={nextPage}
                wayBackHome={wayBackHome}
            />   
        </>
    );
};

export default SurveySubmitComp;