import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import ReqSwitch from '../../common/UI/ReqSwitch';
import { Gongback } from '../../common/Function';

const CreateSurvey = ({ onClick, day, setDay, question, open, anchorEl, handleClick, handleClose, tag, setTag, tags, Img, setUrl, setSur_Publish, }) => {
    return (
        <>
            {/* <ThemeProvider theme={createTheme()}> */}
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
                            <ReqSwitch setSur_Publish={setSur_Publish}/>
                            <br/><hr /><br/>
                            <div style={{marginLeft:160}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        minDate={new Date()}
                                        startText="시작일"
                                        endText="마감일"
                                        value={day}
                                        onChange={ newValue => setDay(newValue) }
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 2}}> to </Box>
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                            
                            <React.Fragment>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} my={3}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            sx={{bgcolor: '#FFFFFF'}}
                                            name="Sur_Title"
                                            id="Sur_Title"
                                            label="제목"
                                            inputProps={{maxLength: 45}}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
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
                                    <Grid item xs={2}>
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">태그</InputLabel>
                                                <Select
                                                    labelId="sur_Tag"
                                                    id="sur_Tag"
                                                    name="sur_Tag"
                                                    value={tag}
                                                    label="sur_Tag"
                                                    onChange={e => setTag(e.target.value)}
                                                    >
                                                    <MenuItem value="">선택안함</MenuItem>
                                                    {tags&&tags.map(v=><MenuItem value={v.tag_ID}>{v.tag_Name}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                        <Gongback num={4} />
                                    
                                    <Grid item xs={6} >
                                        <Img style={{ height:"233px" }} setUrl={setUrl} imageSRC={null} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {question.map((value) => value)}     
                                        <Paper variant="outlined" palette={{ mode: 'dark' }} sx={{ bgcolor: '#FFFFFF', my: { xs: 1, md: 6 }, p: { xs: 1, md: 1 } }}>
                                            <Switch sx={{ left: '92%' }} defaultChecked color="secondary" />
                                            <Button
                                                id="basic-button"
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                sx={{ right: '7%' }}
                                            >
                                                <Fab size="small" color="secondary" aria-label="add">
                                                    <AddIcon />
                                                </Fab>
                                            </Button>
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
                                        </Paper>
                                    </Grid>
                                </Grid>
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
            {/* </ThemeProvider> */}
        </>
    );
};

export default CreateSurvey;
