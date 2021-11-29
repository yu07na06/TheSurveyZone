import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';
import {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';

const MultipleChoiceComp = ({ number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, UpdateKey, checkboxlistState, realReadState }) => {
    console.log("ReadOnlyState",ReadOnlyState );
    console.log("UpdateKey : ",UpdateKey );
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [select, setSelect] = useState([]); // 보기 덩어리가 들어가있음
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [temp, setTemp] = useState([]);
    const [maxNum, setMaxNum] = useState(null);
    const [unRequired, setUnRequired] = useState(null);
    const count = useRef(-1);
    const ccc = useRef(0);
    const dispatch = useDispatch();


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
        if(!ReadOnlyData || UpdateKey){ //생성할때 사용하고, 수정할때 사용할꺼야
            setCheck({[number]:temp});
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
        setDeleteIndex(null); // 인덱스 중복될 수 있으니
    },[select])

    const deleteBtn = (e) => { console.log("삭제할 버튼 인덱스", e.target.id); setDeleteIndex(e.target.id); }
    const deleteQue = (e) => { setDelIndex(e.target.id); }

    const checkCount = (e, addMaxNum) => {
        ccc.current += (e.target.checked)? 1 : -1;
        // setEssential(ccc.current);
        if(ccc.current>addMaxNum){
            alert('놉!');
            e.target.checked = false;
            ccc.current -= 1;
        }
    }

    const checkClick = (e)=>{
        let splitNum = (e.target.name).split('_')[1];
        setUnRequired(splitNum);
    }

    useEffect(()=>{
        surAns_Content&&surAns_Content.map(value => {
            let splitValue = value.split('_');
            if(splitValue[1]==unRequired && splitValue[0]=="SurQueCheck"){
                let checkbox1 = document.querySelector(`input[name=${value}]`);
                console.log("checkbox 출력", checkbox1);
                checkbox1.required=false;
            }
        })
    },[unRequired])

    const AddText = ({number, ReadOnlyData, addMaxNum, checkBoxEssential, count}) => {
        const [수정할때의데이터 , set수정할때의데이터] = useState(ReadOnlyState?ReadOnlyData.surSel_Content:null);
        !UpdateKey && setTemp([...temp, `SurQue_Ans_${number}_${count}`]); // 질문에 대한 보기 이름 덩어리 합치는 중
        dispatch(submitAction(`SurQueCheck_${number}_${count}`))
        return(
            <Grid key={`SurQue_Ans_${number}_${count}`} container spacing={2}>
                <Grid item xs={11} key={`SurQue_Ans_${number}_${count}`}>
                    {(ReadOnlyState&&!UpdateKey)&&
                        <Checkbox
                            disabled={realReadState}
                            required={checkBoxEssential}
                            value={ReadOnlyState?ReadOnlyData.surSel_Content:null}
                            name={`SurQueCheck_${number}_${count}`}
                            id={`SurQueCheck_${number}_${count}`}
                            onClick={(e)=>{ checkClick(e); checkCount(e, addMaxNum);}}
                        />
                    }
                    
                    <TextField

                        onChange={(e)=> {console.log("멍멍~"); ReadOnlyState&&set수정할때의데이터(e.target.value)}}
                        variant="standard"
                        required
                        fullWidth
                        disabled={ReadOnlyState&&!UpdateKey}
                        name={`SurQue_Ans_${number}_${count}`}
                        id={`SurQue_Ans_${number}_${count}`}
                        label={`선택지${number}_${count}`}
                        value={수정할때의데이터}
                        >
                    </TextField>
                </Grid>

                {(!ReadOnlyState||UpdateKey)&&
                    <Grid item xs={1}>
                    <Button 
                        id={`SurQue_Ans_${number}_${count}`}
                        onClick={(e)=>deleteBtn(e)}
                        >삭제</Button><br/>
                    </Grid>
                }
            </Grid>
        );
    }

    const Add = () => temp.map((value, index)=> <option value={index+1}> {index+1} </option>) ;

    return (
        <>
            <MultipleChoice 
                number={number}
                select={select}
                setSelect={setSelect}
                AddText={AddText}
                maxNum={maxNum}
                setMaxNum={setMaxNum}
                deleteQue={deleteQue}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
                count={count}
                temp={temp}
                Add={Add}
            />
        </>
    );
};

export default MultipleChoiceComp;