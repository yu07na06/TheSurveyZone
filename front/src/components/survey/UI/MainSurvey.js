import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, TextField } from '@mui/material';
import SubjectiveComp from '../comp/SubjectiveComp';
import MultipleChoiceComp from '../comp/MultipleChoiceComp';
import LinearMagnificationComp from '../comp/LinearMagnificationComp';

const MainSurvey = ({theme, surveyReqForm, }) => {
    return (
        <>
        {surveyReqForm&&
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                    <Paper levation={3} sx={{ bgcolor: '#C9CBE0', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            설문지
                        </Typography><br/><br/>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label={surveyReqForm.sur_StartDate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label={surveyReqForm.sur_EndDate}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label={surveyReqForm.sur_State===0?"진행전":(surveyReqForm.sur_State===1?"진행중":"마감")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label={surveyReqForm.sur_Title}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label={surveyReqForm.sur_Content}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="태그아직없음"
                                />
                            </Grid>
                        </Grid>
                        <hr/>
                            {surveyReqForm.questionList.map((value)=>{
                                switch(value.surQue_QType){
                                    case 0: // 주관식
                                        return <SubjectiveComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null}/>
                                    case 1: // 객관식
                                        return <MultipleChoiceComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null} />
                                    case 2: // 선형배율
                                        return <LinearMagnificationComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null} />
                                    default: break;
                                }
                                console.log("질문타입 확인", value);
                            })}
                        </Paper>    
                    </Container>
                </ThemeProvider>
            }
        </>
  );
};

export default MainSurvey;