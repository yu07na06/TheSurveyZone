import React, { useEffect, useState } from 'react';
import ResultMulti from '../UI/ResultMulti';
import { Grid, Typography } from '@mui/material';

const ResultMultiComp = ({result, index,}) => {

    const resultKeys = Object.keys(result.resultMap[index])
    const [chartState, setChartState] = useState();

    useEffect(()=>{
        setChartState("BarChart")
    },[])

    return (
        <div>
            <ResultMulti setChartState={setChartState} chartState={chartState} index={index} result={result} resultKeys={resultKeys}/>
        </div>
    );
};

export const Text = ({result, index, flag, resultKeys}) => {
    return(
        <>
            {resultKeys.map((_,idx)=>  
                <Typography variant="h6" color="initial">
                     {`${flag}${idx+1} : ${flag=="보기"?resultKeys[idx]:result[index][resultKeys[idx]]}`} 
                </Typography>
            )}
        </>
    )
}

export default ResultMultiComp;