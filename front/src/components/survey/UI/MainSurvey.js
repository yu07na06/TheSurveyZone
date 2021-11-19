import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Grid, TextField } from '@mui/material';
import Radio from "@mui/material/Radio";
import { useEffect } from 'react/cjs/react.development';

const MainSurvey = ({theme,surveyReqForm}) => {

      console.log(surveyReqForm.sur_ID);
    // console.log(typeof surveyReqForm);
    // console.log("surveyReqForm", surveyReqForm);
    // const a = {b : "b"};
    // console.log(a);
    // console.log(typeof a);
  // console.log(a["sur_ID"]);
  // console.log(a.["sur_ID"]);
  // console.log("surveyReqForm", surveyReqForm);
  //console.log(JSON.parse(JSON.stringify(surveyReqForm)));
  // console.log("child", surveyReqForm["sur_StartDate"]);
  // console.log("child", surveyReqForm.surveyReqForm);
  return (
    <>
      <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                    <Paper elevation={3} sx={{ bgcolor: '#C9CBE0', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            설문지
                        </Typography><br/><br/>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    // label={surveyReqForm}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="마감날짜다."
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="진행상태다."
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="제목이다."
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="본문이다."
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="태그다."
                                />
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container spacing={2}>
                            {/*객관식 형태*/}
                            <Grid item xs={12}>
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                label="객관식 질문이다."
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                label="최대개수이다."
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                variant="standard"
                                                label="보기1이다.."
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                variant="standard"
                                                label="보기2이다.."
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>


                                {/*주관식 형태*/}
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                label="주관식 질문이다."
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>


                                {/*선형배율 형태*/}
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                label="선형배율 질문이다."
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                disabled
                                                label="최소값."
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            {/* <Radio {...controlProps("a")} size="small" />
                                            <Radio {...controlProps("b")} />
                                            <Radio
                                                {...controlProps("c")}
                                                sx={{
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: 28
                                                }
                                                }}
                                            />
                                            <Radio
                                                {...controlProps("d")}
                                                sx={{
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: 35
                                                }
                                                }}
                                            />
                                            <Radio
                                                {...controlProps("e")}
                                                sx={{
                                                    "& .MuiSvgIcon-root": {
                                                        fontSize: 40
                                                }
                                                }}
                                            /> */}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                disabled
                                                label="최대값."
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, ml: 1 ,left: '90%'}}
                            >
                            확인
                        </Button>
                    </Paper>
                </Container>
            </ThemeProvider>
    </>
  );
};

export default MainSurvey;