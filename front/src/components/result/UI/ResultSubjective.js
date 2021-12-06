import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@mui/material';

const ResultSubjective = ({result, index}) =>{
    return(
        <>  
            <Paper elevation={2}  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor:'#E0ECF8' }}>
                <Grid container spacing={2}>
                    <Grid container justifyContent="center">
                        <Grid item xs={11}>
                            <Paper elevation={1} sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 2 } }}>
                                <TextField fullWidth label="질문명" value={result&&result.questionList[index].surQue_Content}  variant="standard"  focused va InputProps={{ readOnly: true}} />
                            </Paper>
                        </Grid>
                    <Grid item xs={11}>
                        <div style={{maxHeight: 500, overflow: 'auto'}} >
                        {result&&result.answerList[index].map((answer, index)=>{
                            return <TextField fullWidth label={`답변 리스트 ${index+1}`} value={`${answer}`} variant="standard"  focused va InputProps={{ readOnly: true}} />
                        })}
                        </div>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ResultSubjective;