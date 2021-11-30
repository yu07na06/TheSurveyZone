import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@mui/material';

const ResultSubjective = ({result, index}) =>{
    return(
        <>  
            <Paper elevation={3} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                    <Grid container justifyContent="center">
                        <Grid item xs={9}>
                            <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <TextField fullWidth label="질문명" value={result&&result.questionList[index].surQue_Content}  variant="standard" color="success" focused va InputProps={{ readOnly: true}} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {result&&result.answerList[index].map((answer, index)=>{
                            return <TextField fullWidth label={`답변 리스트 ${index+1}`} value={`${answer}`} variant="standard" color="success" focused va InputProps={{ readOnly: true}} />
                            // return <TextField fullWidth label="제목" value={answer} variant="standard" color="success" focused va />
                        })}
                        {/* <Paper elevation={3} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1} }}>
                            <TextField fullWidth label="제목" variant="standard" color="success" focused va />
                        </Paper> */}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}


// export const ResultSubjective = ({result}) =>{
//     console.log("받은 결과값 : ", result);
//     return(
//         <>  
//             <Paper elevation={3} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <Paper elevation={3} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                             <TextField fullWidth label="질문명" value={result&&result.questionList[1].surQue_Content}  variant="standard" color="success" focused va InputProps={{ readOnly: true}} />
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField fullWidth label="제목" variant="standard" color="success" focused va />
//                         {/* <Paper elevation={3} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1} }}>
//                             <TextField fullWidth label="제목" variant="standard" color="success" focused va />
//                         </Paper> */}
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </>
//     )
// }


export default ResultSubjective;