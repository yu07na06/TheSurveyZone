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
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

const SurveySubmit = ({steps, getStepContent, theme, activeStep, handleNext, lastSubmit, nextPage}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="form" onSubmit={(e)=>lastSubmit(e)}>
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
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Survey
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length-1 ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    설문 감사합니다 :)
                                </Typography>
                            <Button
                                    variant="contained"
                                    sx={{ mt: 3, ml: 1 ,left: '40%' }}
                                >
                                <Link to='/' style={{textDecoration:'none', color:'white'}}>홈으로</Link>
                                </Button>
                            </React.Fragment>
                            ) : (activeStep === steps.length-2) ? (
                                <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                    설문 제출하기
                                    </Button>
                                </Box>
                            </React.Fragment>
                                ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        onClick={e=>{handleNext(); nextPage(e);}}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                    {activeStep === steps.length - 1 ? '완료' : '다음'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                            )}
                        </React.Fragment>
                        </Paper>
                    </Container>
                 </Box>
            </ThemeProvider>
        </>
    );
};
export default SurveySubmit;