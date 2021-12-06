import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Container, Grid, Paper } from '@mui/material';

const BeforeSurvey = ({marks, addStore}) => {
    return (
        <>  
            <Container sx={{ py: 2 }} maxWidth="md">
            <Paper>
            <Grid container align='center' justifyContent="center">
                <Grid item lg={12}>
                    <Container sx={{ py: 2 }} maxWidth="sm">
                    <Typography style={{ fontWeight:'bold',textAlign:'left' }} sx={{ mt:5 }} >성별</Typography>
                    <FormControl onChange={ (e) => addStore(e) } component="fieldset" name ="zzz">
                            <RadioGroup defaultValue="M" sx={{ mx:3 }} row aria-label="gender" name="gender">
                                <FormControlLabel value="M" control={ <Radio /> } label="남성" />
                                <FormControlLabel value="W" control={ <Radio  /> } label="여성" />
                            </RadioGroup>
                    </FormControl>
                    </Container>
                </Grid>
                <Grid item lg={12}>
                    <Container sx={{ py: 2 }} maxWidth="sm">
                    <Typography style={{ fontWeight:'bold', textAlign:'left'}} sx={{ mt:5 }} >연령대</Typography>
                    <Box sx={{ mx:4,  width: 300 }}>
                        <Slider
                            onChange={(e)=>addStore(e)} 
                            name="연령대"
                            track={false}
                            aria-label="Custom marks"
                            defaultValue={20}
                            getAriaValueText={value => `${value}`}
                            step={10}
                            valueLabelDisplay="auto"
                            marks={marks} // 10 ~ 60까지 객체 데이터
                            min={10} // 10대 부터
                            max={60} // 60대 까지
                        />
                    </Box>
                    </Container>
                </Grid>
            </Grid>
            </Paper>
            </Container>
        </>
    );
};

export default BeforeSurvey;