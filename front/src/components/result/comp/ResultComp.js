import React, { useEffect, useState } from 'react';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import Result from '../UI/Result';

const ResultComp = ({surveykey}) => {

    const [result, setResult]=useState("")

    useEffect(()=>{
        console.log("surveykey: ",surveykey);
        resultSurveyAPI(surveykey)
        .then(res=>{console.log("성공"); setResult(res.data)})
        .catch(err=>console.log("실패", err));
    },[])

    return (
        <>
            <Result result={result}/>
        </>
    );
};

export default ResultComp;