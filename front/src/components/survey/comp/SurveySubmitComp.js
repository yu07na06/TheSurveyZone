import { Typography } from '@mui/material';
import React from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';

const SurveySubmitComp = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['데이터 수집', '설문지', '제출 완료'];

    const getStepContent = (step) => {
        switch (step) {
        case 0:
            return <BeforeSurveyComp />;
        case 1:
            return <MainSurveyComp />;
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