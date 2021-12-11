import { Button, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import ReqSwitch from '../../common/modules/ReqSwitch';

const Subjective = ({ 
    ReadOnlyState, 
    ReadOnlyData, 
    UpdateKey, 
    realReadState, 
    number, 
    updateData, 
    setUpdateData, 
    deleteQue, }) => {
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2} alignItems="center"><br />
                {(ReadOnlyState && !UpdateKey) && 
                    <Grid item xs={12} >
                        <Typography style={{ color: "red" }} >
                            {ReadOnlyData.surQue_Essential && "*필수항목"}
                        </Typography>
                    </Grid>
                }
                {(!ReadOnlyState || UpdateKey) &&
                    <>
                        <Grid item xs={9}>
                            <ReqSwitch number={number} flag={"qeustion"} essential={ReadOnlyData&&ReadOnlyData.surQue_Essential}/>

                        </Grid>
                        <Grid item xs={3} textAlign="right">
                            <Button id={number} onClick={(e) => deleteQue(e)}>삭제</Button>
                        </Grid>
                    </>
                }
                <Grid item xs={12}>
                {UpdateKey||!ReadOnlyState?
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`주관식${number}`}
                        autoComplete="userId"
                        onChange={(e) => setUpdateData(e.target.value)}
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        value={updateData}
                    />
                :
                    <Typography component="h6" variant="h6" >{updateData}</Typography>
                }
                </Grid>

                {(ReadOnlyState && !UpdateKey) &&
                    <Grid item xs={12}>
                        <TextField
                            name={`SurQueAnswer_${number}`}
                            id={`SurQueAnswer_${number}`}
                            variant="outlined"
                            required={ReadOnlyData.surQue_Essential}
                            fullWidth
                            InputProps={{ readOnly: (realReadState) }}
                        />
                    </Grid>
                }
            </Grid>
        </Paper>
    );
};

export default Subjective;