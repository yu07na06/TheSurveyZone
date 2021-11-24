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

    // const lastSubmit = (e) => {
    //     e.preventDefault();

    //     const data = new FormData(e.currentTarget);

    //     let tempArray = [];
    //     let temp = '';
    //     let OrderNumber = null;
    //     let newIndex = 0;

        // surAns_Content.map((value, index) =>{
        //     let newValue=value.split('_');

        //     temp = data.get(value);
        //     switch(newValue[0]){
        //         case 'SurQueAnswer': // 주관식
        //             tempArray.push(temp);
        //             newIndex++;
        //             break;
                    
        //         case 'SurQueCheck': // 객관식
        //             if(newValue[2]==='0') {
        //                 newIndex++;
        //                 OrderNumber=newValue[1]; // 같은 컴포넌트만 비교하기 위해
        //                 tempArray.push('');
        //             }
        //             if(temp !== null){
        //                 if(OrderNumber===newValue[1]){
        //                     tempArray[newIndex]+=temp+'Θ'
        //                 }
        //             }
        //             break;
                    
        //         case 'radio': // 선형배율
        //             temp=temp.split('_')[2]; // temp: radio_2_5
        //             tempArray.push(temp);
        //             newIndex++;
        //             break;
        //         default: break;
        //     }
        // })
        // console.log("최종답안", tempArray);
    // }
    const lastSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        let tempArray = [];
        let temp = '';
        let OrderNumber = 0;
        let tempString = "";
        console.log("surAns_Content", surAns_Content);




        surAns_Content.map((value, index) =>{
            let newValue=value.split('_');
            console.log("잘게 잘게 자른애들", newValue);

            temp = data.get(value);
            switch(newValue[0]){
                case 'SurQueAnswer': // 주관식
                if(tempString!=""){
                    tempArray.push(tempString);
                    OrderNumber++;
                    tempString = "";    
                }
                    tempArray.push(temp);
                    break;

                case 'SurQueCheck': // 객관식
                    if(temp != ""){
                        if(newValue[1] != OrderNumber){
                            tempArray.push(tempString);
                            tempString="";
                        }
                        tempString += temp + 'Θ';   
                    }
                    break;

                case 'radio': // 선형배율
                if(tempString!=""){
                tempArray.push(tempString);    
                OrderNumber++;
                tempString = "";
                }
                value = temp.split('_');
                    tempArray.push(value[2]);
                    break;
                default: break;
            }
        })
        if(tempString!="")
            tempArray.push(tempString);
        console.log("최종답안", tempArray);
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