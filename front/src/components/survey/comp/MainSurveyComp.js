import { createTheme } from '@mui/material/styles';
import React from 'react';
import MainSurvey from '../UI/MainSurvey';

const MainSurveyComp = ({surveyReqForm}) => {
    const theme = createTheme();
    return (
        <>
            <MainSurvey 
                theme={theme}
                surveyReqForm={surveyReqForm}
            />
        </>
    );
};

export default MainSurveyComp;