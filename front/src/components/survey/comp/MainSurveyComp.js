import { createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
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