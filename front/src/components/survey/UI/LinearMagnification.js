import React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const LinearMagnification = ({number, minValue, setMinValue, maxValue, setMaxValue, value, setTemp, deleteQue, ReadOnlyState, ReadOnlyData, makeCircles}) => {
    return (
        <>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                {!ReadOnlyState&&
                <><Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '92%' }} defaultChecked color="secondary" />
                <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button></>}
                    <br/>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            disabled={ReadOnlyState}
                            name={`SurQue_Content${number}`}
                            id={`SurQue_Content${number}`}
                            label={`선형배율${number}`}
                            value={ReadOnlyState?ReadOnlyData.surQue_Content:null} // 객체 참조 안함
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            required
                            variant="filled"
                            name={`start_Step${number}`}
                            label="시작"
                            onChange={e=>setTemp(e.target.value)}
                            disabled={ReadOnlyState}
                            value={ReadOnlyState?ReadOnlyData.selectList[0].surSel_Content:null} // 객체 참조 안함
                        />
                    </Grid>
                    
                    {!ReadOnlyState&&
                    <Grid item xs={4}>
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
                                        disabled={ReadOnlyState}
                                        value={minValue} // 객체 참조 안함
                                        >
                                    <MenuItem value="0">0</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>}

                    {ReadOnlyState&&
                    <Grid container xs={8} 
                        justifyContent="center"
                        alignItems="center">
                    {ReadOnlyState&&
                        makeCircles.map(value=>value)}
                    </Grid>}

                    <Grid item xs={2}>
                        <TextField
                            required
                            variant="filled"
                            name={`end_Step${number}`}
                            label="끝"
                            onChange={e=>setTemp(e.target.value)}
                            disabled={ReadOnlyState}
                            value={ReadOnlyState?ReadOnlyData.selectList[2].surSel_Content:null} // 객체 참조 안함
                        />
                    </Grid>
                    {!ReadOnlyState&&
                    <Grid item xs={4}>
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
                                        disabled={ReadOnlyState}
                                        value={maxValue} // 객체 참조 안함
                                        >
                                    {value.map((v,i)=>
                                        (minValue===0)?<MenuItem value={v}>{v}</MenuItem>:<MenuItem value={v+1}>{v+1}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>}
                </Grid>
            </Paper>
        </>
    );
};

export default LinearMagnification;