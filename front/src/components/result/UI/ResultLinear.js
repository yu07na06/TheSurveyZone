import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const ResultLinear = ({ value, index, result, makeCircle }) => {
    
    return ( 
        <>
            <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="제목" variant="standard" color="success" value={value.surQue_Content}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#C4F2CE', my: { xs: 1 }, p: { xs: 2 } }}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <TextField label="시작" value={value.selectList[0].surSel_Content}/>
                                </Grid>
                                <Grid item xs={10}>
                                    {makeCircle.map(v=>v)}
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField label="끝" value={value.selectList[2].surSel_Content}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ bgcolor: '#80CEBE', p: { xs: 2 } }}>
                            여기는 그래프가 들어가는 곳입니다
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ResultLinear;