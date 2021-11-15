import { TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import MultipleChoice from '../UI/MultipleChoice';

const MultipleChoiceComp = ({number}) => {
    const [select, setSelect] = useState([]);
    const count = useRef(-1);

    const addText = (number) => {
        count.current+=1;
        return(
            <TextField
                variant="outlined"
                required
                name={`SurSel_Content"${number}_${count.current}`}
                id={`SurSel_Content"${number}_${count.current}`}
                label={`선택지${number}_${count.current}`}
            />
        );
    }

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