import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import BarChart from '../charts/BarChart';
import DoughnutChart from '../charts/DoughnutChart';

const Text = ({result, index, flag, resultKeys}) => {
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

const ResultMulti = ({ value, index, result, }) => {
    console.log("전체 result : ", result);
    const resultKeys = Object.keys(result.resultMap[index])
    return (
        <>
            <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                    <Grid container justifyContent="center">
                        <Grid item xs={9}>
                            <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <TextField fullWidth label="질문명" value={result&&result.questionList[index].surQue_Content}  variant="standard" color="success" focused va InputProps={{ readOnly: true}} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#C4F2CE', my: { xs: 1 }, p: { xs: 2 } }}>
                            {/* 보기 리스트를 생성하기 위함*/}
                            <Text result={result.resultMap} index={index} flag={"보기"} resultKeys={resultKeys}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#9FDEBD', my: { xs: 1 }, p: { xs: 2 } }}>
                            {/* 결과 리스트를 생성하기 위함*/}
                            <Text result={result.resultMap} index={index} flag={"결과"} resultKeys={resultKeys}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#80CEBE', p: { xs: 2 } }}>
                            <BarChart data={result.resultMap[index]}/>
                            <DoughnutChart data={result.resultMap[index]} />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};


export default ResultMulti;