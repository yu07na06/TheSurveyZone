import { Button, Grid, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import ErrorSweet from '../../common/modules/ErrorSweet';
import MultipleChoice from '../UI/MultipleChoice';

const MultipleChoiceComp = ({ ReadOnlyState, ReadOnlyData, UpdateKey, realReadState, number, setCheck, setDelIndex, }) => {
    const [updateData, setUpdateData] = useState(ReadOnlyState ? ReadOnlyData.surQue_Content : null);
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [unRequired, setUnRequired] = useState(null);
    const [maxNum, setMaxNum] = useState(null);
    const [select, setSelect] = useState([]);
    const [temp, setTemp] = useState([]);
    const accChecked = useRef(0);
    const count = useRef(-1);
    const dispatch = useDispatch();

    const deleteBtn = e => setDeleteIndex(e.target.id);
    const deleteQue = e => setDelIndex(e.target.id);
    const checkClick = e => setUnRequired((e.target.name).split('_')[1]);

    useEffect(()=>{
        if(ReadOnlyState){
            let newAddText = ReadOnlyData.selectList.map((value)=>{
                count.current+=1;
                    return <div key={`SurQue_Ans_${number}_${count.current}`}>
                                <AddText
                                    number={number}
                                    ReadOnlyData={value}
                                    addMaxNum={ReadOnlyData.surQue_MaxAns}
                                    checkBoxEssential={ReadOnlyData.surQue_Essential}
                                    count={count.current}
                                />
                            </div>
                })
            setSelect(newAddText);

            let newAddTextId = ReadOnlyData.selectList.map((value, index)=>{
                return `SurQue_Ans_${number}_${index}`;
                })
            setTemp(newAddTextId);
        }
    },[ReadOnlyState])

    useEffect(()=>{
        if((!ReadOnlyData || UpdateKey)&&temp.length!==0){
            setTimeout(()=>{
                setCheck({[number]:temp});
            },444);
        }
    },[temp]);

    useEffect(()=>{
        if(deleteIndex != null){
            let newSelect = select.filter((value)=> {
                return value.key !== deleteIndex
            })
            setSelect(newSelect);
            let newTemp = temp.filter((value)=> value !== deleteIndex)
            setTemp(newTemp);
        }
    },[deleteIndex])

    useEffect(()=>{
        setDeleteIndex(null);
    },[select])

    useEffect(()=>{
        if(surAns_Content){
            for (const key in surAns_Content) {
                    const splitValue = surAns_Content[key].split('_');
                    if(splitValue[1]==unRequired && splitValue[0]=="SurQueCheck"){
                        for(let i=0; i<=Number(splitValue[2]); i++){
                            let checkbox1 = document.querySelector(`input[name=SurQueCheck_${unRequired}_${i}]`);
                            checkbox1.required=false;
                        }
                    }
            }
        }
    },[unRequired])

    const checkCount = (e, addMaxNum) => {
        accChecked.current += (e.target.checked)? 1 : -1;
        if(accChecked.current > addMaxNum){
            ErrorSweet('info', null, "응답 불가", "최대 응답 가능 범위를 초과했습니다.", null)
            e.target.checked = false;
            accChecked.current -= 1;
        }
    }

    const AddText = ({number, ReadOnlyData, addMaxNum, checkBoxEssential, count}) => {
        const [updateDataAddText , setUpdateDataAddText] = useState(ReadOnlyState?ReadOnlyData.surSel_Content:null);
        !UpdateKey && setTemp([...temp, `SurQue_Ans_${number}_${count}`]);
        dispatch(submitAction({[number]:`SurQueCheck_${number}_${count}`}))
        return(
            <Grid key={`SurQue_Ans_${number}_${count}`} container spacing={1}>
                <Grid item xs={9} sm={10} key={`SurQue_Ans_${number}_${count}`}>
                    {(ReadOnlyState&&!UpdateKey)&&
                        <FormControlLabel
                            label={ReadOnlyState?ReadOnlyData.surSel_Content:null}
                            control={
                                <Checkbox
                                    disabled={realReadState}
                                    required={checkBoxEssential}
                                    value={ReadOnlyState?ReadOnlyData.surSel_Content:null}
                                    name={`SurQueCheck_${number}_${count}`}
                                    id={`SurQueCheck_${number}_${count}`}
                                    onClick={(e)=>{ checkClick(e); checkCount(e, addMaxNum);}}
                                />
                            }
                        />
                    }
                    {(!ReadOnlyState||UpdateKey)&&
                        <TextField
                            onChange={e => ReadOnlyState&&setUpdateDataAddText(e.target.value)}
                            variant="standard"
                            required
                            fullWidth
                            InputProps={{ readOnly: (ReadOnlyState&&!UpdateKey)}}
                            name={`SurQue_Ans_${number}_${count}`}
                            id={`SurQue_Ans_${number}_${count}`}
                            label={`선택지${number}_${count}`}
                            value={updateDataAddText}
                        >
                        </TextField>
                    }
                </Grid>

                {(!ReadOnlyState||UpdateKey)&&
                    <Grid item textAlign = "right" xs={3} sm={2} >
                        <Button
                            id={`SurQue_Ans_${number}_${count}`}
                            onClick={(e)=>deleteBtn(e)}
                        >
                        삭제
                        </Button><br/>
                    </Grid>
                }
            </Grid>
        );
    }

    return (
        <>
            <MultipleChoice 
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
                number={number}
                updateData={updateData}
                setUpdateData={setUpdateData}
                select={select}
                setSelect={setSelect}
                AddText={AddText}
                maxNum={maxNum}
                setMaxNum={setMaxNum}
                deleteQue={deleteQue}
                count={count}
            />
        </>
    );
};

export default MultipleChoiceComp;