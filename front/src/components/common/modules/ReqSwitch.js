import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';

const ReqSwitch = ({number, flag, setSur_Publish, essential, }) => {
    const [checkText, setCheckText] = useState((flag === "qeustion") ? "필수 응답" : "공개 설문")

    useEffect(()=>{
        if(essential!==undefined&&essential==false){
            if(flag==="qeustion")
                setCheckText("     ");
            else{
                setCheckText("비공개 설문");
            }
        }
    },[])

    const onCheckChange = (e) => {
        if(flag=="qeustion")
            e.target.checked?setCheckText("필수 응답"):setCheckText("     ")
        else {
            if(e.target.checked){
                setCheckText("비공개 설문");
                setSur_Publish(true);
            }else{
                setCheckText("공개 설문");
                setSur_Publish(false);
            }
        }
    }

    return (
        <>
            {(flag=="qeustion")
            ?
                <FormControlLabel checked={checkText==="필수 응답"} control={ <Switch onChange={e=>onCheckChange(e)} id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '5%' }} defaultChecked color="secondary" />} label={checkText} />
            :
                <FormControlLabel checked={checkText==="비공개 설문"} control={<Switch id="Sur_Publishs" x={{ left: '85%' }} color="secondary" onChange={onCheckChange}/>} label={checkText} />
            }
        </>
    )
}

export default ReqSwitch