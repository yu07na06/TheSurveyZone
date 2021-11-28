import FormControlLabel from '@mui/material/FormControlLabel';
import React, {useState } from 'react';
import Switch from '@mui/material/Switch';


const ReqSwitch = ({number, flag}) => {

    const [checkText, setCheckText] = useState((flag==="qeustion")?"필수 응답":"공개 설문")

    const onCheckChange = (e) => {
        (flag=="qeustion")
        ?
            e.target.checked?setCheckText("필수 응답"):setCheckText("     ")
        :
            e.target.checked?setCheckText("비공개 설문"):setCheckText("공개 설문")
    }

    return(
        <>
            {(flag=="qeustion")
            ?
                <FormControlLabel control={ <Switch onChange={e=>onCheckChange(e)} id={`SurQue_Essential${number}`} name={`SurQue_Essential${number}`} sx={{ left: '5%' }} defaultChecked color="secondary" />} label={checkText} />
            :
                <FormControlLabel control={<Switch id="Sur_Publishs" x={{ left: '85%' }} color="secondary" onChange={onCheckChange}/>} label={checkText} />
            }
        </>
    )
    
}

export default ReqSwitch