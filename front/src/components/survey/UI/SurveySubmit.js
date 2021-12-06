import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const SurveySubmit = ({ steps, getStepContent, activeStep, lastSubmit, nextPage, wayBackHome, UpdateKey, ReadOnlyState, realReadState, }) => {
    return (
        <>
            <Box component="form" onSubmit={(e) => lastSubmit(e)} >
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                </AppBar>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}
                    {/*(찐보기 상태를 요구할때) ReadOnlyPage에서 내려왔을때, ReadOnlyState=true, UpdateKey=false 일떄? steps를 보여주지않는다! */}
                    {(!ReadOnlyState && !UpdateKey) &&
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h4" align="center">
                                    Survey
                                </Typography>
                            </Grid>
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                    }

                    <React.Fragment>
                        {/* step : before > main > final */}
                        {getStepContent(activeStep)}

                        <Grid item xs={12} textAlign="right">
                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={e => {
                                        activeStep === 0 && nextPage(e);
                                        activeStep === 2 && wayBackHome();
                                    }}
                                    sx={{ mt: 3, ml: 1 }}
                                >

                                    {/* 내 설문지에서 수정 버튼 클릭 시, UpdateKey=true 이므로 수정 완료 버튼이 출력 */}
                                    {UpdateKey ? '수정완료' :
                                        (activeStep === 0 ? '다음' :
                                            (activeStep === 1 ? (realReadState ? '확인' : '제출') : '완료'))
                                    }
                                </Button>
                            </Box>
                        </Grid>
                    </React.Fragment>
                </Container>
            </Box>
        </>
    );
};
export default SurveySubmit;