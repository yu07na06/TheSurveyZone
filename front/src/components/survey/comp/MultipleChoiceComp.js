import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';
import {useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';

const MultipleChoiceComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {

    const [select, setSelect] = useState([]); // 보기 덩어리가 들어가있음
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [temp, setTemp] = useState([]);
    const [maxNum, setMaxNum] = useState();
    const dispatch = useDispatch();
    const count = useRef(-1);
    
    useEffect(()=>{
        console.log("======================================");
        console.log(ReadOnlyData);
        
        
    },[])

    useEffect(()=>{
        let newAddText = null;
        if(ReadOnlyState){
            newAddText = ReadOnlyData.selectList.map(value=>{
                    return addText(number, value, ReadOnlyData.surQue_MaxAns)
            })
            setSelect([...select , newAddText]);
        }
    },[ReadOnlyState])

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
        setDeleteIndex(null); // 인덱스 중복될 수 있으니
    },[select])

        
    const deleteBtn = (e) => {
        setDeleteIndex(e.target.id);
    }

    const deleteQue = (e) => {
        console.log('삭제할 컴포넌트 id', e.target.id);
        setDelIndex(e.target.id);
    }

    const ccc = useRef(0);

    const checkCount = (e, addMaxNum) => {
        ccc.current += (e.target.checked)? 1 : -1;
        if(ccc.current>addMaxNum){
            alert('놉!');
            e.target.checked = false;
            ccc.current -= 1;
        }
    } 
    
    const addText = (number, ReadOnlyData, addMaxNum) => {
        count.current+=1;
        setTemp([...temp, `SurQue_Ans_${number}_${count.current}`]); // 질문에 대한 보기 이름 덩어리 합치는 중
        console.log("지금 이 순서대로 합치고 있다. 분명히", `SurQueCheck_${number}_${count.current}`);
        dispatch(submitAction(`SurQueCheck_${number}_${count.current}`))
        return(
            <Grid key={`SurQue_Ans_${number}_${count.current}`} container spacing={2}>
                <Grid item xs={11} key={`SurQue_Ans_${number}_${count.current}`}>
                {ReadOnlyState&&<Checkbox value={ReadOnlyState?ReadOnlyData.surSel_Content:null} name={`SurQueCheck_${number}_${count.current}`} id={`SurQueCheck_${number}_${count.current}`} onClick={(e)=>checkCount(e, addMaxNum)}/>}
                <TextField
                    variant="standard"
                    required
                    fullWidth
                    disabled={ReadOnlyState}
                    name={`SurQue_Ans_${number}_${count.current}`}
                    id={`SurQue_Ans_${number}_${count.current}`}
                    label={`선택지${number}_${count.current}`}
                    value={ReadOnlyState?ReadOnlyData.surSel_Content:null}
                    >
                </TextField>
                </Grid>
                {!ReadOnlyState&&<Grid item xs={1}>
                <Button 
                    id={`SurQue_Ans_${number}_${count.current}`}
                    onClick={(e)=>deleteBtn(e)}
                    >삭제</Button><br/>
                </Grid>}
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
            />
        </>
    );
};

export default MultipleChoiceComp;