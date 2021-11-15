import React from 'react';
import Paper from '@mui/material/Paper';
import { Grid, TextField } from '@mui/material';
// import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const MultipleChoice = ({number, select, setSelect, addText, hi }) => {
    return (
        <Paper key={1} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}><br/>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`질문${number}`}
                    />
                </Grid>
            </Grid><br/>
            <Grid>
                {select.map((value) => value)}
                <Button onClick={()=>setSelect([...select, addText(number)])}>
                    <AddIcon/>
                </Button>
            </Grid>
        </Paper>
    );
};

export default MultipleChoice;