import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ResultLinearComp from '../comp/ResultLinearComp';
import ResultSubjective from './ResultSubjective';
import ResultMulti from './ResultMulti';
import { TextField } from '@mui/material';


const Result = ({result}) => {
    return (
        <>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ bgcolor: '#EFF4E7', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <TextField label="제목" value={result.sur_Title} focused/>
                    <TextField label="본문" value={result.sur_Content} focused/>
                    <TextField label="태그" value={result.sur_Tag}/>
                    <TextField label="시작날짜" value={result.sur_StartDate} focused/>
                    <TextField label="마감날짜" value={result.sur_EndDate} focused/>
                    <TextField label="진행상태" value={result.sur_State===1?"진행중":"마감"}/>
                    <TextField label="공개여부" value={result.sur_Publish?"공개":"비공개"} focused/>
                    {result && result.questionList.map((value, index) =>{
                        switch (value.surQue_QType) {
                            case 0: // 주관식
                                return <ResultSubjective result={result} index={index}/>
                            case 1: // 객관식
                                return <ResultMulti value={value} index={index} result={result}/>
                            case 2: // 선형배율
                                return <ResultLinearComp value={value} index={index} result={result}/>
                            default:
                                break;
                        }
                    })}
                </Paper>
            </Container>
        </>
    );
};

export default Result;