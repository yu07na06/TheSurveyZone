import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import BarChart from '../charts/BarChart';

const ResultLinear = ({ value, index, result, makeCircle }) => {
    console.log("확인", result.resultMap[index]);
    
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
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#80CEBE', p: { xs: 2 } }}>
                            <BarChart data={result.resultMap[index]}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ResultLinear;