import { Button, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import ReqSwitch from '../../common/modules/ReqSwitch';

const Subjective = ({ number, deleteQue, ReadOnlyState, ReadOnlyData, UpdateKey, realReadState }) => {
    const [수정할때의데이터, set수정할때의데이터] = useState(ReadOnlyState ? ReadOnlyData.surQue_Content : null);
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2} alignItems="center"><br />
                {ReadOnlyState && <Grid item xs={12} sx={{ textAlign: "right" }}><Typography style={{ color: "red" }} >{ReadOnlyData.surQue_Essential && "필수항목"}</Typography></Grid>}
                {(!ReadOnlyState || UpdateKey) && // 읽기 상태일때는 switch를 보여주지 않지만, 업데이트 상태일떄는 보여준다.
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
                        variant="outlined"
                        required
                        fullWidth
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`주관식${number}`}
                        autoComplete="userId"
                        onChange={(e) => set수정할때의데이터(e.target.value)}
                        InputProps={{ readOnly: (ReadOnlyState && !UpdateKey) }}
                        value={수정할때의데이터}
                    />
                </Grid>
                {/* 
                                                                            ReadOnlyState | UpdateKey
                    - 응답상태일떄, 주관식 정답 입력창을 보여주고 싶어        : true          | false      ---> disabled=false이므로 입력 가능!
                    - 찐 보기상태일떄, 주관식 정답 입력창을 보여주고 싶어     : true          | true      ---> disabled=true이므로 입력 불가능!
                    - 업데이트 상태일때, 주관식 정답 입력창을 보여주기 싫어   : false         | true       ---> disabled 상관없음. 안보여주므로 
                 */}
                {(ReadOnlyState && !UpdateKey) && // 응답상태에서만 보여주려고!
                    <Grid item xs={12}>
                        <TextField
                            name={`SurQueAnswer_${number}`}
                            id={`SurQueAnswer_${number}`}
                            variant="outlined"
                            required={ReadOnlyData.surQue_Essential}
                            fullWidth
                            InputProps={{ readOnly: (realReadState) }}
                        />
                    </Grid>
                }
            </Grid>
        </Paper>
    );
};

export default Subjective;