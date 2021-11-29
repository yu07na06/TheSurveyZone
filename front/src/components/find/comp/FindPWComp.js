import React from 'react';
import FindPW from '../UI/FindPW';
import { createTheme  } from '@mui/material/styles';
import { searchPW } from '../../../lib/api/auth';

const FindPWComp = () => {
    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            user_Email: data.get('user_Email'),
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });

        const searchPWReq = ({
            user_Email: data.get('user_Email'),
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });

        searchPW(searchPWReq)
        .then(res=>console.log("성공했다 : ",res))
        .catch(err=>console.log("실패했다 : ",err));
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