import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

const CreateSurvey = ({theme, onClick, startDate, setStartDate, endDate, setEndDate, onCheckChange, question, open, anchorEl, handleClick, label, handleClose }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="form" onSubmit={onClick}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                </AppBar>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                    <Paper elevation={3} sx={{ bgcolor: '#C9CBE0', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        설문지
                    </Typography>
                    <Switch id="Sur_Publishs" x={{ left: '85%' }} {...label} color="secondary" onChange={onCheckChange}/> {/*false: 공개, true: (잠금)비공개*/}
                    <br/>
                    <hr />
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                            <DesktopDatePicker
                                label="시작일"
                                value={startDate}
                                minDate={new Date()}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                maxWidth='20'
                            /> &nbsp; &nbsp; &nbsp; <h1 style={{display:'inline'}}>~</h1> &nbsp; &nbsp; &nbsp;
                            <DesktopDatePicker
                                label="마감일"
                                value={endDate}
                                sx={{bgcolor: '#FFFFFF'}}
                                minDate={new Date(startDate)}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                    </LocalizationProvider>
                    
                    <React.Fragment>
                        <Grid item xs={12} my={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                sx={{bgcolor: '#FFFFFF'}}
                                name="Sur_Title"
                                id="Sur_Title"
                                label="제목"
                            />
                        </Grid>
                        <Grid item xs={12} my={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                sx={{bgcolor: '#FFFFFF'}}
                                name="Sur_Content"
                                id="Sur_Content"
                                label="본문"
                            />
                        </Grid>

                        <br/><br/>
                        {/* <List> */}
                        {question.map((value) => value)}

                        <Paper variant="outlined" palette={{ mode: 'dark' }} sx={{ bgcolor: '#FFFFFF', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Grid container spacing={2}>
                                    <br/>
                                    <Button
                                        id="basic-button"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                    <Fab size="small" color="secondary" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                    </Button>
                                    <Switch sx={{ left: '85%' }} {...label} defaultChecked color="secondary" />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                    <MenuItem id='객관식' onClick={e => handleClose(e)}>객관식</MenuItem>
                                    <MenuItem id='주관식' onClick={e => handleClose(e)}>주관식</MenuItem>
                                    <MenuItem id='선형배율' onClick={e => handleClose(e)}>선형배율</MenuItem>
                                </Menu>
                            </Grid>
                        </Paper>
                        {/* </List> */}
                        
                    </React.Fragment>
                
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, ml: 1 ,left: '90%'}}
                            >
                            완료
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
        </>
    );
};

export default CreateSurvey;