import React, { useEffect, useState } from 'react';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import Result from '../UI/Result';
import ErrorSweet from '../../common/modules/ErrorSweet';

const ResultComp = ({surveykey}) => {

    const [result, setResult]=useState("")
    
    useEffect(()=>{
        resultSurveyAPI(surveykey)
        .then(res=>{setResult(res.data)})
        .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message));
    },[])

    return (
        <>
            <Result result={result}/>
        </>
    );
};

export default ResultComp;