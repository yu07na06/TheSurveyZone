import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import ToggleBtn from '../ToggleBtn';
import MyResponsivePie from '../charts/MyResponsivePie';
import MyResponsiveLine from '../charts/MyResponsiveLine';
import MyResponsiveBar from '../charts/MyResponsiveBar';

const ResultLinear = ({ value, index, result, makeCircle , chartState, setChartState}) => {

    const newKey = Object.keys(result.resultMap[index]);
    const newValue = Object.values(result.resultMap[index]);
    const newData = []
    for (const key in newValue) {
        newData.push({ "id":newKey[key], "value":newValue[key]});
    }

    const newKey1 = Object.keys(result.resultMap[index]);
    const newValue1 = Object.values(result.resultMap[index]);
    const newData1 = []
    for (const key in newValue1) {
        newData1.push({ "x":newKey1[key], "y":newValue1[key]});
    }
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
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#A9D0F5', my: { xs: 1 }, p: { xs: 2 } }}>
                            <Grid container justifyContent="center" spacing={2}>
                                <Grid item xs={6}textAlign="left">
                                    <TextField label="시작" variant="standard"  value={value.selectList[0].surSel_Content} InputProps={{ readOnly: true}}/>
                                </Grid>
                                <Grid item xs={6}textAlign="right">
                                    <TextField label="끝" variant="standard"  value={value.selectList[2].surSel_Content} InputProps={{ readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center">
                                        {makeCircle.map(v=>v)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                   
                    <Grid item xs={12} textAlign="right">
                        <ToggleBtn fullWidth chartState={chartState} setChartState={setChartState} toggleValue={["Bar", "Doughnut", "Line"]}/>
                    </Grid>

                    <Grid item xs={12} style={{paddingTop:"0px"}}>
                        <Paper elevation={3} sx={{ bgcolor: '#58ACFA', p: { xs: 2 } }}>
                            <Paper elevation={3}>
                                <div style={{ height: 350 }}>
                                    {
                                        (() => {
                                            switch (chartState) {
                                                case "Doughnut":
                                                    return <MyResponsivePie data={newData} />;
                                                case "Line":
                                                    return <MyResponsiveLine data={[{ "id":'결과', "data":newData1}]} />;
                                                default: // Bar
                                                    return <MyResponsiveBar data={newData}/>;
                                            }
                                        })()
                                    }
                                    {/* <BarChart data={result.resultMap[index]}/>
                                    <DoughnutChart data={result.resultMap[index]} /> */}
                                </div>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ResultLinear;