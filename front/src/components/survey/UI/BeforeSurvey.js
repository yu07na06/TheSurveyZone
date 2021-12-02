import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const BeforeSurvey = ({marks, addStore}) => {
    return (
        <>
            <FormControl onChange={ (e) => addStore(e) } component="fieldset" name ="zzz">
                <Typography style={{ fontWeight:'bold' }} sx={{ mt:2 }} >성별</Typography>
                    <RadioGroup defaultValue="M" sx={{ mx:3 }} row aria-label="gender" name="gender">
                        <FormControlLabel value="M" control={ <Radio /> } label="남성" />
                        <FormControlLabel value="W" control={ <Radio  /> } label="여성" />
                    </RadioGroup>
            </FormControl>
            
            <Typography style={{ fontWeight:'bold' }} sx={{ mt:5 }} >연령대</Typography>
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
        </>
    );
};

export default BeforeSurvey;