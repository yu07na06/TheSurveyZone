import { createTheme } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getSurvey as getSurveyAPI } from '../../../lib/api/survey';
import MainSurvey from '../UI/MainSurvey';

const MainSurveyComp = ({surveykey}) => {
    // const [surveyReqForm, setSurveyReqForm] = useState(null);
    console.log("여기는 메인!! key", surveykey.sur_ID);

    // useEffect(()=>{
    //      getSurveyAPI(surveykey)
    //         .then(res =>setSurveyReqForm(res.data))
    //         .catch(err => console.log(err));
    // },[surveykey])

    const theme = createTheme();

    return (
        <>
            <MainSurvey 
                theme={theme}
                surveyReqForm={surveykey}
            />
        </>
    );
};

export default MainSurveyComp;