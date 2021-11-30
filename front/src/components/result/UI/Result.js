import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ResultLinearComp from '../comp/ResultLinearComp';
import ResultSubjective from './ResultSubjective';
import ResultMulti from './ResultMulti';


const Result = ({result}) => {
    console.log('result', result);
    
    return (
        <>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ bgcolor: '#EFF4E7', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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