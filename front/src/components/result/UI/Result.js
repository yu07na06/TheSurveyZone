import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ResultLinearComp from '../comp/ResultLinearComp';
import ResultSubjective from './ResultSubjective';
import { TextField, Grid } from '@mui/material';
import ResultMultiComp from '../comp/ResultMultiComp';
import OTL from '../../common/UI/OTL';

const Result = ({ result }) => {
    const defaultImage = "https://surveyzone.s3.ap-northeast-2.amazonaws.com/static/b5e552ea-8d6b-4582-89ae-1d25c25027b8no-image.png";
    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ bgcolor: '#EFF2FB', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {
                        result.answerList && (result.answerList[0].length === 0) ?
                            <OTL />
                            :
                            <div>
                                <Paper>
                                <Container sx={{bgcolor: '#E0ECF8', py:2}}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={9} lg={9}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            label="제목"
                                            value={result.sur_Title}
                                            InputProps={{ readOnly: true }}
                                            focused
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3} lg={3}>
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
                                    <Grid item xs={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="진행상태"
                                            value={result.sur_State === 1 ? "진행중" : "마감"}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={6} lg={3}>
                                        <TextField
                                            fullWidth
                                            label="공개여부"
                                            value={result.sur_Publish ? "공개" : "비공개"}
                                            InputProps={{ readOnly: true }}
                                            focused />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            value={result.sur_Content}
                                            inputProps={{ readOnly: true }}
                                            focused
                                            sx={{ my: 1 }}
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            rowsmax={8}
                                            name="Sur_Content"
                                            id="Sur_Content"
                                        />
                                    </Grid>
                                    {result.sur_Img != defaultImage || result.sur_Img == "EMPTY" &&
                                        <Grid item xs={12}>
                                            <Paper sx={{ bgcolor: '#FFF4EF' }}>
                                                <img src={result.sur_Img} alt="" />
                                            </Paper>
                                        </Grid>
                                    }

                                </Grid>
                                </Container>
                                </Paper>
                                {result && result.questionList.map((value, index) => {
                                    switch (value.surQue_QType) {
                                        case 0: // 주관식
                                            return <ResultSubjective result={result} index={index} />
                                        case 1: // 객관식
                                            return <ResultMultiComp index={index} result={result} />
                                        // return <ResultMulti index={index} result={result}/>
                                        case 2: // 선형배율
                                            return <ResultLinearComp value={value} index={index} result={result} />
                                        default:
                                            break;
                                    }
                                })}
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