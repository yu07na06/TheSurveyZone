import React from 'react';
import FindID from '../UI/FindID';
import { createTheme  } from '@mui/material/styles';
import { searchID } from '../../../lib/api/auth';

const FindIDComp = () => {
    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });
        const searchIDReq = ({
            user_Name: data.get('user_Name'),
            user_Tel: data.get('user_Tel'),
        });
        searchID(searchIDReq)
        .then(res=>console.log("성공했다 : ",res))
        .catch(err=>console.log("실패했다 : ",err));
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