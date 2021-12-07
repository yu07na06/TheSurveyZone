import { Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import React from 'react';
import ReqSwitch from '../../common/modules/ReqSwitch';
import { debounce } from 'lodash';

const LinearMagnification = ({ 
    ReadOnlyState, 
    ReadOnlyData, 
    UpdateKey, 
    number,

    updateData,
    setUpdateData,
    updateDataStart,
    setUpdateDataStart,
    updateDataStartValue,
    setUpdateDataStartValue,
    updateDataEnd,
    setUpdateDataEnd,
    updateDataEndValue,
    setUpdateDataEndValue,
    value, 
    minValue, 
    setMinValue, 
    maxValue, 
    setMaxValue, 
    makeCircles, 
    setTemp, 
    deleteQue, }) => {
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}>

                {ReadOnlyState && <Grid item xs={12} sx={{ textAlign: "right" }}><Typography style={{ color: "red" }} >{ReadOnlyData.surQue_Essential && "필수항목"}</Typography></Grid>}
                {(!ReadOnlyState || UpdateKey) &&
                    <>
                        <Grid item xs={9}>
                            <ReqSwitch number={number} flag={"qeustion"} essential={ReadOnlyData&&ReadOnlyData.surQue_Essential}/>

                        </Grid>
                        <Grid item xs={3} textAlign="right">
                            <Button id={number} onClick={(e) => deleteQue(e)}>삭제</Button>
                        </Grid>
                    </>
                }

                <Grid item xs={12}>
                    <TextField
                        onChange={(e) => setUpdateData(e.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`선형배율${number}`}
                        value={updateData}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        onChange={(e) => { setUpdateDataStart(e.target.value); debounce(()=>{console.log('나야 나ㅎㅎㅎ좋아'); setTemp(e.target.value); },1777)(); }}
                        required
                        variant="filled"
                        name={`start_Step${number}`}
                        label="시작"
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        value={updateDataStart}
                    />
                </Grid>

                {(!ReadOnlyState || UpdateKey) &&
                    <Grid item xs={12} md={6}>
                        {UpdateKey ?
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">시작 값</InputLabel>
                                    {value &&
                                        <NativeSelect
                                            labelId={`start_Name${number}_${minValue}`}
                                            id={`start_Name${number}_${minValue}`}
                                            name={`start_Name${number}_${minValue}`}
                                            label={`start_Name${number}_${minValue}`}
                                            onChange={e => setUpdateDataStartValue(e.target.value)}
                                            InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                                            value={minValue}
                                            defaultValue={updateDataStartValue}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                        </NativeSelect>
                                    }
                                </FormControl>
                            </Box>
                        :
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">시작 값</InputLabel>
                                    <Select
                                        required
                                        labelId={`start_Name${number}_${minValue}`}
                                        id={`start_Name${number}_${minValue}`}
                                        name={`start_Name${number}_${minValue}`}
                                        label={`start_Name${number}_${minValue}`}
                                        onChange={e => setMinValue(e.target.value)}
                                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                                        value={minValue}
                                    >
                                        <MenuItem value="0">0</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        }
                    </Grid>
                }

                <Grid item  xs={12} md={6}  textAlign="left">
                    <TextField
                        fullWidth
                        onChange={(e) => { setUpdateDataEnd(e.target.value); debounce(()=>{console.log('나야 나ㅎㅎㅎ좋아끝'); setTemp(e.target.value); },1777)(); }}
                        required
                        variant="filled"
                        name={`end_Step${number}`}
                        label="끝"
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        value={updateDataEnd}
                    />
                </Grid>

                {(ReadOnlyState && !UpdateKey) &&
                    <Grid container xs={12}
                        justifyContent="center"
                        alignItems="center">
                        {ReadOnlyState &&
                            makeCircles.map(value => value)}
                    </Grid>
                }

                {(!ReadOnlyState || UpdateKey) &&
                    <Grid item xs={12} md={6}>
                        {UpdateKey ?
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">끝 값</InputLabel>
                                    {value && <NativeSelect
                                        labelId={`end_Name${number}_${maxValue}`}
                                        id={`end_Name${number}_${maxValue}`}
                                        name={`end_Name${number}_${maxValue}`}
                                        label={`end_Name${number}_${maxValue}`}
                                        onChange={e => setUpdateDataEndValue(e.target.value)}
                                        value={maxValue}                                              
                                        defaultValue={updateDataEndValue}
                                    >
                                        {value.map(v =>
                                            (minValue === 0) ? <option value={v}>{v}</option> : <option value={v + 1}>{v + 1}</option>
                                        )}
                                    </NativeSelect>}
                                </FormControl>
                            </Box>
                            :
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">끝 값</InputLabel>
                                    <Select
                                        required
                                        labelId={`end_Name${number}_${maxValue}`}
                                        id={`end_Name${number}_${maxValue}`}
                                        name={`end_Name${number}_${maxValue}`}
                                        label={`end_Name${number}_${maxValue}`}
                                        onChange={e => setMaxValue(e.target.value)}
                                        disabled={ReadOnlyState && !UpdateKey}
                                        value={maxValue}
                                    >
                                        {/* value = [1,2,3,4,5,6,7,8,9] */}
                                        {value.map(v =>
                                            (minValue === 0) ? <MenuItem value={v}>{v}</MenuItem> : <MenuItem value={v + 1}>{v + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                        }
                    </Grid>
                }
            </Grid>
        </Paper>
    );
};

export default LinearMagnification;