import { Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import ReqSwitch from '../../common/modules/ReqSwitch';

const LinearMagnification = ({ number, minValue, setMinValue, maxValue, setMaxValue, value, setTemp, deleteQue, ReadOnlyState, ReadOnlyData, makeCircles, UpdateKey, }) => {
    const [수정할때의데이터, set수정할때의데이터] = useState(ReadOnlyState ? ReadOnlyData.surQue_Content : null);
    const [수정할때의데이터시작, set수정할때의데이터시작] = useState(ReadOnlyState ? ReadOnlyData.selectList[0].surSel_Content : null);
    const [수정할때의데이터시작값, set수정할때의데이터시작값] = useState(ReadOnlyState ? Number(ReadOnlyData.selectList[1].surSel_Content) : null);
    const [수정할때의데이터끝, set수정할때의데이터끝] = useState(ReadOnlyState ? ReadOnlyData.selectList[2].surSel_Content : null);
    const [수정할때의데이터끝값, set수정할때의데이터끝값] = useState(ReadOnlyState ? Number(ReadOnlyData.selectList[3].surSel_Content) : null);
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}>

                {ReadOnlyState && <Grid item xs={12} sx={{ textAlign: "right" }}><Typography style={{ color: "red" }} >{ReadOnlyData.surQue_Essential && "필수항목"}</Typography></Grid>}
                {(!ReadOnlyState || UpdateKey) &&
                    <>
                        <Grid item xs={9}>
                            <ReqSwitch number={number} flag={"qeustion"} essential={ReadOnlyData&&ReadOnlyData.surQue_Essential}/>

                        </Grid>
                        <Grid item xs={3}>
                            <Button id={number} sx={{ left: '75%' }} onClick={(e) => deleteQue(e)}>삭제</Button>
                        </Grid>
                    </>
                }

                <Grid item xs={12}>
                    <TextField
                        onChange={(e) => set수정할때의데이터(e.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        // disabled={ReadOnlyState&&!UpdateKey}
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`선형배율${number}`}
                        value={수정할때의데이터} // 객체 참조 안함
                    />
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        onChange={(e) => { set수정할때의데이터시작(e.target.value); setTemp(e.target.value); }}
                        required
                        variant="filled"
                        name={`start_Step${number}`}
                        label="시작"
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        // disabled={ReadOnlyState&&!UpdateKey}
                        value={수정할때의데이터시작} // 객체 참조 안함
                    />
                </Grid>

                {(!ReadOnlyState || UpdateKey) &&
                    <Grid item xs={4}>
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
                                            onChange={e => set수정할때의데이터시작값(e.target.value)}
                                            InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                                            // disabled={ReadOnlyState&&!UpdateKey}
                                            value={minValue} // 객체 참조 안함
                                            defaultValue={수정할때의데이터시작값}
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
                                        value={minValue} // 객체 참조 안함
                                    >
                                        <MenuItem value="0">0</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        }
                    </Grid>
                }

                {(ReadOnlyState && !UpdateKey) &&
                    <Grid container xs={8}
                        justifyContent="center"
                        alignItems="center">
                        {ReadOnlyState &&
                            makeCircles.map(value => value)}
                    </Grid>
                }

                <Grid item xs={2}>
                    <TextField
                        onChange={(e) => { set수정할때의데이터끝(e.target.value); setTemp(e.target.value); }}
                        required
                        variant="filled"
                        name={`end_Step${number}`}
                        label="끝"
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        // disabled={ReadOnlyState&&!UpdateKey}
                        value={수정할때의데이터끝} // 객체 참조 안함
                    />
                </Grid>


                {(!ReadOnlyState || UpdateKey) &&
                    <Grid item xs={4}>
                        {UpdateKey ?
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">끝 값</InputLabel>
                                    {value && <NativeSelect
                                        labelId={`end_Name${number}_${maxValue}`}
                                        id={`end_Name${number}_${maxValue}`}
                                        name={`end_Name${number}_${maxValue}`}
                                        label={`end_Name${number}_${maxValue}`}
                                        onChange={e => set수정할때의데이터끝값(e.target.value)}
                                        value={maxValue} // 객체 참조 안함                                                
                                        defaultValue={수정할때의데이터끝값}
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
                                        value={maxValue} // 객체 참조 안함
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