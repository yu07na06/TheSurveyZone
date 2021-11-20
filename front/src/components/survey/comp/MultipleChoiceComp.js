import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';
import {useEffect} from 'react';

const MultipleChoiceComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {

    const [select, setSelect] = useState([]); // 보기 덩어리가 들어가있음
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [temp, setTemp] = useState([]);
    const [maxNum, setMaxNum] = useState('');
    const count = useRef(-1);
    
    useEffect(()=>{
        !ReadOnlyState&&setCheck({[number]:temp});
    },[temp]);

    useEffect(()=>{
        if(deleteIndex != null){
            let newSelect = select.filter((value)=> value.key !== deleteIndex)
            setSelect(newSelect);
            let newTemp = temp.filter((value)=> value !== deleteIndex)
            setTemp(newTemp);
        }
    },[deleteIndex])

    useEffect(()=>{
        console.log("select 확인", select);
        setDeleteIndex(null); // 인덱스 중복될 수 있으니
    },[select])

        
    const deleteBtn = (e) => {
        setDeleteIndex(e.target.id);
    }

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    const addText = (number) => {
        count.current+=1;
        setTemp([...temp, `SurQue_Ans${number}_${count.current}`]); // 질문에 대한 보기 이름 덩어리 합치는 중
        return(
            // <div key={`SurQue_Ans${number}_${count.current}`}>
            <Grid key={`SurQue_Ans${number}_${count.current}`} container spacing={2}>
                <Grid item xs={11} key={`SurQue_Ans${number}_${count.current}`}>
                <TextField
                    variant="standard"
                    required
                    fullWidth
                    disabled={ReadOnlyState}
                    name={`SurQue_Ans${number}_${count.current}`}
                    id={`SurQue_Ans${number}_${count.current}`}
                    label={`선택지${number}_${count.current}`}
                    value={ReadOnlyState?ReadOnlyData.selectList[number].surSel_Content:null} // 아직 객체 참조 안함
                    >
                </TextField>
                </Grid>
                {!ReadOnlyState&&<Grid item xs={1}>
                <Button 
                    id={`SurQue_Ans${number}_${count.current}`}
                    onClick={(e)=>deleteBtn(e)}
                    >삭제</Button><br/>
                </Grid>}
            </Grid>
            // </div>
        );
    }

    return (
        <div key="hi">
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
            />
        </div>
    );
};

export default MultipleChoiceComp;