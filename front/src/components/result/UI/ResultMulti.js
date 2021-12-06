import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import BarChart from '../charts/BarChart';
import DoughnutChart from '../charts/DoughnutChart';
import LineChart from '../charts/LineChart';
import ToggleBtn from '../ToggleBtn';
import { Text } from '../comp/ResultMultiComp';

const ResultMulti = ({ index, result, chartState, resultKeys, setChartState }) => {
    return (
        <>
            <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor:'#E0ECF8' }}>
                <Grid container spacing={2}>
                    <Grid container justifyContent="center">
                        <Grid item xs={11}>
                            <Paper elevation={1} sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 2 } }}>
                                <TextField fullWidth label="질문명" value={result&&result.questionList[index].surQue_Content}  variant="standard"  focused va InputProps={{ readOnly: true}} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#A9D0F5', my: { xs: 1 }, p: { xs: 2 } }}>
                            <Text result={result.resultMap} index={index} flag={"보기"} resultKeys={resultKeys} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#81BEF7', my: { xs: 1 }, p: { xs: 2 } }}>
                            <Text result={result.resultMap} index={index} flag={"결과"} resultKeys={resultKeys} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} textAlign="right">
                        <ToggleBtn fullWidth chartState={chartState} setChartState={setChartState} />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#58ACFA', p: { xs: 2 } }}>
                            {
                                (() => {
                                    switch (chartState) {
                                        case "BarChart":
                                            return <BarChart data={result.resultMap[index]} />
                                        case "DoughnutChart":
                                            return <DoughnutChart data={result.resultMap[index]} />
                                        case "LineChart":
                                            return <LineChart data={result.resultMap[index]} />
                                        default:
                                            break;
                                    }
                                })()
                            }
                            {/* <BarChart data={result.resultMap[index]}/>
                            <DoughnutChart data={result.resultMap[index]} /> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};


export default ResultMulti;