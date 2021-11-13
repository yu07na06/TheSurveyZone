import React from 'react';
import FindPW from '../UI/FindPW';
import { createTheme  } from '@mui/material/styles';

const FindPWComp = () => {
    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

    return (
        <>
            <FindPW 
                handleSubmit={handleSubmit}
                theme={theme}
            />   
        </>
    );
};

export default FindPWComp;