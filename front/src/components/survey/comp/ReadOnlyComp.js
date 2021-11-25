import React from 'react';
import ReadOnly from '../UI/ReadOnly';
import { createTheme } from '@mui/material/styles';

const ReadOnlyComp = () => {
    const theme = createTheme();
    return (
        <>
           <ReadOnly 
            theme={theme}
           /> 
        </>
    );
};

export default ReadOnlyComp;