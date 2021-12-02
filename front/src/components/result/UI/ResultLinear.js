import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import BarChart from '../charts/BarChart';
import DoughnutChart from '../charts/DoughnutChart';
import LineChart from '../charts/LineChart';
import ToggleBtn from '../ToggleBtn';

const ResultLinear = ({ value, index, result, makeCircle , chartState, setChartState}) => {
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
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#C4F2CE', my: { xs: 1 }, p: { xs: 2 } }}>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item xs={2}>
                                    <TextField label="시작" variant="standard"  value={value.selectList[0].surSel_Content} InputProps={{ readOnly: true}}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container justifyContent="center">
                                        {makeCircle.map(v=>v)}
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField label="끝" variant="standard"  value={value.selectList[2].surSel_Content} InputProps={{ readOnly: true}}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs = {12}  style={{paddingBottom:"0px"}} >
                        <Grid container justifyContent="flex-end">
                            <ToggleBtn chartState={chartState} setChartState={setChartState}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:"0px"}}>
                        <Paper elevation={3} sx={{ bgcolor: '#80CEBE', p: { xs: 2 } }}>
                        {
                                (()=>{
                                        switch(chartState){
                                            case "BarChart" : 
                                                return <BarChart data = {result.resultMap[index]} />
                                            case "DoughnutChart" :
                                                return <DoughnutChart data = {result.resultMap[index]} />
                                            case "LineChart" :
                                                return <LineChart data = {result.resultMap[index]} />
                                            default : 
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

export default ResultLinear;