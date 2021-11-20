import React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';

const Subjective = ({number, deleteQue,  }) => {
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}><br/>
                <Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '92%' }} defaultChecked color="secondary" />
                <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button><br/>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name={`SurQue_Content${number}`}
                    id={`SurQue_Content${number}`}
                    label={`주관식${number}`}
                    autoComplete="userId"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Subjective;