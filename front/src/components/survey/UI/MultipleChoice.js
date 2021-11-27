import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, NativeSelect, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const MultipleChoice = ({number, select, setSelect, AddText, maxNum, setMaxNum, deleteQue, ReadOnlyState, ReadOnlyData, UpdateKey, count, }) => {
    const [수정할때의데이터 , set수정할때의데이터] = useState(ReadOnlyState?ReadOnlyData.surQue_Content:null);
    console.log("ReadOnlyData : ", ReadOnlyData);
    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            {ReadOnlyState&&<Typography sx={{ marginLeft: '82%' }} style={{ color:"red" }} >{ReadOnlyData.surQue_Essential&&"필수항목입니다"}</Typography>}
            {(!ReadOnlyState||UpdateKey)&&
                <><Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '94%' }} defaultChecked color="secondary" />
                <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button></>
            }
            <Grid container spacing={2}><br/>
                <Grid item xs={10}>
                    <TextField
                        onChange={(e)=>set수정할때의데이터(e.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        disabled={ReadOnlyState&&!UpdateKey}
                        name={`SurQue_Content${number}`}
                        id={`SurQue_Content${number}`}
                        label={`객관식${number}`}
                        value={수정할때의데이터} // 아직 객체 참조 안함
                    />
                </Grid>
                <Grid item xs={2}>
                    {UpdateKey?
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel  id="select-label">중복답변개수</InputLabel>
                                    {select&&<NativeSelect
                                        labelId={`surQue_MaxAns${number}`}
                                        id={`surQue_MaxAns${number}`}
                                        value={maxNum} // 아직 객체 참조 안함
                                        disabled={ReadOnlyState&&!UpdateKey}
                                        // defaultValue={Number(ReadOnlyData.surQue_MaxAns)}
                                        defaultValue="3"
                                        name={`surQue_MaxAns${number}`}
                                        label={`surQue_MaxAns${number}`}
                                        onChange={e => setMaxNum(e.target.value)}
                                    >
                                    {select.map((value, index)=>{
                                        console.log("왜 안돼?", index, index+1);
                                        return <option value={index+1}>{index+1}</option>})}
                                    </NativeSelect>}
                            </FormControl>
                        </Box>
                    :
                        <Box>
                            <FormControl fullWidth>
                                {(ReadOnlyState&&!UpdateKey)&&<Typography>중복답변{ReadOnlyData.surQue_MaxAns}개</Typography>}
                                {(!ReadOnlyState||UpdateKey)&&
                                    <><InputLabel id="demo-simple-select-label">중복답변개수</InputLabel>
                                    <Select
                                        required
                                        labelId={`surQue_MaxAns${number}`}
                                        id={`surQue_MaxAns${number}`}
                                        value={maxNum} // 아직 객체 참조 안함
                                        disabled={ReadOnlyState}
                                        name={`surQue_MaxAns${number}`}
                                        label={`surQue_MaxAns${number}`}
                                        onChange={e => setMaxNum(e.target.value)}
                                        >
                                    {select.map((value, index)=>
                                        <MenuItem value={index+1}>{index+1}</MenuItem>
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
                {(!ReadOnlyState||UpdateKey)&&
                <Grid item xs={12}>
                    {/* {count.current+=1} */}
                    <Button onClick={()=>{ count.current+=1; console.log("클릭은 당연히 될꺼라 믿어요"); setSelect([...select, <div key={`SurQue_Ans_${number}_${count.current}`}><AddText number={number} ReadOnlyData={ReadOnlyData} addMaxNum={null} checkBoxEssential={null} count={count.current} /></div>  ])}}>
                        <AddIcon/>
                    </Button>
                </Grid>}
            </Grid><br/>
        </Paper>
    );
};

export default MultipleChoice;
// import React, { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import { Grid, TextField } from '@mui/material';
// import Switch from '@mui/material/Switch';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import MenuItem from '@mui/material/MenuItem';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Typography from '@mui/material/Typography';

// const MultipleChoice = ({number, select, setSelect, addText, maxNum, setMaxNum, deleteQue, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {

//     return (
//         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//             {ReadOnlyState&&<Typography sx={{ marginLeft: '82%' }} style={{ color:"red" }} >{ReadOnlyData.surQue_Essential&&"필수항목입니다"}</Typography>}
//             {(!ReadOnlyState||UpdateKey)&&
//                 <><Switch id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '94%' }} defaultChecked color="secondary" />
//                 <Button id={number} sx={{ left: '74%' }} onClick={(e)=>deleteQue(e)}>삭제</Button></>
//             }
//             <Grid container spacing={2}><br/>
//                 <Grid item xs={10}>
//                     <TextField
//                         variant="outlined"
//                         required
//                         fullWidth
//                         disabled={ReadOnlyState&&!UpdateKey}
//                         name={`SurQue_Content${number}`}
//                         id={`SurQue_Content${number}`}
//                         label={`객관식${number}`}
//                         value={(ReadOnlyState&&!UpdateKey)&&null} // 아직 객체 참조 안함
//                     />
//                 </Grid>
//                 <Grid item xs={2}>
//                     <Box>
//                         <FormControl fullWidth>
//                             {(ReadOnlyState&&!UpdateKey)&&<Typography>중복답변{ReadOnlyData.surQue_MaxAns}개</Typography>}
//                             {(!ReadOnlyState||UpdateKey)&&
//                                 <><InputLabel id="demo-simple-select-label">중복답변개수</InputLabel>
//                                 <Select
//                                     required
//                                     labelId={`surQue_MaxAns${number}`}
//                                     id={`surQue_MaxAns${number}`}
//                                     value={maxNum} // 아직 객체 참조 안함
//                                     disabled={ReadOnlyState}
//                                     name={`surQue_MaxAns${number}`}
//                                     label={`surQue_MaxAns${number}`}
//                                     onChange={e => setMaxNum(e.target.value)}
//                                     >
//                                 {select.map((value, index)=>
//                                     <MenuItem value={index+1}>{index+1}</MenuItem>
//                                 )}
//                                 </Select></>
//                             }
//                         </FormControl>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Paper variant="outlined">
//                         {select.map((value) => value)}
//                     </Paper>
//                 </Grid>
//                 {(!ReadOnlyState||UpdateKey)&&
//                 <Grid item xs={12}>
//                     <Button onClick={()=>setSelect([...select, addText(number, ReadOnlyData, null)])}>
//                         <AddIcon/>
//                     </Button>
//                 </Grid>}
//             </Grid><br/>
//         </Paper>
//     );
// };

// export default MultipleChoice;