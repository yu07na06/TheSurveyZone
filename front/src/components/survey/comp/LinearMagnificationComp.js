import React, { useState, useEffect } from 'react';
import LinearMagnification from '../UI/LinearMagnification';
import Radio from "@mui/material/Radio";
import { FormControlLabel, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';


const LinearMagnificationComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(null);
    const [temp, setTemp] = useState('');
    const [makeCircles, setMakeCircles] = useState([]);

    let value = [1,2,3,4,5,6,7,8,9];
    const valuetext = (value) => {
        return `${value}`;
    }

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    useEffect(()=>{
        !ReadOnlyState&&setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
    },[minValue, maxValue, temp])

    const [ changeCircle, setChangeCircle ] = useState(null);

    const circle = (id, number, size) => {
        return(
            <Grid item xs={1}>
                <FormControlLabel
                
                style={{marginLeft:"0", marginRight:"0"}}
                value="top"
                control={<Radio
                    required={ReadOnlyData.surQue_Essential}
                    onChange={(e)=>setChangeCircle(e.target.value)}
                    value={`radio_${number}_${id}`}
                    name={`radio_${number}`}
                    id={`radio_${number}`}
                    checked={ changeCircle === `radio_${number}_${id}` }
                    sx={{
                        "& .MuiSvgIcon-root": {
                            fontSize: size
                        }
                    }}
                />}
                label={id}
                labelPlacement="top"
            />
            </Grid>

        );
    }

    useEffect(()=>{
        if(ReadOnlyState){
            let newCircle = [];
            const lowNum = Number(ReadOnlyData.selectList[1].surSel_Content);
            const maxNum = Number(ReadOnlyData.selectList[3].surSel_Content);
            // let num =  maxNum-lowNum;
            for(let i=lowNum; i<=maxNum; i++){
                newCircle.push(circle(i, number, i+20));
            }
            setMakeCircles([...newCircle])
        }
    },[changeCircle])


    
    const dispatch = useDispatch();
    useEffect(()=>{
        if(ReadOnlyState)
            dispatch(submitAction(`radio_${number}`))
            
    },[])
    
    return (
        <>
            <LinearMagnification 
                number={number}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                value={value}
                valuetext={valuetext}
                setTemp={setTemp}
                deleteQue={deleteQue}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                makeCircles={makeCircles}
                UpdateKey={UpdateKey}

            />
        </>
    );
};

export default LinearMagnificationComp;