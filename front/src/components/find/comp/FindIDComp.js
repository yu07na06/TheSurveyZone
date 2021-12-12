import React from 'react';
import FindID from '../UI/FindID';
import { createTheme  } from '@mui/material/styles';

const FindIDComp = () => {
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
            <FindID 
                handleSubmit={handleSubmit}
                theme={theme}
            />   
        </>
    );
};

export default FindIDComp;