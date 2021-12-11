import { FormControlLabel, Grid } from '@mui/material';
import Radio from "@mui/material/Radio";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import LinearMagnification from '../UI/LinearMagnification';

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
        if(!ReadOnlyData || UpdateKey){
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
            ReadOnlyState={ReadOnlyState}
            ReadOnlyData={ReadOnlyData}
            UpdateKey={UpdateKey}
            number={number}
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