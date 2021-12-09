import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Gongback, Img } from '../../common/Function';
import ReqSwitch from '../../common/modules/ReqSwitch';

const CreateSurvey = ({ onClick, day, setDay, question, open, anchorEl, handleClick, handleClose, tag, setTag, tags, setUrl, setSur_Publish, }) => {
    return (
        <>
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
                    <Paper elevation={2} sx={{ bgcolor: '#F2EFFB', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        
                        <ReqSwitch setSur_Publish={setSur_Publish}/>

                        <Grid item xs={12}>
                            <TextField
                                sx={{ my: 1 }}
                                variant="outlined"
                                required
                                fullWidth
                                name="Sur_Title"
                                id="Sur_Title"
                                label="제목"
                                placeholder="제목을 입력해주세요. (45자 이내)"
                                inputProps={{ maxLength: 45 }}
                            />
                        </Grid>
                        <hr /><br />
                        <Grid container xs={{ mx: "auto" }}>
                            <Grid my="2" >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        minDate={new Date()}
                                        startText="시작일"
                                        endText="마감일"
                                        value={day}
                                        onChange={newValue => setDay(newValue)}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} sx={{ pr: 1 }} />
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>

                            </Grid>
                            <Grid sx={{ ml: "auto", my: 1 }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">태그</InputLabel>
                                    {tags && <NativeSelect
                                        labelId="sur_Tag"
                                        id="sur_Tag"
                                        name="sur_Tag"
                                        value={tag}
                                        label="sur_Tag"
                                        onChange={e => setTag(e.target.value)}>
                                        <option value=""></option>
                                        {tags.map(v => <option value={v.tag_ID}>{v.tag_Name}</option>)}
                                    </NativeSelect>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ my: 1 }}
                                    variant="outlined"
                                    multiline
                                    placeholder="본문을 입력해주세요. (300자 이내)"
                                    fullWidth
                                    rows={2}
                                    rowsmax={8}
                                    inputProps={{ maxLength: 300 }}
                                    required
                                    name="Sur_Content"
                                    id="Sur_Content"
                                    label="본문"
                                />
                            </Grid>
                            <Gongback num={1} />

                            <Grid align='center' item xs={12}>
                                <Img sx={{ mx: "auto" }} setUrl={setUrl} imageSRC={null} showBtn={true} />
                            </Grid>

                            <Grid item xs={12}>
                                {question.map((value) => value)}
                                <Paper variant="outlined" palette={{ mode: 'dark' }} sx={{ bgcolor: '#FFFFFF', my: { xs: 1, md: 6 }, p: { xs: 1, md: 1 } }}>
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
                        <Grid display="flex">
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ ml: "auto" }}
                            >
                                생성
                            </Button>
                        </Grid>
                    </Paper>
                </Container>
                
            </Box>
            {/* </ThemeProvider> */}
        </>
    );
};

export default CreateSurvey;
