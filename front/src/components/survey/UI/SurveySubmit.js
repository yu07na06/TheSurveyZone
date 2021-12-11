import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React from 'react';

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
                <Container component="main" maxWidth="md" sx={{ mb: 4 , py : 2}}>
                    {(!ReadOnlyState && !UpdateKey) &&
                        <>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h4" align="center">
                                    Survey Submit
                                </Typography>
                            </Grid>
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </>
                    }

                    <React.Fragment>
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