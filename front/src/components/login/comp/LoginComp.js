import React from 'react';
import Login from '../UI/Login';
import { createTheme  } from '@mui/material/styles';

const LoginComp = () => {
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
            <Login 
                handleSubmit={handleSubmit}
                theme={theme}
            />   
        </>
    );
};

export default LoginComp;