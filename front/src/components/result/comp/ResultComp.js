import React from 'react';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import Result from '../UI/Result';

const ResultContainer = ({surveykey}) => {
    console.log("surveykey: ",surveykey);
    resultSurveyAPI(surveykey)
    .then(res=>console.log("성공", res.data))
    .catch(err=>console.log("실패", err));
    return (
        <>
            <Result />
        </>
    );
};

export default ResultContainer;