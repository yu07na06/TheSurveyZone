import React, { useEffect, useState } from 'react';
import ResultLinear from '../UI/ResultLinear';
import Radio from "@mui/material/Radio";
import { FormControlLabel } from '@mui/material';

const ResultLinearComp = ({ value, index, result, }) => {
    const [ makeCircle, setMakeCircle ] = useState([]);
    const [changeCircle, setChangeCircle] = useState();
    const [chartState, setChartState] = useState();

    const linearcircle = (size, idx) => {
        return(
            <FormControlLabel
                style={{ marginLeft:"0", marginRight:"0" }}
                value="top"
                control={<Radio
                            onChange={(e)=>setChangeCircle(e.target.value)}
                            value={`radio_1_1`}
                            name={`radio_1`}
                            id={`radio_1`}
                            checked={ changeCircle === `radio_1_1` }
                            sx={{ "& .MuiSvgIcon-root": { fontSize: size } }}
                        />}
                label={result.resultMap[index][idx]}
                labelPlacement={"top"}
            />
        );
    }

    useEffect(()=>{
        if(value){
            const newCircle = [];
            if(value){
                const lowNum = Number(value.selectList[1].surSel_Content);
                const maxNum = Number(value.selectList[3].surSel_Content);
                for(let i=lowNum; i<=maxNum; i++){
                    newCircle.push(linearcircle(i+25, i));
                }
            }
            setMakeCircle(newCircle);
        }
    },[value])

    useEffect(()=>{
        setChartState("BarChart")
    },[])

    return (
        <>
            <ResultLinear value={value} index={index} result={result} makeCircle={makeCircle} chartState={chartState} setChartState={setChartState}/>
        </>
    );
};

export default ResultLinearComp;

