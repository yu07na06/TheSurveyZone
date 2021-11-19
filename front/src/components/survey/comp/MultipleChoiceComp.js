import { Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';
import {useEffect} from 'react';

const MultipleChoiceComp = ({number, setCheck }) => {
    const [select, setSelect] = useState([]); // 보기 덩어리가 들어가있음
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [temp, setTemp] = useState([]);
    const count = useRef(-1);

    const deleteBtn = (e) => {
        setDeleteIndex(e.target.id);
    }

    const addText = (number) => {
        count.current+=1;
        setTemp([...temp, `SurQue_Ans${number}_${count.current}`]) // 질문에 대한 보기 이름 덩어리 합치는 중
        return(
            <div key={`SurQue_Ans${number}_${count.current}`}>
            <TextField
                variant="outlined"
                required
                name={`SurQue_Ans${number}_${count.current}`}
                id={`SurQue_Ans${number}_${count.current}`}
                label={`선택지${number}_${count.current}`}
                >
            </TextField>
            <Button 
                id={`SurQue_Ans${number}_${count.current}`}
                onClick={(e)=>deleteBtn(e)}
                >삭제</Button><br/>
            </div>
        );
    }

    useEffect(()=>{
        setCheck({[number]:temp});
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
        setDeleteIndex(null); // 인덱스 중복될 수 있으니
    },[select])

    return (
        <>
            <MultipleChoice 
                number={number}
                select={select}
                setSelect={setSelect}
                addText={addText}
            />
        </>
    );
};

export default MultipleChoiceComp;