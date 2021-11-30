import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

const ResultMulti = ({ value, index, result, }) => {
    return (
        <>
            <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="제목" variant="standard" color="success" focused value={value.surQue_Content}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#C4F2CE', my: { xs: 1 }, p: { xs: 2 } }}>
                            {result.answerList[index]}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ bgcolor: '#9FDEBD', my: { xs: 1 }, p: { xs: 2 } }}>
                            결과입니다
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

export default ResultMulti;