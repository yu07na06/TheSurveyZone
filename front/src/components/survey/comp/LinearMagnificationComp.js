import { FormControlLabel, Grid } from '@mui/material';
import Radio from "@mui/material/Radio";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import LinearMagnification from '../UI/LinearMagnification';

/*
- ReadOnlyState : true / false      보기/수정/참여 시, 
- ReadOnlyData                      보기/수정/참여 시, API에서 호출받은 데이터
- UpdateKey                         수정일때 true, 그외에 false
- realReadState                     보기일때 true, 그외에 false
- number                            부모에서 카운팅한 값 ex) count+=1
- setCheck                          부모에서 생성된 라디오 id 값만 합침 (제출 API 요청 시, 해당 데이터를 들고오기 위해 부모쪽에서 어떤 라디오가 생성되었는지 확인할 수 있어야 하기 때문에)
- setDelIndex                       부모에서 삭제한 자식 컴포넌트를 처리 ()
*/
const LinearMagnificationComp = ({ ReadOnlyState, ReadOnlyData, UpdateKey, realReadState, number, setCheck, setDelIndex, }) => {
    const [ updateData, setUpdateData] = useState(ReadOnlyState ? ReadOnlyData.surQue_Content : null);
    const [ updateDataStart, setUpdateDataStart] = useState(ReadOnlyState ? ReadOnlyData.selectList[0].surSel_Content : null);
    const [ updateDataStartValue, setUpdateDataStartValue] = useState(ReadOnlyState ? Number(ReadOnlyData.selectList[1].surSel_Content) : null);
    const [ updateDataEnd, setUpdateDataEnd] = useState(ReadOnlyState ? ReadOnlyData.selectList[2].surSel_Content : null);
    const [ updateDataEndValue, setUpdateDataEndValue] = useState(ReadOnlyState ? Number(ReadOnlyData.selectList[3].surSel_Content) : null);
    const [ minValue, setMinValue ] = useState(null);
    const [ maxValue, setMaxValue ] = useState(null);
    const [ makeCircles, setMakeCircles ] = useState([]);
    const [ changeCircle, setChangeCircle ] = useState(null);
    const [ temp, setTemp ] = useState('');
    const dispatch = useDispatch();
    
    const value = [1,2,3,4,5,6,7,8,9];

    const deleteQue = e => setDelIndex(e.target.id);
    
    useEffect(()=>{
        if(ReadOnlyState)
            dispatch(submitAction({[number]:`radio_${number}`}))
    },[])
    
    useEffect(()=>{
        if(ReadOnlyState){
            const newCircle = [];
            const lowNum = Number(ReadOnlyData.selectList[1].surSel_Content);
            const maxNum = Number(ReadOnlyData.selectList[3].surSel_Content);
            for(let i=lowNum; i<=maxNum; i++){
                newCircle.push(circle(i, number, i+20));
            }
            setMakeCircles([...newCircle])
        }
    },[changeCircle])
    
    useEffect(()=>{
        if(!ReadOnlyData || UpdateKey){ // 생성 및 수정 시
            setTimeout(()=>{
                setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
            },444);
        }
    },[minValue, maxValue, temp])

    const circle = (id, number, size) => {
        return(
            <Grid item xs={1}>
                <FormControlLabel
                    style={{ marginLeft:"0", marginRight:"0" }}
                    value="top"
                    control={<Radio
                                disabled={realReadState}
                                required={ReadOnlyData.surQue_Essential}
                                onChange={(e)=>setChangeCircle(e.target.value)}
                                value={`radio_${number}_${id}`}
                                name={`radio_${number}`}
                                id={`radio_${number}`}
                                checked={ changeCircle === `radio_${number}_${id}` }
                                sx={{ "& .MuiSvgIcon-root": { fontSize: size } }}
                            />}
                    label={id}
                    labelPlacement="top"
                />
            </Grid>
        );
    }
    
    return (
        <LinearMagnification
            // 부모로부터
            ReadOnlyState={ReadOnlyState}
            ReadOnlyData={ReadOnlyData}
            UpdateKey={UpdateKey}
            number={number}

            // 컴포넌트로부터
            updateData={updateData}
            setUpdateData={setUpdateData}
            updateDataStart={updateDataStart}
            setUpdateDataStart={setUpdateDataStart}
            updateDataStartValue={updateDataStartValue}
            setUpdateDataStartValue={setUpdateDataStartValue}
            updateDataEnd={updateDataEnd}
            setUpdateDataEnd={setUpdateDataEnd}
            updateDataEndValue={updateDataEndValue}
            setUpdateDataEndValue={setUpdateDataEndValue}
            value={value}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            makeCircles={makeCircles}
            setTemp={setTemp}
            deleteQue={deleteQue}
        />
    );
};

export default LinearMagnificationComp;