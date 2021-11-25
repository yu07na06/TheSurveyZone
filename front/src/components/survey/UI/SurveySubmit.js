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
import { ThemeProvider } from '@mui/material/styles';

const SurveySubmit = ({steps, getStepContent, theme, activeStep, lastSubmit, nextPage, wayBackHome}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="form" onSubmit={(e)=>lastSubmit(e)} >
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
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={e=> {
                                        activeStep === 0 && nextPage(e);
                                        activeStep === 2 && wayBackHome();
                                    }}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                {activeStep === 0 ? '다음' : (activeStep === 1 ? '제출' : '완료')}
                                </Button>
                            </Box>
                        </React.Fragment>
                        </Paper>
                    </Container>
                 </Box>
            </ThemeProvider>
        </>
    );
};
export default SurveySubmit;