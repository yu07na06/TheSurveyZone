import React, { useEffect, useState } from 'react';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import Result from '../UI/Result';
import ErrorSweet from '../../common/modules/ErrorSweet';
import { useHistory } from 'react-router';

const ResultComp = ({surveykey}) => {
    const [result, setResult]=useState("")
    const history = useHistory();
    
    useEffect(()=>{
        resultSurveyAPI(surveykey)
        .then(res=>{setResult(res.data)})
        .catch(err=> console.log(err));
        // .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
    },[])

    const wayBackMySurvey = () => {
        ErrorSweet('success', null, "완료", "내 설문지로 이동합니다.", null)
        .then(() => history.goBack());
    }

    return (
        <>
            <Result result={result} wayBackMySurvey={wayBackMySurvey} />
        </>
    );
};

export default ResultComp;