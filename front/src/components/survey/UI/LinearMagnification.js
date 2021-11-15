import React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid, Menu, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';

const LinearMagnification = ({number}) => {
    return (
        <>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                    <br/>
                    선형배율 틀입니다 {number}
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
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            // onClick={handleClick}
                        >
                            Dashboard
                        </Button>
                        <Menu
                            id="basic-menu"
                            // anchorEl={anchorEl}
                            // onClose={handleClose}
                            MenuListProps={{'aria-labelledby': 'basic-button'}}
                            >
                            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                    <Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default LinearMagnification;