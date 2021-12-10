import React, { useEffect, useState } from 'react';
import ResultMulti from '../UI/ResultMulti';
import { Grid, Typography } from '@mui/material';
import ResultDetailChart from '../UI/ResultDetailChart';

const ResultMultiComp = ({ result, index, }) => {
    const resultKeys = Object.keys(result.resultMap[index])
    const [chartState, setChartState] = useState();

    useEffect(() => {
        setChartState("BarChart")
    }, [])

    return (
        <div>
            <ResultMulti
                setChartState={setChartState}
                chartState={chartState}
                index={index}
                result={result}
                resultKeys={resultKeys} />
        </div>
    );
};

export const Text = ({ result, index, flag, resultKeys }) => {
    // console.log("resultKeys", resultKeys);
    // console.log("Text result", result.selectResultMap[index]);
    return (
        <>
            {resultKeys.map((_, idx) =>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" color="initial">
                        <div>
                        {`${flag}${idx + 1} : ${flag == "보기" ? resultKeys[idx] : result.resultMap[index][resultKeys[idx]] }`}
                        {flag=="결과"&&<ResultDetailChart resultData={result.selectResultMap[index][resultKeys[idx]]} />}
                        {/* {flag=="결과"&&<Button id={`result_${idx+1}`} style={{paddingTop:"0px", paddingBottom:"0px"}} onClick={e=>{resultDetailChart(e)}}>보기</Button>} */}
                        </div>
                    </Typography>
                </Grid>
            )}
        </>
    )
}

export default ResultMultiComp;