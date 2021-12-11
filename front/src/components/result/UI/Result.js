import { Button, Grid, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import React from 'react';
import OTL from '../../common/modules/OTL';
import MyResponsivePie from '../charts/MyResponsivePie';
import ResultLinearComp from '../comp/ResultLinearComp';
import ResultMultiComp from '../comp/ResultMultiComp';
import ToggleBtn from '../ToggleBtn';
import ResultSubjective from './ResultSubjective';

const Result = ({ result, wayBackMySurvey, chartState, setChartState }) => {
    const defaultImage = "https://surveyzone.s3.ap-northeast-2.amazonaws.com/static/b5e552ea-8d6b-4582-89ae-1d25c25027b8no-image.png";
    
    return (
        <>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ bgcolor: '#EFF2FB', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {
                        result.answerList && (result.answerList[0].length === 0) ?
                            <OTL />
                            :
                            <>
                                <Paper>
                                <Container sx={{bgcolor: '#E0ECF8', py:2}}>
                                <Grid container spacing={1} >
                                
                                <Grid style = {{height : 330}} item xs={12} md={12} lg={9} container spacing={1}>
                                    <Grid item xs={12} sm={9} md={9} lg={9}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="제목"
                                            value={result.sur_Title}
                                            InputProps={{ readOnly: true }}
                                            focused
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="태그"
                                            value={result.sur_Tag}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="시작날짜"
                                            value={result.sur_StartDate}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="마감날짜"
                                            value={result.sur_EndDate}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={6} sm={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="진행상태"
                                            value={result.sur_State === 1 ? "진행중" : "마감"}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={6} sm={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="공개여부"
                                            value={result.sur_Publish ? "공개" : "비공개"}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={12} sm={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            value={result.sur_Content}
                                            inputProps={{ readOnly: true }}
                                            focused
                                            sx={{ my: 1 }}
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            rowsmax={8}
                                            name="Sur_Content"
                                            id="Sur_Content"
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                    {result.sur_Img != defaultImage || result.sur_Img == "EMPTY" &&
                                            <Paper sx={{ bgcolor: '#FFF4EF' }}>
                                                <img src={result.sur_Img} alt="" />
                                            </Paper>
                                    }
                                    </Grid>

                                    </Grid>

                                <Grid item xs={12} md={12} lg={3} align='center'>

                                        <Grid container>
                                        <Grid item xs={12} textAlign="right">
                                            <ToggleBtn fullWidth chartState={chartState} setChartState={setChartState} toggleValue={["성별", "연령별"]}/>
                                        </Grid>

                                        <Grid item xs={12} >
                                            <div style={{ height : 250, width: 250 }}>
                                            {result&&
                                                ( () => {
                                                    switch(chartState){
                                                        case "연령별":
                                                            return <MyResponsivePie data={result.partList.total.reduce((acc,c,i) => { acc.push({'id':`${i+1}0대`, 'value': c }); return acc; },[]) } />
                                                            default:
                                                            return <MyResponsivePie data={[{ 'id':'남성', 'value':result.partList.남성.reduce((a,b)=>a+b) }, { 'id':'여성', 'value':result.partList.여성.reduce((a,b)=>a+b) }]} />
                                                        }
                                                    }
                                                    )()
                                                }
                                            </div>
                                        </Grid>

                                        </Grid>
                                </Grid>

                                </Grid>
                                </Container>
                                </Paper>

                                {result && result.questionList.map((value, index) => {
                                    switch (value.surQue_QType) {
                                        case 0:
                                            return <ResultSubjective result={result} index={index} />
                                        case 1:
                                            return <ResultMultiComp index={index} result={result} />
                                        case 2:
                                            return <ResultLinearComp value={value} index={index} result={result} />
                                        default:
                                            break;
                                    }
                                })}

                            </>
                    }
                    <Button variant="contained" onClick={() => wayBackMySurvey()}>확인</Button>
                </Paper>
            </Container>
        </>
    );
};

export default Result;