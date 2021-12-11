import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ResultDetailChart from '../UI/ResultDetailChart';
import ResultMulti from '../UI/ResultMulti';

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
    return (
        <>
            {resultKeys.map((_, idx) =>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" color="initial">
                        <div>
                        {`${flag}${idx + 1} : ${flag == "보기" ? resultKeys[idx] : result.resultMap[index][resultKeys[idx]] }`}
                        {flag=="결과"&&<ResultDetailChart resultData={result.selectResultMap[index][resultKeys[idx]]} />}
                        </div>
                    </Typography>
                </Grid>
            )}
        </>
    )
}

export default ResultMultiComp;