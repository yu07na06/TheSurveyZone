import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ResultLinearComp from '../comp/ResultLinearComp';
import ResultSubjective from './ResultSubjective';
import { TextField, Grid } from '@mui/material';
import ResultMultiComp from '../comp/ResultMultiComp';
import OTL from '../../common/UI/OTL';

const Result = ({result}) => {
    result&&console.log("result : ",result.answerList[0].length);
    result&&console.log(" result.answerList&&(result.answerList[0].length) : ", result.answerList&&(result.answerList[0].length));
    return (
        <>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ bgcolor: '#EFF4E7', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {
                        result.answerList&&(result.answerList[0].length===0)? 
                            <OTL />
                        :   
                            <div>
                                <Grid container justifyContent="center" spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="center">
                                            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="시작날짜" value={result.sur_StartDate} InputProps={{ readOnly: true}} color="success" focused/>
                                            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="마감날짜" value={result.sur_EndDate} InputProps={{ readOnly: true}} color="success"focused/>
                                            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="진행상태" value={result.sur_State===1?"진행중":"마감"} InputProps={{ readOnly: true}} color="success"focused/>
                                            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="공개여부" value={result.sur_Publish?"공개":"비공개"} InputProps={{ readOnly: true}} color="success" focused/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField fullWidth label="제목" value={result.sur_Title} InputProps={{ readOnly: true}} color="success" focused/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField label="태그" value={result.sur_Tag} InputProps={{ readOnly: true}} color="success" focused/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="본문" value={result.sur_Content} InputProps={{ readOnly: true}} color="success" focused/>
                                    </Grid>
                                </Grid>
                                {result && result.questionList.map((value, index) => {
                                    switch (value.surQue_QType) {
                                        case 0: // 주관식
                                            return <ResultSubjective result={result} index={index}/>
                                        case 1: // 객관식
                                            return <ResultMultiComp index={index} result={result}/>
                                            // return <ResultMulti index={index} result={result}/>
                                        case 2: // 선형배율
                                            return <ResultLinearComp value={value} index={index} result={result}/>
                                        default:
                                            break;
                                        }
                                    })
                                }
                            </div>
                    } 
                </Paper>
            </Container>
        </>
    );
};

export default Result;


{/* <Grid container justifyContent="center" spacing={3}>
    <Grid item xs={12}>
        <Grid container justifyContent="center">
            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="시작날짜" value={result.sur_StartDate} InputProps={{ readOnly: true}} color="success" focused/>
            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="마감날짜" value={result.sur_EndDate} InputProps={{ readOnly: true}} color="success"focused/>
            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="진행상태" value={result.sur_State===1?"진행중":"마감"} InputProps={{ readOnly: true}} color="success"focused/>
            <TextField sx={{ my: { xs: 1, md: 2 }, p: { xs: 1 } }} label="공개여부" value={result.sur_Publish?"공개":"비공개"} InputProps={{ readOnly: true}} color="success" focused/>
        </Grid>
    </Grid>
    <Grid item xs={10}>
        <TextField fullWidth label="제목" value={result.sur_Title} InputProps={{ readOnly: true}} color="success" focused/>
    </Grid>
    <Grid item xs={2}>
        <TextField label="태그" value={result.sur_Tag} InputProps={{ readOnly: true}} color="success" focused/>
    </Grid>
    <Grid item xs={12}>
        <TextField fullWidth label="본문" value={result.sur_Content} InputProps={{ readOnly: true}} color="success" focused/>
    </Grid>
</Grid>
{result && result.questionList.map((value, index) => {
    switch (value.surQue_QType) {
        case 0: // 주관식
            return <ResultSubjective result={result} index={index}/>
        case 1: // 객관식
            return <ResultMultiComp index={index} result={result}/>
            // return <ResultMulti index={index} result={result}/>
        case 2: // 선형배율
            return <ResultLinearComp value={value} index={index} result={result}/>
        default:
            break;
        }
    })
} */}