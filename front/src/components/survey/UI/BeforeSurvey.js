import { Container, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Gongback } from '../../common/Function';

const BeforeSurvey = ({marks, addStore}) => {
    return (
        <>  
            <Container sx={{ py: 2 }} maxWidth="md">
            <Paper>
            <Grid container align='center' justifyContent="center">
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Container sx={{ py: 2 }} maxWidth="sm">
                    <Typography style={{ fontWeight:'bold', textAlign:'left'}} sx={{ mt:5 }} >연령대</Typography>
                        <Slider
                            fullWidth
                            onChange={(e)=>addStore(e)} 
                            name="연령대"
                            track={false}
                            aria-label="Custom marks"
                            defaultValue={20}
                            getAriaValueText={value => `${value}`}
                            step={10}
                            valueLabelDisplay="auto"
                            marks={marks}
                            min={10}
                            max={60}
                        />
                        <Gongback num={3}/>
                    </Container>
                </Grid>
            </Grid>
            </Paper>
            </Container>
        </>
    );
};

export default BeforeSurvey;