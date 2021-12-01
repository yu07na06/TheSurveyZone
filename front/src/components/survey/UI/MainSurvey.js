import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Grid, TextField } from '@mui/material';
import SubjectiveComp from '../comp/SubjectiveComp';
import MultipleChoiceComp from '../comp/MultipleChoiceComp';
import LinearMagnificationComp from '../comp/LinearMagnificationComp';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import Fab from '@mui/material/Fab';

const MainSurvey = ({ theme, surveyReqForm, UpdateKey, day, setDay, tag, setTag, tags, handleClick, anchorEl, open, handleClose, question, ReadOnlyState, }) => {
    const [수정할때의데이터제목 , set수정할때의데이터제목] = useState();
    const [수정할때의데이터본문 , set수정할때의데이터본문] = useState();
    useEffect(()=>{
        if(surveyReqForm!=null){
            set수정할때의데이터제목(surveyReqForm.sur_Title)
            set수정할때의데이터본문(surveyReqForm.sur_Content)
        }
    },[surveyReqForm])

    surveyReqForm&&console.log("태그 없이 되니?", surveyReqForm.tagList);

    return (
        <>
        {surveyReqForm&&
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                    <Paper levation={3} sx={{ bgcolor: '#C9CBE0', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            설문지
                        </Typography><br/><br/>
                        <Grid container spacing={2}>
                            {UpdateKey?
                                <div style={{marginLeft:120}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateRangePicker
                                            minDate={new Date()}
                                            startText="시작일"
                                            endText="마감일"
                                            value={day}
                                            onChange={(newValue) => {
                                                setDay(newValue);
                                            }}
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
                            :
                                <>
                                    <Grid item xs={4}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            label="시작 날짜"
                                            value={surveyReqForm.sur_StartDate}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            label="마감 날짜"
                                            value={surveyReqForm.sur_EndDate}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            value={surveyReqForm.sur_State===0?"진행전":(surveyReqForm.sur_State===1?"진행중":"마감")}
                                            label="진행상태"
                                        />
                                    </Grid>
                                </>
                            }

                            <Grid item xs={12}>
                                <TextField
                                    disabled={!UpdateKey}
                                    fullWidth
                                    id="Sur_Title"
                                    name="Sur_Title"
                                    label="제목"
                                    value={수정할때의데이터제목}
                                    onChange={e=>set수정할때의데이터제목(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    disabled={!UpdateKey}
                                    fullWidth
                                    id="Sur_Content"
                                    name="Sur_Content"
                                    label="본문"
                                    value={수정할때의데이터본문}
                                    onChange={e=>set수정할때의데이터본문(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                {UpdateKey?
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel  id="demo-simple-select-label">태그</InputLabel>
                                                {tags&&<NativeSelect
                                                    labelId="sur_Tag"
                                                    id="sur_Tag"
                                                    name="sur_Tag"
                                                    value={tag}
                                                    defaultValue={surveyReqForm.tagList.length===0 ?"": surveyReqForm.tagList[0].tag_ID}
                                                    label="sur_Tag"
                                                    onChange={e => setTag(e.target.value)}
                                                    >
                                                    <option value=""></option>
                                                    {tags.map(v=><option value={v.tag_ID}>{v.tag_Name}</option>)}
                                                </NativeSelect>}
                                        </FormControl>
                                    </Box>
                                :
                                    <TextField
                                        disabled
                                        fullWidth
                                        label={surveyReqForm.tagList.length!==0 && surveyReqForm.tagList[0].tag_Name}
                                    />
                                }

                            </Grid>
                        </Grid>
                        <hr/>
                            {(!UpdateKey&&!ReadOnlyState)&&
                            surveyReqForm.questionList.map((value)=>{
                                switch(value.surQue_QType){
                                    case 0: // 주관식
                                        return <SubjectiveComp ReadOnlyState={ReadOnlyState} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null} UpdateKey={UpdateKey}/>
                                    case 1: // 객관식
                                        return <MultipleChoiceComp ReadOnlyState={ReadOnlyState} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null} UpdateKey={UpdateKey}/>
                                    case 2: // 선형배율
                                        return <LinearMagnificationComp ReadOnlyState={ReadOnlyState} ReadOnlyData={value} setDelIndex={null} number={value.surQue_Order} setCheck={null} UpdateKey={UpdateKey}/>
                                    default: break;
                                }
                                console.log("질문타입 확인", value);
                            })}

                            {question.map((value) => value)} 
                            {UpdateKey&&<Paper variant="outlined" palette={{ mode: 'dark' }} sx={{ bgcolor: '#FFFFFF', my: { xs: 1, md: 6 }, p: { xs: 1, md: 1 } }}>
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
                            </Paper>}
                        </Paper>    
                    </Container>
                </ThemeProvider>
            }
        </>
  );
};

export default MainSurvey;