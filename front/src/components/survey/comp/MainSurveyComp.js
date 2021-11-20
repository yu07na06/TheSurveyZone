import { createTheme } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getSurvey as getSurveyAPI } from '../../../lib/api/survey';
import MainSurvey from '../UI/MainSurvey';

const MainSurveyComp = ({surveyReqForm}) => {
    console.log("여기는 메인!! key", surveyReqForm);

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