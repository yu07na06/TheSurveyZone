import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';
import ReqSwitch from '../../common/modules/ReqSwitch';

const MultipleChoice = ({ ReadOnlyState, ReadOnlyData, UpdateKey, count, number, updateData, setUpdateData, select, setSelect, AddText, maxNum, setMaxNum, deleteQue, }) => {
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}><br />
                {ReadOnlyState && <Grid item xs={12} sx={{ textAlign: "right" }}><Typography style={{ color: "red" }} >{ReadOnlyData.surQue_Essential && "필수항목"}</Typography></Grid>}
                {(!ReadOnlyState || UpdateKey) &&
                    <>
                        <Grid item xs={9}>
                            <ReqSwitch number={number} flag={"qeustion"} essential={ReadOnlyData&&ReadOnlyData.surQue_Essential}/>

                        </Grid>
                        <Grid item xs={3} textAlign="right" >
                            <Button id={number} onClick={(e) => deleteQue(e)}>삭제</Button>
                        </Grid>
                    </>
                }

                <Grid item xs={12} md={10}>
                    <TextField
                        onChange={(e) => setUpdateData(e.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`객관식${number}`}
                        value={updateData}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    {UpdateKey ?
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">중복답변개수</InputLabel>
                                <NativeSelect
                                    labelId={`surQue_MaxAns${number}`}
                                    id={`surQue_MaxAns${number}`}
                                    value={maxNum}
                                    InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                                    defaultValue={ReadOnlyData.surQue_MaxAns}
                                    name={`surQue_MaxAns${number}`}
                                    label={`surQue_MaxAns${number}`}
                                    onChange={e => setMaxNum(e.target.value)}
                                >
                                    {/* 이거 왜 되는지는 모르겠는데, (( < )&&( < )) 이런식으로 쓰면 안되더라구요. 그래서 일단 이렇게 하면 해결이자 버그임! */}
                                    {(select.length < ReadOnlyData.selectList.length <= select.length) ?
                                        select.map((v, idx) => <option value={idx + 1}>{idx + 1}</option>)
                                        : ReadOnlyData.selectList.map((v, idx) => <option value={idx + 1}> {idx + 1} </option>)
                                    }
                                </NativeSelect>
                            </FormControl>
                        </Box>
                        :
                        <Box>
                            <FormControl fullWidth>
                                {(ReadOnlyState && !UpdateKey) && <Typography>중복답변{ReadOnlyData.surQue_MaxAns}개</Typography>}
                                {(!ReadOnlyState || UpdateKey) &&
                                    <><InputLabel id="demo-simple-select-label">중복답변</InputLabel>
                                        <Select
                                            required
                                            labelId={`surQue_MaxAns${number}`}
                                            id={`surQue_MaxAns${number}`}
                                            value={maxNum}
                                            InputProps={{ readOnly: (ReadOnlyState) }}
                                            name={`surQue_MaxAns${number}`}
                                            label={`surQue_MaxAns${number}`}
                                            onChange={e => setMaxNum(e.target.value)}
                                        >
                                            {select.map((value, index) =>
                                                <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                            )}
                                        </Select></>
                                }
                            </FormControl>
                        </Box>

                    }
                </Grid>

                <Grid item xs={12}>
                    <Paper variant="outlined">
                        {select.map((value) => value)}
                    </Paper>
                </Grid>

                {(!ReadOnlyState || UpdateKey) &&
                    <Grid item xs={12}>
                        <Button onClick={() => { count.current += 1; setSelect([...select, <div key={`SurQue_Ans_${number}_${count.current}`}><AddText number={number} ReadOnlyData={ReadOnlyData} addMaxNum={null} checkBoxEssential={null} count={count.current} /></div>]) }}>
                            <AddIcon />
                        </Button>
                    </Grid>}

            </Grid><br />
        </Paper>
    );
};

export default MultipleChoice;