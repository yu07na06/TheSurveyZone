import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';

const Subjective = ({number, deleteQue, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {
    const [수정할때의데이터 , set수정할때의데이터] = useState(ReadOnlyState?ReadOnlyData.surQue_Content:null);
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}><br/>
                {ReadOnlyState&&<Typography sx={{ marginLeft: '82%' }} style={{ color:"red" }} >{ReadOnlyData.surQue_Essential&&"필수항목입니다"}</Typography>}
                {(!ReadOnlyState||UpdateKey)&& // 읽기 상태일때는 switch를 보여주지 않지만, 업데이트 상태일떄는 보여준다.
                    <>
                        <Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '92%' }} defaultChecked color="secondary" />
                        <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button>
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
                    onChange={(e)=>set수정할때의데이터(e.target.value)}
                    disabled={ReadOnlyState&&!UpdateKey} // 읽기 상태일때 disabled=true로, 업데이트 상태일때 disabled=fasle로
                    value={수정할때의데이터} 
                    />
                </Grid>
                {/* 
                                                                            ReadOnlyState | UpdateKey
                    - 응답상태일떄, 주관식 정답 입력창을 보여주고 싶어        : true          | false      ---> disabled=false이므로 입력 가능!
                    - 찐 보기상태일떄, 주관식 정답 입력창을 보여주고 싶어     : true          | true      ---> disabled=true이므로 입력 불가능!
                    - 업데이트 상태일때, 주관식 정답 입력창을 보여주기 싫어   : false         | true       ---> disabled 상관없음. 안보여주므로 
                 */}
                {(ReadOnlyState&&!UpdateKey)&& // 응답상태에서만 보여주려고!
                    <Grid item xs={12}>
                        <TextField
                            name={`SurQueAnswer_${number}`}
                            id={`SurQueAnswer_${number}`}
                            variant="outlined"
                            required
                            fullWidth
                            disabled={UpdateKey}
                        />
                    </Grid>
                }
            </Grid>
        </Paper>
    );
};

export default Subjective;
// import React, { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import { Button, Grid, TextField, Typography } from '@mui/material';
// import Switch from '@mui/material/Switch';

// const Subjective = ({number, deleteQue, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {
//     // ReadOnlyData&&console.log("이거다~~~~~~~",ReadOnlyData);
    
//     const [수정할때의데이터 , set수정할때의데이터] = useState(ReadOnlyData.surQue_Content);
//     return (
//         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//             <Grid container spacing={2}><br/>
//                 {ReadOnlyState&&<Typography sx={{ marginLeft: '82%' }} style={{ color:"red" }} >{ReadOnlyData.surQue_Essential&&"필수항목입니다"}</Typography>}
//                 {(!ReadOnlyState||UpdateKey)&& // 읽기 상태일때는 switch를 보여주지 않지만, 업데이트 상태일떄는 보여준다.
//                     <>
//                         <Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '92%' }} defaultChecked color="secondary" />
//                         <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button>
//                     </>
//                 }

//                 <Grid item xs={12}>
//                     <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     name={`SurQue_Content${number}`}
//                     id={`SurQue_Content${number}`}
//                     label={`주관식${number}`}
//                     autoComplete="userId"
//                     onChange={(e)=>set수정할때의데이터(e.target.value)}
//                     disabled={ReadOnlyState&&!UpdateKey} // 읽기 상태일때 disabled=true로, 업데이트 상태일때 disabled=fasle로
//                     value={(ReadOnlyState&&!UpdateKey) ? ReadOnlyData.surQue_Content : 수정할때의데이터} 
//                     />
//                 </Grid>
//                 {/* <Grid item xs={12}>
//                     <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     name={`SurQue_Content${number}`}
//                     id={`SurQue_Content${number}`}
//                     label={`주관식${number}`}
//                     autoComplete="userId"
//                     disabled={ReadOnlyState&&!UpdateKey} // 읽기 상태일때 disabled=true로, 업데이트 상태일때 disabled=fasle로
//                     value={ReadOnlyState?ReadOnlyData.surQue_Content:null} // 객체 참조 안함
//                     />
//                 </Grid> */}

//                 {/* 
//                                                                             ReadOnlyState | UpdateKey
//                     - 응답상태일떄, 주관식 정답 입력창을 보여주고 싶어        : true          | false      ---> disabled=false이므로 입력 가능!
//                     - 찐 보기상태일떄, 주관식 정답 입력창을 보여주고 싶어     : true          | true      ---> disabled=true이므로 입력 불가능!
//                     - 업데이트 상태일때, 주관식 정답 입력창을 보여주기 싫어   : false         | true       ---> disabled 상관없음. 안보여주므로 
//                  */}
//                 {(ReadOnlyState&&!UpdateKey)&& // 응답상태에서만 보여주려고!
//                     <Grid item xs={12}>
//                         <TextField
//                             name={`SurQueAnswer_${number}`}
//                             id={`SurQueAnswer_${number}`}
//                             variant="outlined"
//                             required
//                             fullWidth
//                             disabled={UpdateKey}
//                         />
//                     </Grid>
//                 }
//             </Grid>
//         </Paper>
//     );
// };

// export default Subjective;