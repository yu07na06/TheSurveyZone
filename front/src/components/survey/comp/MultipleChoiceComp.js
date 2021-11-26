import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';
import {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';

const MultipleChoiceComp = ({ number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {

    const [select, setSelect] = useState([]); // 보기 덩어리가 들어가있음
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [temp, setTemp] = useState([]);
    const [maxNum, setMaxNum] = useState();
    const [essential, setEssential] = useState(0);
    const count = useRef(-1);
    const ccc = useRef(0);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(ReadOnlyState){
            let newAddText = ReadOnlyData.selectList.map((value)=>{
                    return addText(number, value, ReadOnlyData.surQue_MaxAns, ReadOnlyData.surQue_Essential, )
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

    const deleteBtn = (e) => { setDeleteIndex(e.target.id); }
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

    useEffect(()=>{
        if(essential!=0){
            setSelect([...select]);
        }
    },[essential])


    useEffect(()=>{
        console.log("essential !!!!!!!!!!!!!", ccc.current);
        console.log((ReadOnlyData.surQue_Essential&&ccc.current==0));
        if(essential!=0){
            console.log("야!");
            setSelect([...select]);
        }
    },[essential])
    
    const addText = (number, ReadOnlyData, addMaxNum, checkBoxEssential, ) => {
        count.current+=1;
        !UpdateKey && setTemp([...temp, `SurQue_Ans_${number}_${count.current}`]); // 질문에 대한 보기 이름 덩어리 합치는 중
        dispatch(submitAction(`SurQueCheck_${number}_${count.current}`))
        return(
            <Grid key={`SurQue_Ans_${number}_${count.current}`} container spacing={2}>
                <Grid item xs={11} key={`SurQue_Ans_${number}_${count.current}`}>
                    {console.log("hi", (checkBoxEssential&&essential==0))}

                    {(ReadOnlyState&&!UpdateKey)&&
                        <Checkbox
                            required={(checkBoxEssential&&essential==0)}
                            value={ReadOnlyState?ReadOnlyData.surSel_Content:null} 
                            name={`SurQueCheck_${number}_${count.current}`} 
                            id={`SurQueCheck_${number}_${count.current}`} 
                            onClick={(e)=>{ setEssential(1); checkCount(e, addMaxNum);}}
                        />
                    }
                    
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        disabled={ReadOnlyState&&!UpdateKey}
                        name={`SurQue_Ans_${number}_${count.current}`}
                        id={`SurQue_Ans_${number}_${count.current}`}
                        label={`선택지${number}_${count.current}`}
                        value={ReadOnlyState?ReadOnlyData.surSel_Content:null}
                        >
                    </TextField>
                </Grid>

                {(!ReadOnlyState||UpdateKey)&&
                    <Grid item xs={1}>
                    <Button 
                        id={`SurQue_Ans_${number}_${count.current}`}
                        onClick={(e)=>deleteBtn(e)}
                        >삭제</Button><br/>
                    </Grid>
                }
            </Grid>
        );
    }

    return (
        <>
            <MultipleChoice 
                number={number}
                select={select}
                setSelect={setSelect}
                addText={addText}
                maxNum={maxNum}
                setMaxNum={setMaxNum}
                deleteQue={deleteQue}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
            />
        </>
    );
};

export default MultipleChoiceComp;