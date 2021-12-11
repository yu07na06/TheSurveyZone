import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import ErrorSweet from '../../common/modules/ErrorSweet';
import Result from '../UI/Result';

const ResultComp = ({surveykey}) => {
    const [result, setResult]=useState("");
    const [chartState, setChartState] = useState();
    const history = useHistory();
    
    useEffect(()=>{
        resultSurveyAPI(surveykey)
          .then(res=>{setResult(res.data)})
    },[])

    const wayBackMySurvey = () => {
      ErrorSweet('success', null, "완료", "내 설문지로 이동합니다.", null)
        .then(() => history.goBack());
    }

    return (
        <>
            <Result 
              result={result} 
              wayBackMySurvey={wayBackMySurvey}
              chartState={chartState}
              setChartState={setChartState}
            />
        </>
    );
};

export default ResultComp;